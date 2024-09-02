import { FullScreenIcon, GridOnIcon, GridViewIcon } from "@/constants/icon-constant"
import { Fullscreen } from "lucide-react"
import React from "react"

const VideoCallHeader = () => {
  return (
    <div className="gap-3 px-5 flex  items-center">
      <div className="font-medium text-xl">Web Developer Meeting</div>
      <div className="px-4 py-2 flex rounded-md bg-orange-500 self-start">Teams</div>

      <div className="ml-auto w-6 relative overflow-hidden flex items-center justify-center aspect-square rounded-full  dark:fill-slate-50 fill-slate-950">
        <Fullscreen className="w-6 aspect-square" />
      </div>
      <div className="w-6 relative overflow-hidden flex items-center justify-center aspect-square rounded-full  dark:fill-slate-50 fill-slate-950">
        <GridViewIcon className="w-6 aspect-square" />
      </div>
      <div className="w-6 relative overflow-hidden flex items-center justify-center aspect-square rounded-full  dark:fill-slate-50 fill-slate-950">
        <GridOnIcon className="w-6 aspect-square" />
      </div>
    </div>
  )
}

export default VideoCallHeader
