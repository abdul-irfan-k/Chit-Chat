"use client"
import { useAppDispatch } from "@/store"
import React, { FC, useState } from "react"

interface MessageReactionMenuProviderProps {
  children: React.ReactNode
  messageId: string
}
const MessageReactionMenuProvider: FC<MessageReactionMenuProviderProps> = ({ children, messageId }) => {
  const dispatch = useAppDispatch()
  const [isHovering, setIsHovering] = useState(false)

  const mouseEnterHandler = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const xPosition = 0

    setIsHovering(true)
    //@ts-ignore
  }

  const mouseLeaveHandler = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    setIsHovering(false)
  }
  return (
    <div onMouseEnter={mouseEnterHandler} onMouseLeave={mouseLeaveHandler}>
      {children}
    </div>
  )
}

export default MessageReactionMenuProvider
