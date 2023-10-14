import { GearIcon, HomeIcon, VideoCamIcon } from "@/constants/icon-constant"
import Image from "next/image"
import Link from "next/link"
import React, { FC } from "react"

const VideoCallSidebar = () => {
  return (
    <div className="fixed h-[100vh] top-[50%] w-16 translate-y-[-50%] flex flex-col justify-between items-center">
      <div className="mt-5 w-10 absolute overflow-hidden flex items-center justify-center aspect-square rounded-full">
        <Image alt="profile-image" src={"/Asset/avatar.jpg"} fill />
      </div>
      <div className="gap-7 mx-auto my-auto flex flex-col">
        <Link href={'/messenger'}>
          <VideoCallSidebarIcon>
            <HomeIcon className="w-6 aspect-square" />
          </VideoCallSidebarIcon>
        </Link>
        <VideoCallSidebarIcon>
          <VideoCamIcon className="w-6 aspect-square" />
        </VideoidebarIcon>
        <VideoCallSidebarIcon>
          <GearIcon className="w-6 aspect-square" />
        </VideoCallSidebarIcon>
        <VideoCallSidebarIcon>
          <GearIcon className="w-6 aspect-square" />
        </Video
        <VideoCallSidebarIcon>
          <GearIcon className="w-6 aspect-square" />
        </VideoCallSidebarIcon>
      </div>
    </div>
  )
}

export default VideoCallSidebar

interface VideoCallSidebarIconProps {
  children: React.ReactNode
}
const VideoCallSidebarIcon: FC<VideoidebarIconProps> = ({ children }) => {
  return (
    <div className="w-10 relative overflow-hidden flex items-center justify-center aspect-square rounded-full bg-slate-300 fill-slate-950 dark:fill-slate-50 dark:bg-neutral-900">
      {children}
    </div>
  )
}
