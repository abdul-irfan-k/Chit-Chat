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
import { AnimatePresence } from "framer-motion"

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
              {currentChaterDetail != null && currentChaterDetail.currentChaterType == "user" && (
                <div onClick={() => setShowChaterToggleProfile(!showChaterToggleProfile)}>
                  <ChatProfile
                    currentStatus="ofline"
                    profileImageSrc={
                      currentChaterDetail.profileImageUrl ? currentChaterDetail.profileImageUrl : "/Asset/avatar.jpg"
                    }
                    {...currentChaterDetail}
                  />
                </div>
              )}
              {currentChaterDetail != null && currentChaterDetail.currentChaterType == "group" && (
                <div onClick={() => setShowChaterToggleProfile(!showChaterToggleProfile)}>
                  <ChatProfile currentStatus="ofline" profileImageSrc="/Asset/avatar.jpg" {...currentChaterDetail} />
                </div>
              )}

              {currentChaterDetail != null && <ChatBox />}

              {currentChaterDetail != null && (
                <>
                  {currentChaterDetail.currentChaterType == "user" && <InputBox />}
                  {currentChaterDetail.currentChaterType == "group" &&
                  currentChaterDetail.setting.isAdminOnlySendMessage ? (
                    <InputBox />
                  ) : (
                    currentChaterDetail.isAdmin && <InputBox />
                  )}
                </>
              )}
            </>
          )}

          {isDroppingFile && <DropZone onDropHandler={(e) => console.log("draged result", e)} />}
          {/* <DropZone onDropHandler={(e) => console.log("draged result", e)} /> */}
        </div>
      )}

      <AnimatePresence>
        {showChaterToggleProfile && currentChaterDetail != null && currentChaterDetail.currentChaterType == "user" && (
          <CurrentChaterFullScreenProfile
            profileImageSrc={
              currentChaterDetail.profileImageUrl ? currentChaterDetail.profileImageUrl : "/Asset/avatar.jpg"
            }
            name={currentChaterDetail.name}
            currentStatus="ofline"
            chaterType="single"
            isChatingWithGroup={isCurrentChatingWithGroup}
            closeButtonHanlder={() => setShowChaterToggleProfile(false)}
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
      </AnimatePresence>
    </>
  )
}

export default ChatContainer
