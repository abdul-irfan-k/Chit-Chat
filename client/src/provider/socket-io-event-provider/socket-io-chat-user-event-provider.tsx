"use client"
import { addInitialCallDataHandler } from "@/redux/actions/call-action/call-action"
import { addNewMessageNotificationHandler, receiveMessageHandler } from "@/redux/actions/chat-action/chat-action"
import { currentChaterReducerSlate } from "@/redux/reducers/chat-user-reducer/chat-user-reducer"
import { socketReducerState } from "@/redux/reducers/socket-reducer/socket-reducers"
import { callRequestNotificationReducerAction } from "@/redux/reducers/top-notification-reducer/call-notification-reducer"
import { useAppDispatch } from "@/store"
import React, { useEffect } from "react"
import { useSelector } from "react-redux"

const SocketIoChatUserEventProvider = () => {
  const dispatch = useAppDispatch()

  const { socket, isAvailableSocket } = useSelector((state: { socketClient: socketReducerState }) => state.socketClient)
  const { userDetail: currentChaterDetail } = useSelector(
    (state: { currentChater: currentChaterReducerSlate }) => state.currentChater,
  )

  useEffect(() => {
    if (!isAvailableSocket) return console.log("not availbe socket client", socket)

    socket?.on("message:receiveMessage", (messageResponse) => {
      if (currentChaterDetail?._id != messageResponse.senderId)
        dispatch(addNewMessageNotificationHandler({ _id: messageResponse.senderId }))
      dispatch(receiveMessageHandler(messageResponse))
    })

    socket?.on("videoCall:requestCallAccept", (data) => {
      dispatch(callRequestNotificationReducerAction.addCallNotification(data))
    })

    socket?.on("videoCall:start", (data) => {
      dispatch(addInitialCallDataHandler(data))
    })


  }, [isAvailableSocket, dispatch])
  return <div></div>
}

export default SocketIoChatUserEventProvider
