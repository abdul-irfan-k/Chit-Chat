import React from "react"
import { messageReaction } from "@/redux/reducers/message-reducer/message-reducer"

interface MessageReactionProps {
  reactions: messageReaction["reactions"]
}
const MessageReaction = ({ reactions }: MessageReactionProps) => {
  return (
    <div className="gap-2 px-2 py-1 flex items-center rounded-full w-fit  ">
      {reactions != undefined &&
        reactions.map((reaction, index) => {
          return (
            <span className="text-sm" key={index}>
              {reaction.emoji} {reaction.usersId.length}
            </span>
          )
        })}
    </div>
  )
}

export default MessageReaction
