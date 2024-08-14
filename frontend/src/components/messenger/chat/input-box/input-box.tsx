"use client"

import React, { useEffect, useRef, useState } from "react"
import EmogiPicker from "@/components/shared/emogi-picker/emogi-picker"
import { faMicrophone, faFaceSmile, faPlus, faPaperPlane, faStickyNote } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useSelector } from "react-redux"
import { useAppDispatch } from "@/store"
import { sendTextMessageHandler } from "@/redux/actions/chat-action/chat-action"
import { chatUsersListReducerState } from "@/redux/reducers/chat-user-reducer/chat-user-reducer"
import { userDetailState } from "@/redux/reducers/user-redicer/user-reducer"
import VoiceRecorder from "@/components/shared/voice-recorder/voice-recorder"
import { useSocketIoContext } from "@/provider/socket-io-provider/socket-io-provider"
import InputSelectionBox from "./input-selection-box/input-selection-box"
import { Button } from "@/components/ui/button"
import { Plus, Send, Smile, Sticker } from "lucide-react"
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
    if (popUpMenuType == inputPopUpMenuType && popUpMenuType != undefined) return setInputPopUpMenuType(undefined)
    setInputPopUpMenuType(popUpMenuType)
  }

  const sendButtonHandler = () => {
    if (currentChaterDetail == null || currentChaterDetail.chatRoomId == undefined || userDetail == null) return

    const messageChannelType = currentChaterDetail.currentChaterType == "user" ? "private" : "group"
    dispatch(
      sendTextMessageHandler(
        {
          message: { messageContent: inputMessage },
          receiverDetails: { _id: currentChaterDetail._id },
          //@ts-ignore
          senderDetails: { _id: userDetail?._id },
          chatRoomDetail: { _id: currentChaterDetail.chatRoomId },
          messageChannelType,
        },
        socket,
      ),
    )
    setInputMessage("")
  }

  return (
    <div className="mt-auto flex  items-center md:gap-3">
      <div className="hidden md:block">
        <Button
          className="relative w-10 bg-background-primary"
          onClick={() => setInputPopUpMenuType("sticker")}
          variant={"secondary"}
          rounded
          size={"icon"}
        >
          <Sticker className="relative w-5 aspect-square" />
        </Button>
      </div>
      <div className="relative">
        <Button
          className="relative w-10 bg-background-primary"
          variant={"secondary"}
          rounded
          onClick={() => popUpMenuButtonHandler("emoji")}
          size={"icon"}
        >
          <Smile className="w-5 aspect-square" />
        </Button>
        <EmogiPicker emojiSelectHandler={setInputMessage} isActive={inputPopUpMenuType == "emoji"} />
      </div>
      <div className="relative">
        <Button
          className="relative w-10 bg-background-primary"
          variant={"secondary"}
          rounded
          onClick={() => popUpMenuButtonHandler("media")}
          size={"icon"}
        >
          <Plus className="w-5 aspect-square" />
        </Button>
        <InputSelectionBox
          outsideClickHandler={() => setInputPopUpMenuType(undefined)}
          isActive={inputPopUpMenuType == "media"}
        />
      </div>

      <div className="relative flex w-full md:gap-3">
        <div className="flex-1 px-1 md:px-5">
          <input
            type="text"
            value={inputMessage}
            onChange={inputChangeHandler}
            className="px-4 py-2 w-full rounded-full text-slate-950  bg-slate-300 outline-none dark:text-slate-50 dark:bg-background-primary"
          />
        </div>
        <Button
          className="relative w-10 bg-background-primary"
          variant={"secondary"}
          rounded
          onClick={sendButtonHandler}
          size={"icon"}
        >
          <Send className="w-5 aspect-square" />
        </Button>
        <VoiceRecorder />
      </div>
    </div>
  )
}

export default InputBox
