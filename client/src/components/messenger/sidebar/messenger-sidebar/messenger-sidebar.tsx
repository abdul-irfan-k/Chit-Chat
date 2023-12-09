import React from "react"
import Recent from "../../recent/recent"
import MessengerSort from "../../messenger-sort/messenger-sort"
import ChatList from "../../chat-list/chat-list"
import AddButton from "../../add-button/add-buttton"

const MessengerSidebar = () => {
  return (
    <>
      <Recent />
      <div className="mt-10 flex flex-col overflow-y-scroll no-scrollbar">
        <MessengerSort />
        <ChatList />
      </div>
      <AddButton />
    </>
  )
}

export default MessengerSidebar
