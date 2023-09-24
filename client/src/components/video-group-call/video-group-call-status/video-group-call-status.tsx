import { PlusIcon, StopIcon } from "@/constants/icon-contant"
import React from "react"

const VideoGroupCallStatus = () => {
  return (
    <div className="mt-5 flex items-center justify-between">
      <div className="gap-2 flex items-center ">
        <div className="w-6 relative overflow-hidden flex items-center justify-center aspect-square rounded-full  fill-orange-500">
          <StopIcon className="w-6 aspect-square" />
        </div>
        <div className="text-base">Record 03:05</div>
      </div>
      <div className="gap-2 flex items-center ">
        <div className="w-6 relative overflow-hidden flex items-center justify-center aspect-square rounded-full bg-orange-500 fill-slate-50">
          <PlusIcon className="w-4 aspect-square" />
        </div>
        <div className="text-base">Add User</div>
      </div>

    </div>
  )
}

export default VideoGroupCallStatus
