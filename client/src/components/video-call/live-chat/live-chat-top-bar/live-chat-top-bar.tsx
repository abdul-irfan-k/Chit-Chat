import { BellIcon, ChatIcon } from "@/constants/icon-constant"
import React from "react"

const LiveChatTopBar = () => {
  return (
    <div className="flex items-center">
      <div className="w-6 relative overflow-hidden flex items-center justify-center aspect-square rounded-full  dark:fill-slate-50 fill-slate-950">
        <ChatIcon className="w-6 aspect-square" />
      </div>

      <div className="ml-auto w-6 relative overflow-hidden flex items-center justify-center aspect-square rounded-full  dark:fill-slate-50 fill-slate-950">
        <BellIcon className="w-6 aspect-square" />
      </div>
    </div>
  )
}

export default LiveChatTopBar
