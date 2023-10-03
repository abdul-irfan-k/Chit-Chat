"use client"
import { addAllChatUsers } from "@/redux/actions/chat-action/chat-action"
import { checkUserIsLogedIn } from "@/redux/actions/user-action/user-action"
import { chatUsersListReducerState } from "@/redux/reducers/chat-reducer/chat-reducer"
import { socketReducerState } from "@/redux/reducers/socket-reducer/socket-reducers"
import { userDetailState } from "@/redux/reducers/user-redicer/user-reducer"
import { useAppDispatch } from "@/store"
import { usePathname } from "next/navigation"
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
  const {socket,isAvailableSocket} = useSelector((state: { socketClient: socketReducerState }) => state.socketClient)

  useEffect(() => {
    dispatch(addAllChatUsers())
  }, [isChatUserListChanged])

  useEffect(() => {
    if (isLogedIn) {
      socket.emit("socket:join", { userId: userDetails?._id })
    }
  }, [isChanged])

  useEffect(() => {
    if(!isAvailableSocket) return console.log('not availbe socket client')
    socket.on("message:receiveMessage", ({ message }) => {
      console.log("message in effect", message)
    })
  },[isAvailableSocket])
  
  useEffect(() => {
    dispatch(checkUserIsLogedIn())
  }, [])

  return <>{children}</>
}

export default UserAuthProvider
