"use client"
import React, { useState } from "react"
import VideoCallHeader from "./video-call-header/video-group-call-header"
import VideoCallStatus from "./video-call-status/video-group-call-status"
import VideoCallViewsContainer from "./video-call-views/video-call-views-container"
import VideoCallControllBar from "./video-call-controllbar/video-call-contoll-bar"
import LiveChatContainer from "./live-chat/live-chat-container"

const VideoCallContainer = () => {
  const [popMenuType, setPopMenuType] = useState<"liveMessage" | "info" | "userList" | undefined>(undefined)

  const popUpMenuTypeChangeHandler = (menuType: "liveMessage" | "info" | "userList") => {
    if (popMenuType == menuType) return setPopMenuType(undefined)
    setPopMenuType(menuType)
  }



  return (
    <div>
      <div className="relative flex gap-5">
        <div
          className="py-5  relative flex flex-col h-screen "
          style={{ width: popMenuType == undefined ? "95vw" : "65vw" }}
        >
          {/* <VideoCallHeader /> */}
          {/* <VideoCallStatus /> */}
          <VideoCallViewsContainer />
        </div>

        <div className="absolute bottom-5 w-full ">
          <VideoCallControllBar onMenuChangeHandler={popUpMenuTypeChangeHandler} />
        </div>
        <div >
          {popMenuType == "liveMessage" && (
            <div className="py-10 px-5 flex-1">
              <LiveChatContainer />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default VideoCallContainer
