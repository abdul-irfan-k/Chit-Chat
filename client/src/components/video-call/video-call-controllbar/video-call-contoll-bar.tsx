"use client"
import {
  CallEndIcon,
  ChatIcon,
  GroupIcon,
  InfoIcon,
  MicIcon,
  MicSlashIcon,
  ScreenShareIcon,
  StopIcon,
  StopScreenShareIcon,
  VideoCamIcon,
  VideoSlashIcon,
  VolumeHighIcon,
} from "@/constants/icon-constant"
import {
  addScreenSharingHandler,
  changeCallSettingHandler,
  removeScreenSharingHandler,
} from "@/redux/actions/call-action/call-action"

import { useAppDispatch } from "@/store"
import React, { FC, useEffect, useState } from "react"

interface VideoCallControllBarProps {
  onMenuChangeHandler(): void
}

const VideoCallControllBar: FC<VideoCallControllBarProps> = ({ onMenuChangeHandler }) => {
  const [isScreenSharing, setIsScreenSharing] = useState<boolean>(false)
  const [isVideoRecording, setIsVideoRecording] = useState<boolean>(true)
  const [isAudioRecording, setIsAudioRecording] = useState<boolean>(true)
  const dispatch = useAppDispatch()

  const soundInputRangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {}
  const screenShareButtonHandler = () => {
    if (isScreenSharing) dispatch(removeScreenSharingHandler())
    else dispatch(addScreenSharingHandler())
    setIsScreenSharing(!isScreenSharing)
  }

  const callEndButtonHandler = () => {}

  const videoButtonHandler = () => {
    if (isVideoRecording) dispatch(changeCallSettingHandler({ isAllowedCamara: false }))
    else dispatch(changeCallSettingHandler({ isAllowedCamara: true }))
    setIsVideoRecording(!isVideoRecording)
  }

  const audioButtonHandler = () => {
    if (isAudioRecording) dispatch(changeCallSettingHandler({ isAllowedMicrophone: false }))
    else dispatch(changeCallSettingHandler({ isAllowedMicrophone: true }))
    setIsAudioRecording(!isAudioRecording)
  }

  return (
    <div className="mt-5 px-4 relative flex items-center">
      <div className="hidden gap-2 absolute  items-center md:flex">
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
        <VideoCallControllIcon onClickHandler={audioButtonHandler}>
          {isAudioRecording ? (
            <MicIcon className="aspect-square w-6" />
          ) : (
            <MicSlashIcon className="aspect-square w-6" />
          )}
        </VideoCallControllIcon>
        <VideoCallControllIcon onClickHandler={videoButtonHandler}>
          {isVideoRecording ? (
            <VideoCamIcon className="aspect-square w-6" />
          ) : (
            <VideoSlashIcon className="aspect-square w-6" />
          )}
        </VideoCallControllIcon>
        <VideoCallControllIcon onClickHandler={screenShareButtonHandler}>
          {isScreenSharing ? (
            <ScreenShareIcon className="aspect-square w-6" />
          ) : (
            <StopScreenShareIcon className="aspect-square w-6" />
          )}
        </VideoCallControllIcon>
        <VideoCallControllIcon>
          <CallEndIcon className="aspect-square w-6" />
        </VideoCallControllIcon>
        <VideoCallControllIcon className="dark:bg-red-500 bg-red-500" onClickHandler={callEndButtonHandler}>
          <CallEndIcon className="aspect-square w-6" />
        </VideoCallControllIcon>
      </div>

      <div className="hidden  gap-2 right-0 absolute  pr-4  items-center fill-slate-950 dark:fill-slate-50 md:flex">
        <VideoCallControllIcon onClickHandler={() => onMenuChangeHandler("info")}>
          <InfoIcon className="w-6 aspect-square" height="" width="" />
        </VideoCallControllIcon>
        <VideoCallControllIcon onClickHandler={() => onMenuChangeHandler("userList")}>
          <GroupIcon className="w-6 aspect-square" height="" width="" />
        </VideoCallControllIcon>
        <VideoCallControllIcon onClickHandler={() => onMenuChangeHandler("liveMessage")}>
          <ChatIcon className="w-6 aspect-square" height="" width="" />
        </VideoCallControllIcon>
      </div>
    </div>
  )
}

export default VideoCallControllBar

interface VideoCallControllIconProps {
  children: React.ReactNode
  className?: string
  onClickHandler(): void
}
const VideoCallControllIcon: FC<VideoCallControllIconProps> = ({ children, className, onClickHandler }) => {
  return (
    <div
      className={
        "w-10 relative overflow-hidden flex items-center justify-center aspect-square rounded-full bg-slate-300 fill-slate-950 dark:fill-slate-50 dark:bg-neutral-900 " +
        (className != undefined ? className : "")
      }
      onClick={onClickHandler}
    >
      {children}
    </div>
  )
}
