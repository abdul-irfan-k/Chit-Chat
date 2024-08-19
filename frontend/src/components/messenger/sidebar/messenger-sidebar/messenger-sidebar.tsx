import React, { FC } from "react"
import Recent from "../../recent/recent"
import MessengerSort from "../../messenger-sort/messenger-sort"
import ChatList from "../../chat-list/chat-list"
import AddButton from "../../add-button/add-buttton"
import { motion, AnimatePresence } from "framer-motion"

interface MessengerSidebarProps {
  isInitialRender: boolean
}
const MessengerSidebar: FC<MessengerSidebarProps> = ({ isInitialRender }) => {
  return (
    <>
      <AnimatePresence>
        <motion.div
          key={"sidebarNotification"}
          initial={{ translateX: !isInitialRender ? "-100%" : "0%" }}
          animate={{ translateX: "0%" }}
          exit={{ translateX: "-100%" }}
          transition={{ duration: 0.4 }}
          className="h-full "
        >
          <Recent />
          <div className="mt-10 flex flex-col overflow-y-scroll h-[70vh] no-scrollbar">
            <MessengerSort />
            <ChatList />
          </div>
          <AddButton />
        </motion.div>
      </AnimatePresence>
    </>
  )
}

export default MessengerSidebar
