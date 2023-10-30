import React, { FC } from "react"
import MobileChatProfile from "./mobile-chat-profile/mobile-chat-profile"
import ChatBox from "../chat-box/chat-box"
import InputBox from "../input-box/input-box"
import { useSelector } from "react-redux"
import { chatUsersListReducerState } from "@/redux/reducers/chat-user-reducer/chat-user-reducer"
import ChatProfile from "../chat-profile/chat-profile"

interface MobileChatContainerProps {
  backButtonHandler(): void
}
const MobileChatContainer:FC<MobileChatContainerProps> = ({backButtonHandler}) => {
  const { currentChaterDetail } = useSelector((state: { chatUsersList: chatUsersListReducerState }) => state.chatUsersList)

  return (
    <div className="top-0 left-0 fixed flex flex-col items-center h-screen w-screen bg-white z-50 dark:bg-black">
      <div className="relative flex flex-col justify-center  w-screen mx-auto ">
        <div className="pt-4 px-2 flex">
          {/* <MobileChatProfile currentStatus="ofline" profileImageSrc="/Asset/avatar.jpg" {...currentChaterDetail} backButtonHandler={backButtonHandler} /> */}
          <ChatProfile currentStatus="ofline" profileImageSrc="/Asset/avatar.jpg" {...currentChaterDetail} backButtonHandler={backButtonHandler} />
        
        </div>
        <div className="h-[80vh]">
          <ChatBox />
        </div>
        <div className="py-2">
          <InputBox />
        </div>
      </div>
    </div>
  )
}

export default MobileChatContainer
