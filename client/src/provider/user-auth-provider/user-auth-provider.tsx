"use client"
import { addAllChatGroups, addAllChatUsers, getIntialOnlineChatUsers } from "@/redux/actions/chat-action/chat-action"
import { checkUserIsLogedIn } from "@/redux/actions/user-action/user-action"
import { chatUsersListReducerState } from "@/redux/reducers/chat-user-reducer/chat-user-reducer"
import { userDetailState } from "@/redux/reducers/user-redicer/user-reducer"
import { useAppDispatch } from "@/store"
import React, { FC, useEffect } from "react"
import { useSelector } from "react-redux"
import { useSocketIoContext } from "../socket-io-provider/socket-io-provider"
import { callLogsReducerState } from "@/redux/reducers/call-log-reducer/call-log-reducer"

interface UserAuthProviderProps {
  children: React.ReactNode
}
const UserAuthProvider: FC<UserAuthProviderProps> = ({ children }) => {
  const dispatch = useAppDispatch()
  const { isChanged: isChatUserListChanged } = useSelector(
    (state: { chatUsersList: chatUsersListReducerState }) => state.chatUsersList,
  )
  const {
    userDetail: userDetails,
    isChanged,
    isLogedIn,
  } = useSelector((state: { userDetail: userDetailState }) => state.userDetail)
  const { callLogs, isInitial: isInitialCallLogs } = useSelector(
    (state: { callLogs: callLogsReducerState }) => state.callLogs,
  )
  const { socket } = useSocketIoContext()

  useEffect(() => {
    dispatch(addAllChatUsers())
    dispatch(addAllChatGroups())
  }, [isChatUserListChanged, dispatch])

  useEffect(() => {
    // if(isInitialCallLogs)
  }, [isInitialCallLogs])
  useEffect(() => {
    if (isLogedIn) {
      socket.emit("socket:join", { userId: userDetails?._id })
      dispatch(getIntialOnlineChatUsers(socket))
    }
  }, [isLogedIn, dispatch])

  useEffect(() => {
    dispatch(checkUserIsLogedIn())
  }, [])

  return <>{children}</>
}

export default UserAuthProvider
