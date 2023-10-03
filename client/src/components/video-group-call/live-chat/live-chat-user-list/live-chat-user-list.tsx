import Image from "next/image"
import React, { FC } from "react"

const LiveChatUserList = () => {
  return (
    <div className="mt-5 flex items-center">
      <div></div>
      <div className="gap-1 ml-auto flex items-center">
        <LiveChatUserListBox imageSrc="/Asset/avatar.jpg" />
        <LiveChatUserListBox imageSrc="/Asset/avatar.jpg" />
        <LiveChatUserListBox imageSrc="/Asset/avatar.jpg" />
        <div className="relative w-10 flex items-center justify-center aspect-square  rounded-full bg-slate-300 dark:bg-neutral-900">4+</div>
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
