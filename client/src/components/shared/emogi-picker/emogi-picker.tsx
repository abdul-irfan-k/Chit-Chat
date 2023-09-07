"use client"
// import data from "@emoji-mart/data"
import Picker from "@emoji-mart/react"
import axios from "axios"
import { useEffect, useState } from "react"

const EmogiPicker = () => {
  const [emojiData, setEmojiData] = useState()
  const [isLoadedEmojiData, setIsLoadedEmojiData] = useState(false)

  const getEmojiDataHandler = async () => {
    const { data } = await axios.get(
      "https://cdn.jsdelivr.net/npm/@emoji-mart/data",
    )
    setEmojiData(data)
    setIsLoadedEmojiData(true)
  }
  useEffect(() => {
    getEmojiDataHandler()
  },[])

  return (
    <div>
      {isLoadedEmojiData && <Picker data={emojiData} onEmojiSelect={console.log} />}
    </div>
  )
}

export default EmogiPicker
