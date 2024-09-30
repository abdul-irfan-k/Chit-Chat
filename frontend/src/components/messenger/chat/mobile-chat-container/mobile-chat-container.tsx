import React, { FC, useState } from "react"
import ChatBox from "../chat-box/chat-box"
import InputBox from "../input-box/input-box"
import { useSelector } from "react-redux"
import { chatUserAndGroupReducerState } from "@/redux/reducers/chat-user-reducer/chat-user-reducer"
import ChatProfile from "../chat-profile/chat-profile"
import CurrentChaterFullScreenProfile from "../current-chater-full-screen-profile/current-chater-full-screen-profile"
import { AnimatePresence } from "framer-motion"

interface MobileChatContainerProps {
  backButtonHandler(): void
}
const MobileChatContainer: FC<MobileChatContainerProps> = ({ backButtonHandler }) => {
  const { currentChaterDetail } = useSelector(
    (state: { chatUserAndGroupList: chatUserAndGroupReducerState }) => state.chatUserAndGroupList,
  )
  const [showChatToggleProfile, setShowChatToggleProfile] = useState(false)

  return (
    <div className="top-0 left-0 fixed flex flex-col items-center h-screen w-screen bg-white  dark:bg-background-primary">
      <div className="relative flex flex-col justify-center  w-screen mx-auto ">
        <div className="pt-2  flex">
          {/* <MobileChatProfile currentStatus="ofline" profileImageSrc="/Asset/avatar.jpg" {...currentChaterDetail} backButtonHandler={backButtonHandler} /> */}
          <ChatProfile
            currentStatus="ofline"
            profileImageSrc="/Asset/avatar.jpg"
            {...currentChaterDetail}
            backButtonHandler={backButtonHandler}
            onClickHandler={() => setShowChatToggleProfile(!showChatToggleProfile)}
          />
        </div>
        <div className="h-[80vh]">
          <ChatBox height={"80vh"} />
        </div>
        <div className="py-2">
          <InputBox />
        </div>
      </div>

      <AnimatePresence>
        {showChatToggleProfile && currentChaterDetail != null && currentChaterDetail.currentChaterType == "user" && (
          <CurrentChaterFullScreenProfile
            profileImageSrc={
              currentChaterDetail.profileImageUrl ? currentChaterDetail.profileImageUrl : "/Asset/avatar.jpg"
            }
            name={currentChaterDetail.name}
            currentStatus="ofline"
            chaterType="single"
            closeButtonHanlder={() => setShowChatToggleProfile(false)}
          />
        )}
        {/* {showChaterToggleProfile && currentChaterDetail != null && currentChaterDetail.currentChaterType == "group" && (
          <CurrentChatingGroupProfile {...currentChaterDetail} />
        )} */}
      </AnimatePresence>
    </div>
  )
}

export default MobileChatContainer
