"use client"

import React, { useEffect, useState } from "react"
import EmogiPicker from "@/components/shared/emogi-picker/emogi-picker"
import { faMicrophone, faFaceSmile, faPlus, faPaperPlane, faStickyNote } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useSelector } from "react-redux"
import { useAppDispatch } from "@/store"
import { sendMessageHandler } from "@/redux/actions/chat-action/chat-action"
import { currentChaterReducerSlate } from "@/redux/reducers/chat-reducer/chat-reducer"
import { userDetailState } from "@/redux/reducers/user-redicer/user-reducer"
import { socketReducerState } from "@/redux/reducers/socket-reducer/socket-reducers"

type inputPopUpMenuType = "emoji" | "sticker" | "media" | undefined

const InputBox = () => {
  const dispatch = useAppDispatch()
  const [inputMessage, setInputMessage] = useState("")
  const [inputPopUpMenuType, setInputPopUpMenuType] = useState<inputPopUpMenuType>(undefined)

  const { socket } = useSelector((state: { socketClient: socketReducerState }) => state.socketClient)
  const { userDetail: currentChaterDeatil } = useSelector(
    (state: { currentChater: currentChaterReducerSlate }) => state.currentChater,
  )
  const { userDetail } = useSelector((state: { userDetail: userDetailState }) => state.userDetail)

  const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputMessage(e.target.value)
  }

  const popUpMenuButtonHandler = (popUpMenuType: inputPopUpMenuType) => {
    if (popUpMenuType == inputPopUpMenuType) return setInputPopUpMenuType(undefined)
    console.log("popup menu buttion")
    setInputPopUpMenuType(popUpMenuType)
  }

  const sendButtonHandler = () => {
    if (currentChaterDeatil == null) return console.log("user id not found")
    dispatch(
      sendMessageHandler(
        {
          message: inputMessage,
          receiverId: currentChaterDeatil._id,
          senderId: userDetail?._id,
          chatRoomId: currentChaterDeatil.chatRoom?.chatRoomId,
        },
        socket,
      ),
    )
  }

  return (
    <div className="flex gap-3 justify-between items-center">
      <div
        className="relative w-10 flex justify-center items-center aspect-square bg-slate-300 rounded-full dark:bg-slate-800"
        onClick={() => setInputPopUpMenuType("sticker")}
      >
        <FontAwesomeIcon icon={faStickyNote} />
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
      <div
        className="w-10 flex justify-center items-center aspect-square bg-slate-300 rounded-full dark:bg-slate-800"
        onClick={() => popUpMenuButtonHandler("media")}
      >
        <FontAwesomeIcon icon={faPlus} />
      </div>

      <div className="flex-1 px-5">
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
      <div className="w-10 flex justify-center items-center aspect-square bg-slate-300 rounded-full dark:bg-slate-800">
        <FontAwesomeIcon icon={faMicrophone} />
      </div>
    </div>
  )
}

export default InputBox
