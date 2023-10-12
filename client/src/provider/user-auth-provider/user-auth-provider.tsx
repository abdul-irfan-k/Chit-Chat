"use client"
import { addAllChatUsers, getIntialOnlineChatUsers } from "@/redux/actions/chat-action/chat-action"
import { checkUserIsLogedIn } from "@/redux/actions/user-action/user-action"
import { chatUsersListReducerState } from "@/redux/reducers/chat-user-reducer/chat-user-reducer"
import { socketReducerState } from "@/redux/reducers/socket-reducer/socket-reducers"
import { userDetailState } from "@/redux/reducers/user-redicer/user-reducer"
import { useAppDispatch } from "@/store"
import React, { FC, useEffect } from "react"
import { useSelector } from "react-redux"

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
  const { socket, isAvailableSocket } = useSelector((state: { socketClient: socketReducerState }) => state.socketClient)

  useEffect(() => {
    dispatch(addAllChatUsers())
  }, [isChatUserListChanged,dispatch])

  useEffect(() => {
    if (isLogedIn) {
      if (!isAvailableSocket) return console.log("not availbe socket", socket)
      socket.emit("socket:join", { userId: userDetails?._id })
      dispatch(getIntialOnlineChatUsers(socket))
    }
  }, [isLogedIn, isAvailableSocket,dispatch])


  useEffect(() => {
    dispatch(checkUserIsLogedIn())
  }, [])

  return <>{children}</>
}

export default UserAuthProvider
