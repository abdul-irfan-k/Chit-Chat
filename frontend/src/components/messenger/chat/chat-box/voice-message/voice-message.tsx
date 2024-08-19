"use client"
import { PlayIcon, PauseIcon } from "@/constants/icon-constant"
import useDebounce from "@/hooks/use-debounce/use-debounce"
import { useContextMenuContext } from "@/provider/context-menu-provider/context-menu-provider"
import Image from "next/image"
import React, { FC, useCallback, useEffect, useRef, useState } from "react"
import WaveSurfer from "wavesurfer.js"

interface VoiceMessageInterface {
  _id: string
  time: Date
  messageChannelType: "incomingMessage" | "outgoingMessage"
  userName: string
  userImageSrc: string
  AudioSrc: string
}
const VoiceMessage: FC<VoiceMessageInterface> = ({
  _id,
  AudioSrc,
  messageChannelType,
  time,
  userImageSrc,
  userName,
}) => {
  const audioRef = useRef<HTMLAudioElement>()
  const audioProgressBarRef = useRef<HTMLInputElement>()
  const playAnimationRef = useRef<number>()

  const [isPlaying, setIsPlaying] = useState<boolean>(false)
  const [duration, setDuration] = useState<number>()
  const [playingTime, setPlayingTime] = useState<number>(0)

  const [formattedDuration, setFormattedDuration] = useState<string>("00:00")
  const [formattedPlayingTime, setFormattedPlayingTime] = useState<string>("00:00")
  const contextMenu = useContextMenuContext()

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

  const waveformRef = useRef(null)
  const wavesurfer = useRef(null)

  useEffect(() => {
    if (!waveformRef.current || waveformRef == null) return
    wavesurfer.current = WaveSurfer.create({
      container: waveformRef.current,
      height: 30,
      barWidth: 2,
      waveColor: "#38599f",
      progressColor: "#fff",
      responsive: true,
      normalize: true,
      barGap: 1,
    })

    wavesurfer.current.load(AudioSrc)

    wavesurfer.current.on("ready", () => {
      // setDuration(wavesurfer.current.getDuration())
      setFormattedDuration(formatTime(wavesurfer.current.getDuration()))
    })

    wavesurfer.current.on("audioprocess", () => {
      setFormattedPlayingTime(formatTime(wavesurfer.current.getCurrentTime()))
    })
    return () => {
      wavesurfer?.current?.un("ready")
      wavesurfer?.current?.un("audioprocess")
      wavesurfer?.current.destroy()
    }
  }, [waveformRef.current])

  const handlePlayButtonClick = () => {
    setIsPlaying(!isPlaying)
    wavesurfer?.current?.playPause()
  }

  // useDebounce(
  //   () => {
  //     if (isPlaying) {
  //       // wavesurfer?.current?.playPause()
  //     }
  //   },
  //   500,
  //   [playingTime],
  // )
  return (
    <div className={"gap-5  flex items-start" + (messageChannelType == "incomingMessage" ? " " : "  flex-row-reverse")}>
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
            "gap-2 flex px-4 py-2 rounded-xl " +
            (messageChannelType == "incomingMessage"
              ? " bg-[rgb(56,89,159)] text-slate-50"
              : " bg-[#191b1f] text-slate-50")
          }
          onContextMenu={(e) => {
            e.preventDefault()
            if (contextMenu == null) return

            const isOutGoingMessage: boolean = messageChannelType == "outgoingMessage"
            contextMenu.setContextMenuDetails({
              type: "message",
              messageDetails: { _id, isOutGoingMessage, messageType: "voiceMessage", messageSrc: AudioSrc },
            })
            contextMenu.setContextMenuPosition({ xPosition: e.clientX, yPosition: e.clientY })
            contextMenu.setShowContextMenu(true)
          }}
        >
          <div
            className="flex items-center justify-center w-14 aspect-square bg-slate-300 text-slate-50 fill-slate-50 rounded-full dark:bg-neutral-900"
            onClick={handlePlayButtonClick}
          >
            {isPlaying ? (
              <PauseIcon className="w-8 aspect-square " width="" height="" />
            ) : (
              <PlayIcon className="w-8 aspect-square " width="" height="" />
            )}
          </div>

          <audio
            ref={audioRef}
            preload="metadata"
            // src={"https://aac.saavncdn.com/862/e277c1b441b562640c6b264aa3335a83_160.mp4"}
            src={AudioSrc}
          />
          <div className="flex flex-col">
            <div className="relative h-full   gap-1 my-auto w-48 " ref={waveformRef}></div>

            <span className="text-[10px] dark:text-slate-300">
              {formattedPlayingTime}/{formattedDuration}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default VoiceMessage
