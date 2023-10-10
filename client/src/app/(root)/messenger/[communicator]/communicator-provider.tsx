"use client"
import { getChatRoomMessageHandler } from "@/redux/actions/chat-action/chat-action"
import { currentChaterReducerSlate } from "@/redux/reducers/chat-user-reducer/chat-user-reducer"
import { chatRoomMessageAction, messageAvailableChatRoomsSlate } from "@/redux/reducers/message-reducer/message-reducer"
import { userDetailState } from "@/redux/reducers/user-redicer/user-reducer"
import { useAppDispatch } from "@/store"
import { usePathname } from "next/navigation"
import React, { useEffect } from "react"
import { useSelector } from "react-redux"

const CommunicatorProvider = ({ children }: { children: React.ReactNode }) => {
  const router = usePathname()
  const dispatch = useAppDispatch()

  const { userDetail } = useSelector((state: { userDetail: userDetailState }) => state.userDetail)
  const { userDetail: currentChaterDetail } = useSelector(
    (state: { currentChater: currentChaterReducerSlate }) => state.currentChater,
  )

  const { chatRooms } = useSelector(
    (state: { messageAvailableChatRooms: messageAvailableChatRoomsSlate }) => state.messageAvailableChatRooms,
  )

  useEffect(() => {
    const isAlreadAvailableMessage = chatRooms.some(
      (chatRoom) => chatRoom.chatRoomId == currentChaterDetail?.chatRoom?.chatRoomId,
    )
    if (isAlreadAvailableMessage) {
      dispatch(chatRoomMessageAction.addCurrentChaterMessage({ chatRoomId: currentChaterDetail?.chatRoom?.chatRoomId }))
      return
    }
    dispatch(
      getChatRoomMessageHandler({ chatRoomId: currentChaterDetail?.chatRoom?.chatRoomId, myUserId: userDetail?._id }),
    )
  }, [router])
  return <>{children}</>
}

export default CommunicatorProvider
