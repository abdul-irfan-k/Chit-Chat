"use client"
import { getChatRoomMessageHandler, getGroupChatRoomMessageHandler } from "@/redux/actions/chat-action/chat-action"
import { chatUserAndGroupReducerState } from "@/redux/reducers/chat-user-reducer/chat-user-reducer"
import { chatRoomMessageAction, chatRoomMessagesReducerSlate } from "@/redux/reducers/message-reducer/message-reducer"
import { userDetailState } from "@/redux/reducers/user-redicer/user-reducer"
import { useAppDispatch } from "@/store"
import { usePathname } from "next/navigation"
import React, { useEffect } from "react"
import { useSelector } from "react-redux"

const CommunicatorProvider = () => {
  const pathName = usePathname()
  const dispatch = useAppDispatch()

  const { userDetail } = useSelector((state: { userDetail: userDetailState }) => state.userDetail)
  const { currentChaterDetail, isCurrentChatingWithGroup } = useSelector(
    (state: { chatUserAndGroupList: chatUserAndGroupReducerState }) => state.chatUserAndGroupList,
  )

  const { messageAvailableChatRoom } = useSelector(
    (state: { messageReducer: chatRoomMessagesReducerSlate }) => state.messageReducer,
  )
  useEffect(() => {
    if (!pathName.includes("/chat/") || !pathName.includes("/group/") || currentChaterDetail?._id) return
    const chatRoomId = pathName.split("/").pop()
    if (chatRoomId == "chat" || chatRoomId == "group" || !chatRoomId) return

    // dispatch(getChatRoomMessageHandler({ chatRoomId: chatRoomId }))
  }, [pathName, currentChaterDetail?._id])

  useEffect(() => {
    const isAlreadAvailableMessage = messageAvailableChatRoom.some(
      (chatRoom) => chatRoom.chatRoomId == currentChaterDetail?.chatRoomId,
    )
    if (isAlreadAvailableMessage) {
      dispatch(chatRoomMessageAction.addCurrentChaterMessage({ chatRoomId: currentChaterDetail?.chatRoomId }))
      return
    }

    if (currentChaterDetail?.currentChaterType == "user") {
      dispatch(getChatRoomMessageHandler({ chatRoomId: currentChaterDetail.chatRoomId, myUserId: userDetail?._id }))
    } else {
      dispatch(
        getGroupChatRoomMessageHandler({
          chatRoomId: currentChaterDetail?.chatRoomId,
          myUserId: userDetail?._id,
        }),
      )
    }
  }, [currentChaterDetail?._id])

  return <></>
}

export default CommunicatorProvider
