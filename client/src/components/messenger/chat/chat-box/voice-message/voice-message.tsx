import Image from "next/image"
import React, { FC } from "react"

interface VoiceMessageInterface {
  time: Date
  messageChannelType: "incomingMessage" | "outgoingMessage"
  userName: string
  userImageSrc: string
  AudioSrc: string
}
const VoiceMessage: FC<VoiceMessageInterface> = ({ AudioSrc, messageChannelType, time, userImageSrc, userName }) => {
  return (
    <div
      className={
        "gap-3 mb-5  clear-both  flex items-start" +
        (messageChannelType == "incomingMessage" ? " float-lef" : " float-right flex-row-reverse")
      }
    >
      <div className="relative aspect-square w-14">
        <Image alt="user-image" src={userImageSrc} fill className="aspect-square rounded-2xl" />
      </div>
    </div>
  )
}

export default VoiceMessage
