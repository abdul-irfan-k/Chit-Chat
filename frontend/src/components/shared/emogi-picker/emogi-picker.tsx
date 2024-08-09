"use client"
import data from "@emoji-mart/data"
import Picker from "@emoji-mart/react"
import React, { FC, useEffect, useState } from "react"
import { motion } from "framer-motion"

interface EmogiPickerProps {
  emojiSelectHandler: React.Dispatch<React.SetStateAction<string>>
  isActive: boolean
}

const EmogiPicker: FC<EmogiPickerProps> = ({ emojiSelectHandler, isActive }) => {
  const onEmojiSelectHandler = (data: any) => {
    const emoji = data.native
    emojiSelectHandler((val) => {
      return val + emoji
    })
  }

  return (
    <motion.div
      className="absolute bottom-[100%]  overflow-hidden "
      variants={{
        initial: {
          width: "0",
          height: "0",
        },
        active: {
          width: "auto",
          height: "auto",
        },
      }}
      initial="initial"
      whileInView={isActive ? "active" : "initial"}
      transition={{ duration: "0.3", ease: "easeOut" }}
    >
      <Picker data={data} onEmojiSelect={onEmojiSelectHandler} />
    </motion.div>
  )
}

export default EmogiPicker
