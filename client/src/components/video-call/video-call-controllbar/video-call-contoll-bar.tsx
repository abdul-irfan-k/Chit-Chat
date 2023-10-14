"use client"
import { CallEndIcon, StopIcon, VideoSlashIcon, VolumeHighIcon } from "@/constants/icon-constant"
import React, { FC } from "react"

const VideoCallControllBar = () => {

  const soundInputRangeHandler = (event:React.ChangeEvent<HTMLInputElement>) => {
   

  }
  return (
    <div className="mt-5 relative flex items-center">
      <div className="gap-2 absolute flex items-center">
        <div className="w-6 relative overflow-hidden flex items-center justify-center aspect-square rounded-full  fill-slate-950 dark:fill-slate-50">
          <VolumeHighIcon className="aspect-square w-6" />
        </div>
        <div className="w-24 flex items-center">
          <input
            type="range"
            className="transparent h-[4px] w-full cursor-pointer appearance-none border-transparent bg-neutral-200 dark:bg-neutral-600"
            min={0}
            max={100}
            onChange={soundInputRangeHandler}
          />
        </div>
      </div>

      <div className="gap-8 mx-auto flex items-center">
        <VideoCallControllIcon>
          <VideoSlashIcon className="aspect-square w-6" />
        </VideoCallControllIcon>
        <VideoCallControllIcon>
          <VideoSlashIcon className="aspect-square w-6" />
        </VideoCallControllIcon>
        <VideoCallControllIcon className="dark:bg-red-500 bg-red-500">
          <CallEndIcon className="aspect-square w-6" />
        </VideoCallControllIcon>
        <VideoCallControllIcon>
          <StopIcon className="aspect-square w-6" />
        </VideoCallControllIcon>
        <VideoCallControllIcon>
          <CallEndIcon className="aspect-square w-6" />
        </VideoCallControllIcon>
      </div>
    </div>
  )
}

export default VideoCallControllBar

interface VideoCallControllIconProps {
  children: React.ReactNode
  className?: string
}
const VideoCallControllIcon: FC<VideoCallControllIconProps> = ({ children, className }) => {
  return (
    <div
      className={
        "w-10 relative overflow-hidden flex items-center justify-center aspect-square rounded-full bg-slate-300 fill-slate-950 dark:fill-slate-50 dark:bg-neutral-900 " +
        (className != undefined ? className : "")
      }
    >
      {children}
    </div>
  )
}
