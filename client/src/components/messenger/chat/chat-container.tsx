"use client"

import { useSelector } from "react-redux"
import ChatBox from "./chat-box/chat-box"
import ChatProfile from "./chat-profile/chat-profile"
import InputBox from "./input-box/input-box"
import { messengerSortState } from "@/redux/reducers/messenger-sort-reducer/messenger-sort-reducer"
import { chatUsersListReducerState } from "@/redux/reducers/chat-user-reducer/chat-user-reducer"
import { useEffect } from "react"

const ChatContainer = () => {
  const { messengerSortType } = useSelector((state: { messengerSort: messengerSortState }) => state.messengerSort)
  const { currentChaterDetail } = useSelector((state: { chatUsersList: chatUsersListReducerState }) => state.chatUsersList)

  return (
    <>
      {messengerSortType == "chat" && (
        <div className="py-5 relative  h-full flex flex-col  w-[90%]">     
           
          {currentChaterDetail == null && (
            <ChatProfile currentStatus="ofline" profileImageSrc="/Asset/avatar.jpg" name="irfan" />
          )}
          {currentChaterDetail != null && (
            <ChatProfile currentStatus="ofline" profileImageSrc="/Asset/avatar.jpg" {...currentChaterDetail} />
          )}

          <ChatBox />
          <InputBox />
        </div>
      )}
    </>
  )
}

export default ChatContainer
