import { GearIcon, HomeIcon, VideoCamIcon } from "@/constants/icon-contant"
import Image from "next/image"
import React, { FC } from "react"

const VideoGroupCallSidebar = () => {
  return (
    <div className="fixed h-[100vh] top-[50%] w-16 translate-y-[-50%] flex flex-col justify-between items-center">
      <div className="mt-5 w-10 absolute overflow-hidden flex items-center justify-center aspect-square rounded-full">
        <Image alt="profile-image" src={"/Asset/avatar.jpg"} fill />
      </div>
      <div className="gap-7 mx-auto my-auto flex flex-col">
        <VideoGroupCallSidebarIcon>
          <HomeIcon className="w-6 aspect-square" />
        </VideoGroupCallSidebarIcon>
        <VideoGroupCallSidebarIcon>
          <VideoCamIcon className="w-6 aspect-square" />
        </VideoGroupCallSidebarIcon>
        <VideoGroupCallSidebarIcon>
          <GearIcon className="w-6 aspect-square" />
        </VideoGroupCallSidebarIcon>
        <VideoGroupCallSidebarIcon>
          <GearIcon className="w-6 aspect-square" />
        </VideoGroupCallSidebarIcon>
        <VideoGroupCallSidebarIcon>
          <GearIcon className="w-6 aspect-square" />
        </VideoGroupCallSidebarIcon>
      </div>
    </div>
  )
}

export default VideoGroupCallSidebar

interface VideoGroupCallSidebarIconProps {
  children: React.ReactNode
}
const VideoGroupCallSidebarIcon: FC<VideoGroupCallSidebarIconProps> = ({ children }) => {
  return (
    <div className="w-10 relative overflow-hidden flex items-center justify-center aspect-square rounded-full bg-slate-300 fill-slate-950 dark:fill-slate-50 dark:bg-neutral-900">
      {children}
    </div>
  )
}
