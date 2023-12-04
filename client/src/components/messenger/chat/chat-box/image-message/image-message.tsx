import CircleSpinner from "@/components/shared/circle-spinner/circle-spinner"
import { messageDeliveryStatus, messageStatus } from "@/redux/reducers/message-reducer/message-reducer"
import Image from "next/image"
import React, { FC } from "react"

interface ImageMessageProps {
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
  messegeChannelType,
  time,
  userImageSrc,
  userName,
  isContinuingConverstion,
  messageImageSrc,
  messageStatus,
  messageDeliveryStatus
}) => {
  return (
    <div
      className={
        "gap-3 mb-5  clear-both  flex items-start" +
        (messegeChannelType == "incomingMessage" ? " float-lef" : " float-right flex-row-reverse")
      }
    >
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
            "relative mt-5 px-4 py-2 w-[30vw] rounded-md overflow-hidden aspect-video" +
            (messegeChannelType == "incomingMessage" ? " bg-blue-500 text-slate-50" : " bg-slate-300 text-slate-950")
          }
        >
          <Image alt="image" src={messageImageSrc[0]} fill />

          <div className="absolute">
            {messegeChannelType  == "outgoingMessage" && messageStatus ==  "notSended" && <CircleSpinner />}
          </div>
        </div>
      </div>

    </div>
  )
}

export default ImageMessage
