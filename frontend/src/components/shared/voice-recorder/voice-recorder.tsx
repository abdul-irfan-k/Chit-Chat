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

  const recorderControls = useAudioRecorder()
  const addAudioElement = (blob) => {
    if (currentChaterDetail == null || currentChaterDetail.chatRoomId == undefined || userDetail == null) return

    const url = URL.createObjectURL(blob)

    const details =
      currentChaterDetail.currentChaterType == "user"
        ? { receiverId: currentChaterDetail._id, messageChannelType: "private" }
        : { groupId: currentChaterDetail._id, messageChannelType: "group" }

    dispatch(
      sendAudioMessageHandler(
        {
          chatRoomId: currentChaterDetail?.chatRoomId,
          message: { audioBuffer: blob },
          senderId: userDetail?._id,
          messageSrc: url,
          ...details,
        },
        socket,
      ),
    )
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
      <AudioRecorder
        onRecordingComplete={(blob) => addAudioElement(blob)}
        recorderControls={recorderControls}
        // downloadOnSavePress={true}
        // downloadFileExtension="mp3"
        showVisualizer={true}
        // classes={{}}
      />
    </div>
  )
}

export default VoiceRecorder
