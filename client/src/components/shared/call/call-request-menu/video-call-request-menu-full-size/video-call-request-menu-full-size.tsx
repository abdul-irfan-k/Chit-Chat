"use client"
import { CallEndIcon, FullScreenIcon, MicIcon, VideoCamIcon } from "@/constants/icon-constant"
import { videoCallRequestRemoveHandler } from "@/redux/actions/call-request-action/call-request-action"
import { useAppDispatch } from "@/store"
import Image from "next/image"
import React, { FC } from "react"

interface VideoCallRequestMenuFullSizeProps {
  userDetail?: {
    _id: string
    name: string
    userId: string
    email: string
    profileImageUrl?: string
  }
}
const VideoCallRequestMenuFullSize: FC<VideoCallRequestMenuFullSizeProps> = ({ userDetail }) => {
  const dispatch = useAppDispatch()
  const callEndIconClickHandler = () => {
    dispatch(videoCallRequestRemoveHandler())
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

          <div className="absolute left-5 bottom-5 w-[20%] aspect-[3/4] z-30">
            <Image src={"/Asset/avatar.jpg"} alt="image" fill />
          </div>

          <div className="absolute gap-5   bottom-10 flex flex-col justify-center items-center z-30  w-full">
            <div className="text-lg font-bold text-slate-50"> Ringing </div>
            <div className="gap-3 flex items-center">
              <div className="w-14 relative overflow-hidden flex items-center justify-center aspect-square rounded-full bg-slate-300 fill-slate-950 dark:fill-slate-50 dark:bg-neutral-900">
                <MicIcon height="" width="" className="w-8 aspect-square" />
              </div>
              <div className="w-14 relative overflow-hidden flex items-center justify-center aspect-square rounded-full bg-red-500 fill-slate-950 dark:fill-slate-50 "
              onClick={callEndIconClickHandler}
              >
                <CallEndIcon height="" width="" className="w-8 aspect-square" />
              </div>
              <div className="w-14 relative overflow-hidden flex items-center justify-center aspect-square rounded-full bg-slate-300 fill-slate-950 dark:fill-slate-50 dark:bg-neutral-900">
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
