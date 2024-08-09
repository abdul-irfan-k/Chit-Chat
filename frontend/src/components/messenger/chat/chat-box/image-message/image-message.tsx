import CircleSpinner from "@/components/shared/circle-spinner/circle-spinner"
import { useContextMenuContext } from "@/provider/context-menu-provider/context-menu-provider"
import MessageReactionMenuProvider from "@/provider/message-reaction-menu-provider/message-reaction-menu-provider"
import { messageDeliveryStatus, messageStatus } from "@/redux/reducers/message-reducer/message-reducer"
import Image from "next/image"
import React, { FC } from "react"

interface ImageMessageProps {
  _id: string
  time: Date
  messegeChannelType: "incomingMessage" | "outgoingMessage"
  userName: string
  userImageSrc: string
  isContinuingConverstion?: Boolean
  messageImageSrc: string[]
  messageStatus?: messageStatus
  messageDeliveryStatus?: messageDeliveryStatus
}
const ImageMessage: FC<ImageMessageProps> = ({
  _id,
  messegeChannelType,
  time,
  userImageSrc,
  userName,
  isContinuingConverstion,
  messageImageSrc,
  messageStatus,
  messageDeliveryStatus,
}) => {
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

        <MessageReactionMenuProvider messageId={_id}>
          <div
            className={
              "relative mt-5 px-4 py-4 w-fit ml-auto " +
              (messegeChannelType == "incomingMessage"
                ? " bg-[#3a62b8] text-slate-50 rounded-[5px] rounded-tl-none "
                : " bg-[#4e5f7f] text-slate-50 rounded-[5px]")
            }
          >
            <div
              className={"relative  w-[6vw] aspect-square rounded-xl overflow-hidden "}
              onContextMenu={(e) => {
                e.preventDefault()
                if (contextMenu == null) return

                const isOutGoingMessage: boolean = messegeChannelType == "outgoingMessage"
                contextMenu.setContextMenuDetails({
                  type: "message",
                  messageDetails: {
                    _id,
                    isOutGoingMessage,
                    messageType: "imageMessage",
                    messageSrc: messageImageSrc[0],
                  },
                })
                contextMenu.setContextMenuPosition({ xPosition: e.clientX, yPosition: e.clientY })
                contextMenu.setShowContextMenu(true)
              }}
            >
              <Image alt="image" src={messageImageSrc[0]} fill />
              {/* 
            <div className="absolute">
            {messegeChannelType == "outgoingMessage" && messageStatus == "notSended" && <CircleSpinner />}
            </div> */}
            </div>
          </div>
        </MessageReactionMenuProvider>
      </div>
    </div>
  )
}

export default ImageMessage
