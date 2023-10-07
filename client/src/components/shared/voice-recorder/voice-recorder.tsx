"use client"

import { MicIcon } from "@/constants/icon-constant"
import { socketReducerState } from "@/redux/reducers/socket-reducer/socket-reducers"
import React, { useRef, useState } from "react"
import { useSelector } from "react-redux"

const mimeType = "audio/mp3"
const VoiceRecorder = () => {
  const [permission, setPermission] = useState(false)
  const [stream, setStream] = useState<MediaStream | null>(null)
  const [recordingStatus, setRecordingStatus] = useState<"inactive" | "recording" | "paused" | "recorded">("inactive")
  const [audioChunks, setAudioChunks] = useState([])
  const [audio, setAudio] = useState(null)
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null)

  const mediaRecorder = useRef<MediaRecorder | null>(null)
  const { socket } = useSelector((state: { socketClient: socketReducerState }) => state.socketClient)

  const getMicrophonePermission = async (): { isAllowedPermission: Boolean } => {
    try {
      const constraints = {
        audio: true,
        video: false,
      }

      const streamData = await navigator.mediaDevices.getUserMedia(constraints)

      setPermission(true)
      setStream(streamData)
      return { isAllowedPermission: true }
    } catch (error) {
      console.log("microphone permisson not allowed", error)
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

  const sendButtonHandler = () => {
    console.log('auidoblob',audioBlob)
    socket?.emit("message:newAudioMessage", { file: audioBlob })
  }

  return (
    <div>
      {recordingStatus == "inactive" && !permission && (
        <div
          className="w-10 flex justify-center items-center aspect-square bg-slate-300 fill-slate-950 rounded-full dark:fill-slate-50    dark:bg-slate-800"
          onClick={getMicrophonePermission}
        >
          <MicIcon />
        </div>
      )}
      {recordingStatus == "inactive" && permission && (
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
      {audio != null && <audio src={audio} controls></audio>}
    </div>
  )
}

export default VoiceRecorder
