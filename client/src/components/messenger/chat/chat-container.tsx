"use client"

import { useSelector } from "react-redux"
import ChatBox from "./chat-box/chat-box"
import ChatProfile from "./chat-profile/chat-profile"
import InputBox from "./input-box/input-box"
import { messengerSortState } from "@/redux/reducers/messenger-sort-reducer/messenger-sort-reducer"
import { chatUsersListReducerState } from "@/redux/reducers/chat-user-reducer/chat-user-reducer"
import { useEffect, useState } from "react"
import CurrentChaterFullScreenProfile from "./current-chater-full-screen-profile/current-chater-full-screen-profile"

const ChatContainer = () => {
  const { messengerSortType } = useSelector((state: { messengerSort: messengerSortState }) => state.messengerSort)
  const { currentChaterDetail, isCurrentChatingWithGroup } = useSelector(
    (state: { chatUsersList: chatUsersListReducerState }) => state.chatUsersList,
  )
  const [showChaterToggleProfile, setShowChaterToggleProfile] = useState<boolean>(false)

  return (
    <>
      {messengerSortType == "chat" && (
        <div className="py-5 relative  h-full flex flex-col  w-[90%]">
          {currentChaterDetail == null && (
            <div onClick={() => setShowChaterToggleProfile(!showChaterToggleProfile)}>
              <ChatProfile currentStatus="ofline" profileImageSrc="/Asset/avatar.jpg" name="irfan" />
            </div>
          )}
          {currentChaterDetail != null && !isCurrentChatingWithGroup && (
            <div onClick={() => setShowChaterToggleProfile(!showChaterToggleProfile)}>
              <ChatProfile currentStatus="ofline" profileImageSrc="/Asset/avatar.jpg" {...currentChaterDetail} />
            </div>
          )}
          {currentChaterDetail != null && isCurrentChatingWithGroup && (
            <div onClick={() => setShowChaterToggleProfile(!showChaterToggleProfile)}>
              <ChatProfile currentStatus="ofline" profileImageSrc="/Asset/avatar.jpg" {...currentChaterDetail} />
            </div>
          )}

          <ChatBox />
          <InputBox />
        </div>
      )}
      {showChaterToggleProfile && currentChaterDetail != null && (
        <CurrentChaterFullScreenProfile
          profileImageSrc="/Asset/avatar.jpg"
          name={currentChaterDetail.name}
          currentStatus="ofline"
          chaterType="single"
          isChatingWithGroup={isCurrentChatingWithGroup}
        />
      )}
    </>
  )
}

export default ChatContainer
