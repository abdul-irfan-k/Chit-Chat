"use client"
import {
  addCallDataHandler,
  addCallSettingHandler,
  addGroupCallConnectionRequiredPeers,
  addGroupCallJoinRequestedUser,
  addInitialCallDataHandler,
  joinGroupCallHandler,
} from "@/redux/actions/call-action/call-action"
import {
  addNewMessageNotificationHandler,
  onChaterdeleteMessageHandler,
  onGroupSettingChangeHandler,
  receiveMessageHandler,
  receivePollMessageHandler,
  recieveAudioMessageHandler,
  recieveNewImageMessageHandler,
  recieveVideoMessageHandler,
} from "@/redux/actions/chat-action/chat-action"
import { chatUserAndGroupReducerState } from "@/redux/reducers/chat-user-reducer/chat-user-reducer"
import { notificationReducerAction } from "@/redux/reducers/notification-reducer/notification-reducer"
import { userDetailState } from "@/redux/reducers/user-redicer/user-reducer"
import { useAppDispatch } from "@/store"
import React, { useEffect } from "react"
import { useSelector } from "react-redux"
import { useRouter } from "next/navigation"
import { useSocketIoContext } from "../socket-io-provider/socket-io-provider"
import { callReducerAction } from "@/redux/reducers/call-reducer/call-reducer"
const SocketIoChatUserEventProvider = () => {
  const dispatch = useAppDispatch()
  const router = useRouter()

  const { socket } = useSocketIoContext()
  const { currentChaterDetail } = useSelector(
    (state: { chatUserAndGroupList: chatUserAndGroupReducerState }) => state.chatUserAndGroupList,
  )
  const { userDetail, isLogedIn } = useSelector((state: { userDetail: userDetailState }) => state.userDetail)

  useEffect(() => {
    socket.on("message:receiveTextMessage", (messageResponse: any) => {
      if (currentChaterDetail?._id != messageResponse.senderId)
        dispatch(addNewMessageNotificationHandler({ _id: messageResponse.senderId }))
      dispatch(receiveMessageHandler({ ...messageResponse, messageType: "textMessage" }))
    })

    socket.on("message:recieveImageMessage", (messageResponse) => {
      if (currentChaterDetail != null && currentChaterDetail._id != messageResponse.senderId)
        dispatch(addNewMessageNotificationHandler({ _id: messageResponse.senderId }))
      dispatch(
        receiveMessageHandler({
          chatRoomId: messageResponse.chatRoomId,
          message: messageResponse.message,
          messageType: "imageMessage",
        }),
      )
    })

    socket.on("message:receiveMultipleImageMessage", (messageResponse) => {
      if (currentChaterDetail != null && currentChaterDetail._id != messageResponse.senderId)
        dispatch(addNewMessageNotificationHandler({ _id: messageResponse.senderId }))
    })
    socket.on("message:receiveVideoMessage", ({ chatRoomId, message, receiverId, senderId }) => {
      if (currentChaterDetail != null && currentChaterDetail._id != chatRoomId)
        dispatch(addNewMessageNotificationHandler({ _id: senderId }))
      dispatch(receiveMessageHandler({ chatRoomId, message, messageType: "videoMessage" }))
    })

    socket.on("groupMessage:receivePollMessage", ({ chatRoomId, message, senderId, groupDetail }) => {
      dispatch(receivePollMessageHandler({ chatRoomId, message, senderId }))
    })

    socket.on("groupMessage:receiveAudioMessage", (messageResponse) => {
      console.log("new audio mesasge")
      if (currentChaterDetail != null && currentChaterDetail._id != chatRoomId)
        dispatch(addNewMessageNotificationHandler({ _id: messageResponse.senderId }))
      dispatch(
        recieveAudioMessageHandler({
          chatRoomId: messageResponse.chatRoomId,
          message: { _id: messageResponse.message._id, audoMessageSrc: messageResponse.message.file },
        }),
      )
    })

    socket.on("message:deleteMessage", ({ chatRoomId, message }) => {
      dispatch(onChaterdeleteMessageHandler({ chatRoomId, message }))
    })

    // group controll
    socket.on("group:onUpdateSetting", ({ chatRoomId, groupDetail, senderId, setting }) => {
      dispatch(onGroupSettingChangeHandler({ groupDetail, setting }))
    })

    socket.on("privateCall:receive", (data) => {
      dispatch(
        callReducerAction.addCallRequest({ ...data, communicatorsDetail: data.callerDetails, requestType: "incoming" }),
      )
    })

    socket.on("privateCall:start", async (data) => {
      await dispatch(addInitialCallDataHandler(data, userDetail?._id))
      router.push("/video-call")
      dispatch(addCallSettingHandler())
      await dispatch(callReducerAction.removeCallRequest)
      await dispatch(notificationReducerAction.removeCallNotification)
    })
    socket.on("privateCall:ended", (data) => {
      dispatch(callReducerAction.removeCallRequest())
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
  }, [dispatch, isLogedIn])
  return <div></div>
}

export default SocketIoChatUserEventProvider
