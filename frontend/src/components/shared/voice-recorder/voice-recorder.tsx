"use client"

import { MicIcon } from "@/constants/icon-constant"
import { useSocketIoContext } from "@/provider/socket-io-provider/socket-io-provider"
import { chatUsersListReducerState } from "@/redux/reducers/chat-user-reducer/chat-user-reducer"
import { userDetailState } from "@/redux/reducers/user-redicer/user-reducer"
import React, { useRef, useState } from "react"
import { useSelector } from "react-redux"
import { AudioRecorder, useAudioRecorder } from "react-audio-voice-recorder"
import { axiosUploadInstance } from "@/constants/axios"
import { sendAudioMessageHandler } from "@/redux/actions/chat-action/chat-action"
import { useAppDispatch } from "@/store"

const mimeType = "audio/mp3"
const VoiceRecorder = () => {
  const dispatch = useAppDispatch()
  const [permission, setPermission] = useState(false)
  const [stream, setStream] = useState<MediaStream | null>(null)
  const [recordingStatus, setRecordingStatus] = useState<"inactive" | "recording" | "paused" | "recorded">("inactive")
  const [audioChunks, setAudioChunks] = useState([])
  const [audio, setAudio] = useState(null)
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null)

  const [selectedAudioFile, setSelectedAudioFile] = useState<File | undefined>(undefined)

  const mediaRecorder = useRef<MediaRecorder | null>(null)

  const { currentChaterDetail } = useSelector(
    (state: { chatUsersList: chatUsersListReducerState }) => state.chatUsersList,
  )
  const { userDetail } = useSelector((state: { userDetail: userDetailState }) => state.userDetail)
  const { socket } = useSocketIoContext()
  const getMicrophonePermission = async () => {
    try {
      const constraints = {
        audio: true,
        video: false,
      }

      const streamData = await navigator.mediaDevices.getUserMedia(constraints)

      setPermission(true)
      setStream(streamData)
      return
    } catch (error) {
      console.log(error)
    }
  }

  const startRecording = async () => {
    if (!permission) return
    if (stream == null) return
    setRecordingStatus("recording")

    const media = new MediaRecorder(stream, { type: mimeType })
    mediaRecorder.current = media
    mediaRecorder.current.start()
    const localAudioChunks = []
    mediaRecorder.current.ondataavailable = (event) => {
      if (event.data == undefined) return
      if (event.data.size == 0) return
      localAudioChunks.push(event.data)
    }

    setAudioChunks(localAudioChunks)
  }

  const stopRecording = async () => {
    setRecordingStatus("recorded")
    mediaRecorder.current.stop()
    mediaRecorder.current.onstop = () => {
      const blob = new Blob(audioChunks, { type: mimeType })
      const audioUrl = URL.createObjectURL(blob)
      setAudioBlob(blob)
      setAudio(audioUrl)
    }
  }

  const sendButtonHandler = async () => {
    try {
      if (selectedAudioFile == undefined) return console.log("no file selected")
      const formData = new FormData()
      formData.append("video", selectedAudioFile)

      const { data: response } = await axiosUploadInstance.post("/uploadAudio", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      socket?.emit("message:newAudioMessage", {
        file: audioBlob,
        postedByUser: userDetail?._id,
        chatRoomId: currentChaterDetail?.chatRoom?.chatRoomId,
      })
    } catch (error) {}
  }
  const recorderControls = useAudioRecorder()
  const addAudioElement = (blob) => {
    const url = URL.createObjectURL(blob)
    console.log("add audio", currentChaterDetail)

    if (currentChaterDetail?.currentChaterType == "user") {
      dispatch(
        sendAudioMessageHandler(
          {
            chatRoomId: currentChaterDetail.chatRoom.chatRoomId,
            receiverId: currentChaterDetail._id,
            message: { file: blob, url },
            senderId: userDetail?._id,
          },
          socket,
        ),
      )
    }
  }

  return (
    <div className="bg-slate-300 rounded-full dark:bg-background-primary ">
      {/* {recordingStatus == "inactive" && !permission && (
        <div
          className="w-10 flex justify-center items-center aspect-square bg-slate-300 fill-slate-950 rounded-full dark:fill-slate-50    dark:bg-slate-800"
          onClick={getMicrophonePermission}
        >
          <MicIcon />
        </div>
      )} */}
      {/* {recordingStatus == "inactive" && permission && (
        <div
          className="w-10 flex justify-center items-center aspect-square bg-slate-300 fill-slate-950 rounded-full dark:fill-slate-50    dark:bg-slate-800"
          onClick={startRecording}
        >
          s
        </div>
      )}

      {recordingStatus == "recording" && (
        <div
          className="w-10 flex justify-center items-center aspect-square bg-slate-300 fill-slate-950 rounded-full dark:fill-slate-50    dark:bg-slate-800"
          onClick={stopRecording}
        >
          st
        </div>
      )}
      {recordingStatus == "recorded" && (
        <div
          className="w-10 flex justify-center items-center aspect-square bg-slate-300 fill-slate-950 rounded-full dark:fill-slate-50    dark:bg-slate-800"
          onClick={sendButtonHandler}
        >
          se
        </div>
      )}
      //  */}
      {audio == null && (
        <AudioRecorder
          onRecordingComplete={(blob) => addAudioElement(blob)}
          recorderControls={recorderControls}
          // downloadOnSavePress={true}
          // downloadFileExtension="mp3"
          showVisualizer={true}
          // classes={{}}
        />
      )}
      {/* {audio != null && (
        <div className="absolute w-[90%] left-0 top-0 h-full overflow-hidden">
          <audio src={audio} controls></audio>
        </div>
      )} */}
      {/* <div onClick={() => recorderControls.togglePauseResume()} className="ml-5">stop</div> */}
    </div>
  )
}

export default VoiceRecorder
