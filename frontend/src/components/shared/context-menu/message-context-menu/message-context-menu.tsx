import { CopyIcon, DeleteIcon } from "@/constants/icon-constant"
import { messageDetail, useContextMenuContext } from "@/provider/context-menu-provider/context-menu-provider"
import { useSocketIoContext } from "@/provider/socket-io-provider/socket-io-provider"
import { deleteMessageHandler, messageReactionHandler } from "@/redux/actions/chat-action/chat-action"
import { chatUserAndGroupReducerState } from "@/redux/reducers/chat-user-reducer/chat-user-reducer"
import { userDetailState } from "@/redux/reducers/user-redicer/user-reducer"
import { useAppDispatch } from "@/store"
import React, { FC, useState } from "react"
import { useSelector } from "react-redux"
import { saveAs } from "file-saver"
import { Reactions } from "../../message-reaction-menu/message-reaction-constant"
import { Copy, Download, Forward, Pin, Reply } from "lucide-react"

interface MessageContextMenuProps {
  xPosition: number
  yPosition: number
  isOutGoingMessage?: boolean
  messageDetail?: messageDetail
}
const MessageContextMenu: FC<MessageContextMenuProps> = ({
  xPosition,
  yPosition,
  isOutGoingMessage,
  messageDetail,
}) => {
  const dispatch = useAppDispatch()
  const { currentChaterDetail } = useSelector(
    (state: { chatUserAndGroupList: chatUserAndGroupReducerState }) => state.chatUserAndGroupList,
  )
  const { userDetail } = useSelector((state: { userDetail: userDetailState }) => state.userDetail)
  const { socket } = useSocketIoContext()
  const contextMenu = useContextMenuContext()

  const deleteMessageButtonHandler = () => {
    if (messageDetail == undefined || userDetail == null) return
    if (currentChaterDetail?.currentChaterType == "user")
      dispatch(
        deleteMessageHandler(
          {
            chatRoomId: currentChaterDetail.chatRoom.chatRoomId,
            message: { ...messageDetail },
            receiverId: currentChaterDetail._id,
            senderId: userDetail._id,
          },
          socket,
        ),
      )
  }

  const messageReactionButtonHandler = (emojiId: string, emoji: string) => {
    if (messageDetail == undefined || userDetail == null) return contextMenu?.setShowContextMenu(false)
    const args = {}
    if (currentChaterDetail?.currentChaterType == "user") {
      args.receiverId = currentChaterDetail._id
      args.messageChannelType = "private"
    } else {
      args.groupId = currentChaterDetail._id
      args.messageChannelType = "group"
    }
    dispatch(
      messageReactionHandler(
        //@ts-ignore
        {
          chatRoomId: currentChaterDetail?.chatRoomId,
          message: { emoji, emojiId, _id: messageDetail._id },
          senderId: userDetail._id,
          ...args,
        },
        socket,
      ),
    )
  }

  const copyButtonHandler = (content: string) => {
    navigator.clipboard.writeText(content)
  }

  const downloadButtonHandler = (src: string) => {
    saveAs(src)
  }
  return (
    <div>
      <div
        className="fixed gap-2 px-4 py-2 w-[30vw]  left-0 top-0 rounded-md flex flex-col z-[110]  "
        style={{ transform: `translate(${xPosition}px, ${yPosition}px)` }}
      >
        {!isOutGoingMessage && (
          <div className="gap-2 px-2 py-1 flex items-center rounded-full w-fit dark:bg-background-primary z-[110] ">
            {Reactions.map((reaction, index) => {
              return (
                <span key={index} onClick={() => messageReactionButtonHandler(reaction.id, reaction.native)}>
                  {reaction.native}
                </span>
              )
            })}
          </div>
        )}
        <div className="gap-2 px-4 py-4 flex flex-col z-[110] w-fit z-[110] dark:bg-background-primary">
          <div className=" gap-2 flex items-center ">
            <div className="relative">
              <Reply className="w-5 aspect-square" />
            </div>
            <span>Reply</span>
          </div>
          {messageDetail != undefined && messageDetail.messageType == "textMessage" && (
            <div className="gap-2 flex items-center" onClick={() => copyButtonHandler(messageDetail.messageContent)}>
              <div className="relative">
                <Copy className="w-5 aspect-square" />
              </div>
              <span>Copy</span>
            </div>
          )}
          {(messageDetail != undefined && messageDetail.messageType == "imageMessage") ||
            (messageDetail?.messageType == "voiceMessage" && (
              <div className="gap-2 flex items-center" onClick={() => downloadButtonHandler(messageDetail.messageSrc)}>
                <div className="relative">
                  <Download className="w-5 aspect-square" />
                </div>
                <span>Download</span>
              </div>
            ))}
          <div className="gap-2 flex items-center">
            <div className="relative">
              <Pin className="w-5 aspect-square" />
            </div>
            <span>Pin</span>
          </div>
          <div className="gap-2 flex items-center">
            <div className="relative">
              <Forward className="w-5 aspect-square" />
            </div>
            <span>Forward</span>
          </div>
          <div className="gap-2 flex items-center">
            <div className="relative">
              <DeleteIcon className="w-5 aspect-square" />
            </div>
            <span>Select</span>
          </div>
          {isOutGoingMessage && (
            <div className="gap-2 flex items-center" onClick={deleteMessageButtonHandler}>
              <div className="relative">
                <DeleteIcon className="w-5 aspect-square" />
              </div>
              <span>delete</span>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default MessageContextMenu
