"use client"

import { useSelector } from "react-redux"
import ChatBox from "./chat-box/chat-box"
import ChatProfile from "./chat-profile/chat-profile"
import InputBox from "./input-box/input-box"
import { messengerSortState } from "@/redux/reducers/messenger-sort-reducer/messenger-sort-reducer"
import { chatUsersListReducerState } from "@/redux/reducers/chat-user-reducer/chat-user-reducer"
import { useEffect, useState } from "react"
import CurrentChaterFullScreenProfile from "./current-chater-full-screen-profile/current-chater-full-screen-profile"
import CurrentChatingGroupProfile from "./current-chating-group-profile/current-chating-group-profile"
import DropZone from "@/components/shared/drop-zone/drop-zone"

const ChatContainer = () => {
  const { messengerSortType } = useSelector((state: { messengerSort: messengerSortState }) => state.messengerSort)
  const { currentChaterDetail, isCurrentChatingWithGroup } = useSelector(
    (state: { chatUsersList: chatUsersListReducerState }) => state.chatUsersList,
  )
  const [showChaterToggleProfile, setShowChaterToggleProfile] = useState<boolean>(false)

  const [isDroppingFile, setIsDroppingFile] = useState<boolean>(false)
  return (
    <>
      {messengerSortType == "chat" && (
        <div
          className="py-5 relative  h-full flex flex-col  w-[90%]"
          onDragEnter={() => {
            console.log("on drag enter")
            setIsDroppingFile(true)
          }}
          onDragLeave={() => setIsDroppingFile(false)}
        >
          {!isDroppingFile && (
            <>
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
              {currentChaterDetail != null && currentChaterDetail.currentChaterType == "group" && (
                <div onClick={() => setShowChaterToggleProfile(!showChaterToggleProfile)}>
                  <ChatProfile currentStatus="ofline" profileImageSrc="/Asset/avatar.jpg" {...currentChaterDetail} />
                </div>
              )}

              <ChatBox />
              {currentChaterDetail != undefined && currentChaterDetail.currentChaterType == "user" && <InputBox />}
              {currentChaterDetail != undefined &&
              currentChaterDetail.currentChaterType == "group" &&
              currentChaterDetail.setting.isAdminOnlySendMessage ? (
                currentChaterDetail.isAdmin && <InputBox />
              ) : (
                <InputBox />
              )}

            </>
          )}

          {isDroppingFile && <DropZone onDropHandler={(e) => console.log("draged result",e)} />}
          {/* <DropZone onDropHandler={(e) => console.log("draged result", e)} /> */}
        </div>
      )}
      {showChaterToggleProfile && currentChaterDetail != null && currentChaterDetail.currentChaterType == "user" && (
        <CurrentChaterFullScreenProfile
          profileImageSrc="/Asset/avatar.jpg"
          name={currentChaterDetail.name}
          currentStatus="ofline"
          chaterType="single"
          isChatingWithGroup={isCurrentChatingWithGroup}
        />
      )}
      {showChaterToggleProfile && currentChaterDetail != null && currentChaterDetail.currentChaterType == "group" && (
        <CurrentChatingGroupProfile
          profileImageSrc="/Asset/avatar.jpg"
          name={currentChaterDetail.name}
          isChatingWithGroup={isCurrentChatingWithGroup}
          {...currentChaterDetail}
        />
      )}
    </>
  )
}

export default ChatContainer
