import React, { FC } from "react"
import { Reactions } from "./message-reaction-constant"


const MessageReaction: FC<MessageReactionMenu> = () => {
  return (
    <div className="gap-2 flex items-center rounded-full bg-red-400 ">
      {Reactions.map((reaction, index) => {
        return <span className="" key={index}>{reaction.shortcodes}<span>&#115411;</span></span>
      
      })}
    </div>
  )
}

export default MessageReaction
