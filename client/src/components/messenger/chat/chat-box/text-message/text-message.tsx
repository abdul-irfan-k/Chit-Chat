import MessageContextMenu from "@/components/shared/context-menu/message-context-menu/message-context-menu"
import { useContextMenuContext } from "@/provider/context-menu-provider/context-menu-provider"
import Image from "next/image"
import React, { FC } from "react"

interface TextMessageInterface {
  messageContent: string
  time: Date
  messegeChannelType: "incomingMessage" | "outgoingMessage"
  userName: string
  userImageSrc: string
  isContinuingConverstion?: Boolean
}

const TextMessage: FC<TextMessageInterface> = ({
  messageContent,
  messegeChannelType,
  time,
  userName,
  userImageSrc,
}) => {
  const contextMenu = useContextMenuContext()

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
            "px-4 py-2 rounded-full" +
            (messegeChannelType == "incomingMessage" ? " bg-blue-500 text-slate-50" : " bg-slate-300 text-slate-950")
          }
          onContextMenu={(e) => {
            e.preventDefault()
            if (contextMenu == null) return
            contextMenu.setShowContextMenu(true)
            contextMenu.setContextMenuType("message")
            contextMenu.setContextMenuPosition({ xPosition: e.clientX, yPosition: e.clientY })
          }}
        >
          {messageContent}
        </div>
      </div>
    </div>
  )
}

export default TextMessage
