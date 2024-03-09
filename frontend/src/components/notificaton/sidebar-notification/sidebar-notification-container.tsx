"use client"
import React from "react"
import { motion, AnimatePresence } from "framer-motion"

const SideBarNotificationContainer = () => {
  return (
    <div className="relative  overflow-hidden w-full h-full">
      <AnimatePresence>
        <motion.div
          key={"sidebarNotification"}
          initial={{ translateX: "-100%" }}
          animate={{ translateX: "0%" }}
          exit={{ translateX: "-100%" }}
          transition={{ duration: 0.4 }}
          className="absolute w-full"
        >
            asdf
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

export default SideBarNotificationContainer
