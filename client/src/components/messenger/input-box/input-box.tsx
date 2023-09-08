"use client"

import React, { useState } from "react"
import EmogiPicker from "@/components/shared/emogi-picker/emogi-picker"
import {
  faMicrophone,
  faFaceSmile,
  faPlus,
  faPaperPlane,
  faStickyNote,
} from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

type inputPopUpMenuType = "emoji" | "sticker" | undefined

const InputBox = () => {
  const [inputMessage, setInputMessage] = useState("")
  const [inputPopUpMenuType, setInputPopUpMenuType] =
    useState<inputPopUpMenuType>(undefined)

  const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputMessage(e.target.value)
  }

  const popUpMenuButtonHandler = (val: inputPopUpMenuType) => {
    if (val == inputPopUpMenuType) return setInputPopUpMenuType(undefined)
    setInputPopUpMenuType(val)
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
      <div className="w-10 flex justify-center items-center aspect-square bg-slate-300 rounded-full dark:bg-slate-800">
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
      <div className="w-10 flex justify-center items-center aspect-square bg-slate-300 rounded-full dark:bg-slate-800">
        <FontAwesomeIcon icon={faMicrophone} />
      </div>
      <div className="w-10 flex justify-center items-center aspect-square bg-slate-300 rounded-full dark:bg-slate-800">
        <FontAwesomeIcon icon={faPaperPlane} />
      </div>
    </div>
  )
}

export default InputBox
