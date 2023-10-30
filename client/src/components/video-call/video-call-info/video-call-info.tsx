import { CopyIcon, XMarkIcon } from "@/constants/icon-constant"
import React, { FC } from "react"

interface VideoCallInfoProps {
  onCloseButtonHandler(): void
  referenceId:string
}
const VideoCallInfo: FC<VideoCallInfoProps> = ({ onCloseButtonHandler,referenceId }) => {
  return (
    <div className="px-5 py-3 rounded-sm w-full h-full bg-slate-200 dark:bg-neutral-950">
      <div className="flex items-center justify-between">
        <div className="font-medium text-lg">Meeting details</div>
        <div onClick={onCloseButtonHandler}>
          <XMarkIcon />
        </div>
      </div>

      <div className="mt-5">
        <div className="font-medium">joining info</div>
        <div className="flex gap-1 items-center text-blue-500 fill-blue-500">
          <div>
            <CopyIcon />
          </div>
          <div>{process.env.FRONTEND_URL}/video-call/{referenceId}</div>
        </div>
      </div>
    </div>
  )
}

export default VideoCallInfo
