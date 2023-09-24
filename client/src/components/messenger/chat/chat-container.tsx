"use client"

import { useSelector } from "react-redux"
import ChatBox from "./chat-box/chat-box"
import ChatProfile from "./chat-profile/chat-profile"
import InputBox from "./input-box/input-box"
import { messengerSortState } from "@/redux/reducers/messenger-reducer/messenger-reducer"

const ChatContainer = () => {
  const { messengerSortType } = useSelector((state: { messengerSort: messengerSortState }) => state.messengerSort)
  return (
    <>
      {messengerSortType == "chat" && (
        <div className="relative mt-10  gap-8 flex flex-col  w-[60%] ">
          <ChatProfile currentStatus="ofline" profileImageSrc="/Asset/avatar.jpg" name="irfan" />

          <ChatBox />
          <InputBox />
        </div>
      )}
    </>
  )
}

export default ChatContainer
