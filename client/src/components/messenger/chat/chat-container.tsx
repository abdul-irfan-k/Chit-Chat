"use client"

import { useSelector } from "react-redux"
import ChatBox from "./chat-box/chat-box"
import ChatProfile from "./chat-profile/chat-profile"
import InputBox from "./input-box/input-box"
import { messengerSortState } from "@/redux/reducers/messenger-sort-reducer/messenger-sort-reducer"
import { currentChaterReducerSlate } from "@/redux/reducers/chat-user-reducer/chat-user-reducer"
import { useEffect } from "react"

const ChatContainer = () => {
  const { messengerSortType } = useSelector((state: { messengerSort: messengerSortState }) => state.messengerSort)
  const { userDetail } = useSelector((state: { currentChater: currentChaterReducerSlate }) => state.currentChater)

  return (
    <>
      {messengerSortType == "chat" && (
        <div className="relative mt-10  gap-8 flex flex-col  w-[60%] ">
          {userDetail == null && (
            <ChatProfile currentStatus="ofline" profileImageSrc="/Asset/avatar.jpg" name="irfan" />
          )}
          {userDetail != null && (
            <ChatProfile currentStatus="ofline" profileImageSrc="/Asset/avatar.jpg" {...userDetail} />
          )}

          <ChatBox />
          <InputBox />
        </div>
      )}
    </>
  )
}

export default ChatContainer
