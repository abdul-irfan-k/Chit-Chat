import Image from "next/image"
import React, { FC, useState } from "react"
import VideoMessagePreview from "./video-message-preview/video-message-preview"
import { useContextMenuContext } from "@/provider/context-menu-provider/context-menu-provider"
import { messageDeliveryStatus, messageStatus } from "@/redux/reducers/message-reducer/message-reducer"
import CircleSpinner from "@/components/shared/circle-spinner/circle-spinner"

interface VideoMessageProps {
  _id: string
  time: Date
  messegeChannelType: "incomingMessage" | "outgoingMessage"
  userName: string
  userImageSrc: string
  isContinuingConverstion?: Boolean
  messageVideoSrc: string
  messageStatus?: messageStatus
  messageDeliveryStatus?: messageDeliveryStatus
}
const VideoMessage: FC<VideoMessageProps> = ({
  _id,
  messageVideoSrc,
  messegeChannelType,
  time,
  userImageSrc,
  userName,
  isContinuingConverstion,
  messageDeliveryStatus,
  messageStatus,
}) => {
  const [previewVideo, setPreviewVideo] = useState<boolean>(false)
  const contextMenu = useContextMenuContext()
  return (
    <div className={"gap-5  flex items-start" + (messegeChannelType == "incomingMessage" ? " " : "  flex-row-reverse")}>
      <div className="relative aspect-square w-14">
        <Image alt="user-image" src={userImageSrc} fill className="aspect-square rounded-2xl" />
      </div>

      <div className="gap-1 flex flex-col">
        <div className={"flex gap-1 items-center " + (messegeChannelType == "incomingMessage" ? "" : " ml-auto")}>
          <div className="font-medium text-base text-slate-950 dark:text-slate-50 ">{userName}</div>
          <div className="font-light text-xs text-slate-800 dark:text-slate-200">{time.toDateString()}</div>
        </div>

        <div
          className={
            "relative mt-5 px-4 py-4 w-fit ml-auto " +
            (messegeChannelType == "incomingMessage"
              ? " bg-[#3a62b8] text-slate-50 rounded-[5px] rounded-tl-none "
              : " bg-[#4e5f7f] text-slate-50 rounded-[5px]")
          }
          onContextMenu={(e) => {
            e.preventDefault()
            if (contextMenu == null) return

            const isOutGoingMessage: boolean = messegeChannelType == "outgoingMessage"
            contextMenu.setContextMenuDetails({
              type: "message",
              messageDetails: { _id, isOutGoingMessage, messageType: "videoMessage", messageSrc: messageVideoSrc },
            })
            contextMenu.setContextMenuPosition({ xPosition: e.clientX, yPosition: e.clientY })
            contextMenu.setShowContextMenu(true)
          }}
        >
          <div className={"relative  w-[18vw] aspect-video rounded-[8%] overflow-hidden "}>
            <video className=" w-full h-full" src={messageVideoSrc}></video>
          </div>
          {previewVideo && <VideoMessagePreview messageVideoSrc={messageVideoSrc} />}
          <div className="absolute">
            {messegeChannelType == "outgoingMessage" && messageStatus == "notSended" && <CircleSpinner />}
          </div>
        </div>
      </div>
    </div>
  )
}

export default VideoMessage
