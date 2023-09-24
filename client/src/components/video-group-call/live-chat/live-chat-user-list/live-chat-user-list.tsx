import Image from "next/image"
import React, { FC } from "react"

const LiveChatUserList = () => {
  return (
    <div className="flex items-center">
      <div></div>
      <div className="gap-2 ml-auto flex items-center">
        <LiveChatUserListBox imageSrc="/Asset/avatar.jpg" />
        <LiveChatUserListBox imageSrc="/Asset/avatar.jpg" />
        <LiveChatUserListBox imageSrc="/Asset/avatar.jpg" />
        <div className="relative w-10 aspect-square rounded-full">4+</div>
      </div>
    </div>
  )
}

export default LiveChatUserList

interface LiveChatUserListBoxProps {
  imageSrc: string
}
const LiveChatUserListBox: FC<LiveChatUserListBoxProps> = ({ imageSrc }) => {
  return (
    <div className="relative w-10 aspect-square rounded-full">
      <Image src={imageSrc} alt="image" fill className="rounded-full" />
    </div>
  )
}
