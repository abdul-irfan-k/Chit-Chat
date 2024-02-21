"use client"
import data from "@emoji-mart/data"
import Picker from "@emoji-mart/react"
import axios from "axios"
import React, { FC, useEffect, useState } from "react"

interface EmogiPickerProps {
  emojiSelectHandler: React.Dispatch<React.SetStateAction<string>>
}

const EmogiPicker: FC<EmogiPickerProps> = ({ emojiSelectHandler }) => {
  const [emojiData, setEmojiData] = useState()
  const [isLoadedEmojiData, setIsLoadedEmojiData] = useState(false)

  const getEmojiDataHandler = async () => {
    const { data } = await axios.get("https://cdn.jsdelivr.net/npm/@emoji-mart/data")
    setEmojiData(data)
    console.log("data",data)
    setIsLoadedEmojiData(true)
  }
  useEffect(() => {
    getEmojiDataHandler()
  }, [])

  const onEmojiSelectHandler = (data: any) => {
    const emoji = data.native
    console.log("emijis",data, { id: data.id, unified: data.unified, shortcodes: data.shortcodes, native: data.native })
    emojiSelectHandler((val) => {
      return val + emoji
    })
  }

  return (
    <div className="absolute bottom-[200%]">
      {/* {isLoadedEmojiData && (
        <div >
          <Picker data={emojiData} onEmojiSelect={onEmojiSelectHandler} />
        </div>
      )} */}
      <Picker data={data} onEmojiSelect={onEmojiSelectHandler} />
    </div>
  )
}

export default EmogiPicker
