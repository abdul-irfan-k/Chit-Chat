"use client"
import {
  addCallDataHandler,
  addCallSettingHandler,
  addGroupCallConnectionRequiredPeers,
  addGroupCallJoinRequestedUser,
  addInitialCallDataHandler,
  joinGroupCallHandler,
} from "@/redux/actions/call-action/call-action"
import { addNewMessageNotificationHandler, receiveMessageHandler } from "@/redux/actions/chat-action/chat-action"
import { chatUsersListReducerState } from "@/redux/reducers/chat-user-reducer/chat-user-reducer"
import { socketReducerState } from "@/redux/reducers/socket-reducer/socket-reducers"
import { callRequestNotificationReducerAction } from "@/redux/reducers/notification-reducer/notification-reducer"
import { userDetailState } from "@/redux/reducers/user-redicer/user-reducer"
import { useAppDispatch } from "@/store"
import React, { useEffect } from "react"
import { useSelector } from "react-redux"
import { useRouter } from "next/navigation"
import { callRequestRedcuerAction } from "@/redux/reducers/call-request-reducer/call-request-reducer"
import { useSocketIoContext } from "../socket-io-provider/socket-io-provider"
const SocketIoChatUserEventProvider = () => {
  const dispatch = useAppDispatch()
  const router = useRouter()

  const { socket } = useSocketIoContext()
  const { isAvailableSocket } = useSelector((state: { socketClient: socketReducerState }) => state.socketClient)
  const { currentChaterDetail } = useSelector(
    (state: { chatUsersList: chatUsersListReducerState }) => state.chatUsersList,
  )
  const { userDetail, isLogedIn } = useSelector((state: { userDetail: userDetailState }) => state.userDetail)

  useEffect(() => {
    if (!isAvailableSocket || !isLogedIn) return console.log("not availbe socket client", socket)

    socket.on("message:receiveMessage", (messageResponse) => {
      if (currentChaterDetail?._id != messageResponse.senderId)
        dispatch(addNewMessageNotificationHandler({ _id: messageResponse.senderId }))
      dispatch(receiveMessageHandler(messageResponse))
    })

    socket.on("videoCall:requestCallAccept", (data) => {
      dispatch(callRequestNotificationReducerAction.addCallNotification(data))
    })

    socket.on("videoCall:start", async (data) => {
      await dispatch(addInitialCallDataHandler(data, userDetail?._id))
      router.push("/video-call")
      dispatch(addCallSettingHandler())
      await dispatch(callRequestRedcuerAction.removeCallRequest())
      await dispatch(callRequestNotificationReducerAction.removeCallNotification())
    })

    socket.on("groupCall:joinRequestRejected", () => {})

    socket.on("groupCall:joinRequestAccepted", async (details) => {
      await dispatch(joinGroupCallHandler({ ...details, userId: userDetail?._id }))
      router.push(`/video-call`)
    })

    socket.on("groupCall:userJoinRequest", (details) => {
      dispatch(addGroupCallJoinRequestedUser({ ...details }))
    })

    socket.on("groupCall:newUserJoined", async (details) => {
      console.log("new user joined ")
      dispatch(addGroupCallConnectionRequiredPeers({ ...details.newUserDetail }))
    })
  }, [isAvailableSocket, dispatch, isLogedIn])
  return <div></div>
}

export default SocketIoChatUserEventProvider
