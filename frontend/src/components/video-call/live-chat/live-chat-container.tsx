import React from "react"
import LiveChatTopBar from "./live-chat-top-bar/live-chat-top-bar"
import LiveChatUserList from "./live-chat-user-list/live-chat-user-list"
import LiveChatInputBox from "./live-chat-input-box/live-chat-input-box"
import LiveChatBox from "./live-chat-box/live-chat-box"

const LiveChatContainer = () => {
  return (
    <div className="w-[100%] ">
      {/* <LiveChatTopBar /> */}
      {/* <LiveChatUserList /> */}
      <LiveChatBox />
      <LiveChatInputBox />
    </div>
  )
}

export default LiveChatContainer
