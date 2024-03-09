"use client"
import { CallEndIcon, FullScreenIcon, MicIcon, VideoCamIcon } from "@/constants/icon-constant"
import { PeerVideoRefContext } from "@/provider/peer-js-video-provider.tsx/peer-js-video-provider"
import { changeCallSettingHandler, videoCallRequestRemoveHandler } from "@/redux/actions/call-action/call-action"
import { userDetailState } from "@/redux/reducers/user-redicer/user-reducer"
import { useAppDispatch } from "@/store"
import Image from "next/image"
import React, { FC, useContext, useState } from "react"
import { useSelector } from "react-redux"

interface VideoCallRequestMenuFullSizeProps {}
const VideoCallRequestMenuFullSize: FC<VideoCallRequestMenuFullSizeProps> = () => {
  const [isAllowedVideoRecording, setIsAllowedVideoRecording] = useState<boolean>(false)
  const [isAllowedVoiceRecording, setIsAllowedVoiceRecording] = useState<boolean>(false)
  const dispatch = useAppDispatch()

  const { userDetail } = useSelector((state: { userDetail: userDetailState }) => state.userDetail)
  const videoContext = useContext(PeerVideoRefContext)

  const callEndIconClickHandler = () => {
    dispatch(videoCallRequestRemoveHandler())
  }

  const camaraToggleButtonHandler = () => {
    dispatch(changeCallSettingHandler({ isAllowedCamara: !isAllowedVideoRecording }))
    setIsAllowedVideoRecording(!isAllowedVideoRecording)
  }
  const micToggleButtonHandler = () => {
    dispatch(changeCallSettingHandler({ isAllowedMicrophone: !isAllowedVoiceRecording }))
    setIsAllowedVoiceRecording(!isAllowedVoiceRecording)
  }

  return (
    <div>
      <div className="fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] z-50 w-[50vw] h-[70vh] ">
        <div className="relative h-full">
          <div className="top-0 absolute w-full h-full bg-black   z-20">
            <Image src={"/Asset/nature.jpg"} alt="image" fill className="opacity-[0.45]" />
          </div>
          <div className="relative px-5 py-5 flex justify-between items-center z-30">
            <div className="text-lg font-medium ">{userDetail?.name}</div>
            <div className="relative fill-slate-950 dark:fill-slate-50">
              <FullScreenIcon width="" height="" className="aspect-square w-8" />
            </div>
          </div>

          {videoContext.videoStream == undefined ? (
            <div className="absolute left-5 bottom-5 w-[20%] aspect-[3/4] z-30">
              {userDetail?.profileImageUrl && <Image src={userDetail?.profileImageUrl} alt="image" fill />}
            </div>
          ) : (
            <div className="absolute left-5 bottom-5 w-[20%] aspect-[3/4] z-30">
              <video
                autoPlay
                className="w-full h-full"
                ref={(ref) => {
                  if (ref != null) ref.srcObject = videoContext.videoStream
                }}
              />
            </div>
          )}
          <div className="absolute gap-5   bottom-10 flex flex-col justify-center items-center z-30  w-full">
            <div className="text-lg font-bold text-slate-50"> Ringing </div>
            <div className="gap-3 flex items-center">
              <div
                className="w-14 relative overflow-hidden flex items-center justify-center aspect-square rounded-full bg-slate-300 fill-slate-950 dark:fill-slate-50 dark:bg-neutral-900"
                onClick={micToggleButtonHandler}
              >
                <MicIcon height="" width="" className="w-8 aspect-square" />
              </div>
              <div
                className="w-14 relative overflow-hidden flex items-center justify-center aspect-square rounded-full bg-red-500 fill-slate-950 dark:fill-slate-50 "
                onClick={callEndIconClickHandler}
              >
                <CallEndIcon height="" width="" className="w-8 aspect-square" />
              </div>
              <div
                className="w-14 relative overflow-hidden flex items-center justify-center aspect-square rounded-full bg-slate-300 fill-slate-950 dark:fill-slate-50 dark:bg-neutral-900"
                onClick={camaraToggleButtonHandler}
              >
                <VideoCamIcon height="" width="" className="w-8 aspect-square" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default VideoCallRequestMenuFullSize
