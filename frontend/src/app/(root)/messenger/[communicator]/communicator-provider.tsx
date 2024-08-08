"use client"
import { getChatRoomMessageHandler, getGroupChatRoomMessageHandler } from "@/redux/actions/chat-action/chat-action"
import { chatUsersListReducerState } from "@/redux/reducers/chat-user-reducer/chat-user-reducer"
import { chatRoomMessageAction, chatRoomMessagesReducerSlate } from "@/redux/reducers/message-reducer/message-reducer"
import { userDetailState } from "@/redux/reducers/user-redicer/user-reducer"
import { useAppDispatch } from "@/store"
import { usePathname } from "next/navigation"
import React, { useEffect } from "react"
import { useSelector } from "react-redux"

const CommunicatorProvider = () => {
  const router = usePathname()
  const dispatch = useAppDispatch()

  const { userDetail } = useSelector((state: { userDetail: userDetailState }) => state.userDetail)
  const { currentChaterDetail, isCurrentChatingWithGroup } = useSelector(
    (state: { chatUsersList: chatUsersListReducerState }) => state.chatUsersList,
  )

  const { messageAvailableChatRoom } = useSelector(
    (state: { chatRoomsMessageReducer: chatRoomMessagesReducerSlate }) => state.chatRoomsMessageReducer,
  )

  useEffect(() => {
    const isAlreadAvailableMessage = messageAvailableChatRoom.some(
      (chatRoom) => chatRoom.chatRoomId == currentChaterDetail?.chatRoom?.chatRoomId,
    )
    if (isAlreadAvailableMessage) {
      dispatch(chatRoomMessageAction.addCurrentChaterMessage({ chatRoomId: currentChaterDetail?.chatRoom?.chatRoomId }))
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
  // useEffect(() => {
  //   const isAlreadAvailableMessage = messageAvailableChatRoom.some(
  //     (chatRoom) => chatRoom.chatRoomId == currentChaterDetail?.chatRoom?.chatRoomId,
  //   )
  //   if (isAlreadAvailableMessage) {
  //     dispatch(chatRoomMessageAction.addCurrentChaterMessage({ chatRoomId: currentChaterDetail?.chatRoom?.chatRoomId }))
  //     return
  //   }
  //   dispatch(
  //     getChatRoomMessageHandler({ chatRoomId: currentChaterDetail?.chatRoom?.chatRoomId, myUserId: userDetail?._id }),
  //   )
  // }, [router])
  return <></>
}

export default CommunicatorProvider
