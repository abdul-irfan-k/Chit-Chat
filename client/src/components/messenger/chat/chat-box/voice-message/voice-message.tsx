"use client"
import { PlayIcon, PauseIcon } from "@/constants/icon-constant"
import useDebounce from "@/hooks/use-debounce/use-debounce"
import Image from "next/image"
import React, { FC, useCallback, useEffect, useRef, useState } from "react"

interface VoiceMessageInterface {
  time: Date
  messageChannelType: "incomingMessage" | "outgoingMessage"
  userName: string
  userImageSrc: string
  AudioSrc: string
}
const VoiceMessage: FC<VoiceMessageInterface> = ({ AudioSrc, messageChannelType, time, userImageSrc, userName }) => {
  const audioRef = useRef<HTMLAudioElement>()
  const audioProgressBarRef = useRef<HTMLInputElement>()
  const playAnimationRef = useRef<number>()

  const [isPlayingVoiceMessage, setIsPlayingVoiceMessage] = useState<boolean>(false)
  const [audioMaxDuration, setAudioMaxDuration] = useState<number>()
  const [audioCurrentPlayingTime, setAudioCurrentPlayingTime] = useState<number>(0)

  const playButtonHandler = () => {
    setIsPlayingVoiceMessage(true)
    audioRef.current?.play()
    playAnimationRef.current = requestAnimationFrame(audioProgressUpdateHandler)
  }
  const pauseButtonHandler = () => {
    setIsPlayingVoiceMessage(false)
    audioRef.current?.pause()
    cancelAnimationFrame(playAnimationRef.current)
  }

  const audioOnLoadMetaDataHandler = () => {
    setAudioMaxDuration(audioRef.current?.duration)
  }

  const audioOnEndHandler = () => {
    setIsPlayingVoiceMessage(false)
    audioRef.current.pause()
    cancelAnimationFrame(playAnimationRef.current)
  }

  const progressChangeHandler = () => {
    if (audioRef.current != undefined && audioProgressBarRef.current != undefined) {
      audioRef.current.pause()
      const currentTime = audioProgressBarRef.current.value

      audioRef.current.currentTime = Number(currentTime)
      setAudioCurrentPlayingTime(Number(currentTime))
    }
  }

  useDebounce(
    () => {
      if (isPlayingVoiceMessage) {
        audioRef.current?.play()
      }
    },
    500,
    [audioCurrentPlayingTime],
  )

  const audioProgressUpdateHandler = useCallback(() => {
    if (audioRef.current != undefined && audioProgressBarRef.current != undefined) {
      const currentTime = audioRef.current.currentTime
      audioProgressBarRef.current.value = currentTime.toString()
      setAudioCurrentPlayingTime(currentTime)
    }

    playAnimationRef.current = requestAnimationFrame(audioProgressUpdateHandler)
  }, [])

  useEffect(() => {
    setAudioMaxDuration(audioRef.current?.duration)
  }, [audioRef.current, audioProgressBarRef.current])

  const formatTime = (time: number) => {
    if (time) {
      const minutes = Math.floor(time / 60)
      const formatMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`
      const seconds = Math.floor(time % 60)
      const formatSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`
      return `${formatMinutes}:${formatSeconds}`
    }
    return "00:00"
  }

  return (
    <div
      className={
        "gap-3 mb-5  clear-both  flex items-start" +
        (messageChannelType == "incomingMessage" ? " float-lef" : " float-right flex-row-reverse")
      }
    >
      <div className="relative aspect-square w-14">
        <Image alt="user-image" src={userImageSrc} fill className="aspect-square rounded-2xl" />
      </div>

      <div className="gap-1 flex flex-col">
        <div className={"flex gap-1 items-center " + (messageChannelType == "incomingMessage" ? "" : " ml-auto")}>
          <div className="font-medium text-base text-slate-950 dark:text-slate-50 ">{userName}</div>
          <div className="font-light text-xs text-slate-800 dark:text-slate-200">{time.toDateString()}</div>
        </div>

        <div
          className={
            "gap-2 flex px-4 py-2 rounded-full " +
            (messageChannelType == "incomingMessage" ? " bg-blue-500 text-slate-50" : " bg-slate-300 text-slate-950")
          }
        >
          {isPlayingVoiceMessage && (
            <div
              className="flex items-center justify-center w-14 aspect-square bg-slate-300 text-slate-50 fill-slate-50 rounded-full dark:bg-neutral-900"
              onClick={pauseButtonHandler}
            >
              <PauseIcon className="w-8 aspect-square " width="" height="" />
            </div>
          )}
          {!isPlayingVoiceMessage && (
            <div
              className="flex items-center justify-center w-14 aspect-square bg-slate-300 text-slate-50 fill-slate-50 rounded-full dark:bg-neutral-900"
              onClick={playButtonHandler}
            >
              <PlayIcon className="w-8 aspect-square " width="" height="" />
            </div>
          )}

          <audio
            ref={audioRef}
            preload="metadata"
            onLoadedMetadata={audioOnLoadMetaDataHandler}
            // src={"https://aac.saavncdn.com/862/e277c1b441b562640c6b264aa3335a83_160.mp4"}
             src={AudioSrc}
             onEnded={audioOnEndHandler}
/>
          <div className="relative h-full   gap-1 my-auto ">
            <input
              type="range"
              className="input-range h-3 rounded-full"
              ref={audioProgressBarRef}
              onChange={progressChangeHandler}
              max={audioMaxDuration}
              defaultValue={0}
/>

            {audioMaxDuration != undefined && (
              <div className="bottom-0  text-[0.7rem]">
                {formatTime(audioCurrentPlayingTime)} /{formatTime(audioMaxDuration)}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default VoiceMessage
