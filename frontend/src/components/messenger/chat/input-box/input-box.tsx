"use client"

import React, { useEffect, useRef, useState } from "react"
import EmogiPicker from "@/components/shared/emogi-picker/emogi-picker"
import { faMicrophone, faFaceSmile, faPlus, faPaperPlane, faStickyNote } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useSelector } from "react-redux"
import { useAppDispatch } from "@/store"
import { sendMessageHandler } from "@/redux/actions/chat-action/chat-action"
import { chatUsersListReducerState } from "@/redux/reducers/chat-user-reducer/chat-user-reducer"
import { userDetailState } from "@/redux/reducers/user-redicer/user-reducer"
import VoiceRecorder from "@/components/shared/voice-recorder/voice-recorder"
import { useSocketIoContext } from "@/provider/socket-io-provider/socket-io-provider"
import InputSelectionBox from "./input-selection-box/input-selection-box"
//@ts-ignore

type inputPopUpMenuType = "emoji" | "sticker" | "media" | undefined

const InputBox = () => {
  const dispatch = useAppDispatch()
  const [inputMessage, setInputMessage] = useState("")
  const [inputPopUpMenuType, setInputPopUpMenuType] = useState<inputPopUpMenuType>(undefined)

  const { socket } = useSocketIoContext()
  const { currentChaterDetail } = useSelector(
    (state: { chatUsersList: chatUsersListReducerState }) => state.chatUsersList,
  )
  const { userDetail } = useSelector((state: { userDetail: userDetailState }) => state.userDetail)

  const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputMessage(e.target.value)
  }

  const popUpMenuButtonHandler = (popUpMenuType: inputPopUpMenuType) => {
    if (popUpMenuType == inputPopUpMenuType) return setInputPopUpMenuType(undefined)
    setInputPopUpMenuType(popUpMenuType)
  }

  const sendButtonHandler = () => {
    if (currentChaterDetail == null || currentChaterDetail.chatRoom == undefined || userDetail == null)
      return console.log("user id not found")
    dispatch(
      sendMessageHandler(
        {
          message: inputMessage,
          receiverId: currentChaterDetail._id,
          senderId: userDetail?._id,
          chatRoomId: currentChaterDetail.chatRoom?.chatRoomId,
        },
        socket,
      ),
    )
    setInputMessage("")
  }

  return (
    <div className="mt-auto flex  items-center md:gap-3">
      <div className="hidden md:block">
        <div
          className="relative w-10 flex justify-center items-center aspect-square bg-slate-300 rounded-full dark:bg-slate-800"
          onClick={() => setInputPopUpMenuType("sticker")}
        >
          <FontAwesomeIcon icon={faStickyNote} />
        </div>
      </div>
      <div className="relative">
        <div
          className="relative w-10 flex flex-col justify-center items-center aspect-square bg-slate-300 rounded-full dark:bg-slate-800"
          onClick={() => popUpMenuButtonHandler("emoji")}
        >
          <FontAwesomeIcon icon={faFaceSmile} />
        </div>
        {inputPopUpMenuType == "emoji" && <EmogiPicker emojiSelectHandler={setInputMessage} />}
      </div>
      <div className="relative">
        <div
          className="w-10 flex justify-center items-center aspect-square bg-slate-300 rounded-full dark:bg-slate-800"
          onClick={() => popUpMenuButtonHandler("media")}
        >
          <FontAwesomeIcon icon={faPlus} />
        </div>
        {inputPopUpMenuType == "media" && (
          <InputSelectionBox outsideClickHandler={() => setInputPopUpMenuType(undefined)} />
        )}
      </div>

      <div className="relative flex w-full md:gap-3">
        <div className="flex-1 px-1 md:px-5">
          <input
            type="text"
            value={inputMessage}
            onChange={inputChangeHandler}
            className="px-4 py-2 w-full rounded-full text-slate-950  bg-slate-300 outline-none dark:text-slate-50 dark:bg-slate-800"
          />
        </div>
        <div
          onClick={sendButtonHandler}
          className="w-10 flex justify-center items-center aspect-square bg-slate-300 rounded-full dark:bg-slate-800"
        >
          <FontAwesomeIcon icon={faPaperPlane} />
        </div>
        <VoiceRecorder />
      </div>
    </div>
  )
}

export default InputBox
