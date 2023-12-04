import { CopyIcon, DeleteIcon } from "@/constants/icon-constant"
import { messageDetail } from "@/provider/context-menu-provider/context-menu-provider"
import { useSocketIoContext } from "@/provider/socket-io-provider/socket-io-provider"
import { deleteMessageHandler } from "@/redux/actions/chat-action/chat-action"
import { chatUsersListReducerState } from "@/redux/reducers/chat-user-reducer/chat-user-reducer"
import { userDetailState } from "@/redux/reducers/user-redicer/user-reducer"
import { useAppDispatch } from "@/store"
import React, { FC, useState } from "react"
import { useSelector } from "react-redux"
import { saveAs } from "file-saver"

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
    (state: { chatUsersList: chatUsersListReducerState }) => state.chatUsersList,
  )
  const { userDetail } = useSelector((state: { userDetail: userDetailState }) => state.userDetail)
  const { socket } = useSocketIoContext()

  const deleteMessageButtonHandler = () => {
    console.log("delete message button", currentChaterDetail?.currentChaterType == "user")
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

  const copyButtonHandler = (content) => {
    navigator.clipboard.writeText(content)
  }

  const downloadButtonHandler = (src: string) => {
    saveAs(src)
  }
  return (
    <div>
      <div
        className="fixed gap-2 px-4 py-2 w-[10vw]  left-0 top-0 rounded-md flex flex-col dark:bg-neutral-700 z-[110] "
        style={{ transform: `translate(${xPosition}px, ${yPosition}px)` }}
      >
        <div className="gap-2 flex items-center">
          <div className="relative">
            <DeleteIcon className="w-5 aspect-square" width="" height="" />
          </div>
          <span>Reply</span>
        </div>
        {messageDetail != undefined && messageDetail.messageType == "textMessage" && (
          <div className="gap-2 flex items-center" onClick={() => copyButtonHandler(messageDetail.messageContent)}>
            <div className="relative">
              <CopyIcon className="w-5 aspect-square" width="" height="" />
            </div>
            <span>Copy</span>
          </div>
        )}
        {(messageDetail != undefined && messageDetail.messageType == "imageMessage") ||
          (messageDetail?.messageType == "voiceMessage" && (
            <div className="gap-2 flex items-center" onClick={() => downloadButtonHandler(messageDetail.messageSrc)}>
              <div className="relative">
                <CopyIcon className="w-5 aspect-square" width="" height="" />
              </div>
              <span>Download</span>
            </div>
          ))}
        <div className="gap-2 flex items-center">
          <div className="relative">
            <DeleteIcon className="w-5 aspect-square" width="" height="" />
          </div>
          <span>Pin</span>
        </div>
        <div className="gap-2 flex items-center">
          <div className="relative">
            <DeleteIcon className="w-5 aspect-square" width="" height="" />
          </div>
          <span>Forward</span>
        </div>
        <div className="gap-2 flex items-center">
          <div className="relative">
            <DeleteIcon className="w-5 aspect-square" width="" height="" />
          </div>
          <span>Select</span>
        </div>
        {isOutGoingMessage && (
          <div className="gap-2 flex items-center" onClick={deleteMessageButtonHandler}>
            <div className="relative">
              <DeleteIcon className="w-5 aspect-square" width="" height="" />
            </div>
            <span>delete</span>
          </div>
        )}
      </div>
    </div>
  )
}

export default MessageContextMenu
