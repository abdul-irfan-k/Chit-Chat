"use client"
import React, { useState } from "react"
import VideoCallControllBar from "../video-call-controllbar/video-call-contoll-bar"
import LiveChatContainer from "../live-chat/live-chat-container"
import VideoCallInfo from "../video-call-info/video-call-info"
import VideoCallUserList from "../video-call-user-list/video-call-user-list"
import { useSelector } from "react-redux"
import { callReducerSlate } from "@/redux/reducers/call-reducer/call-reducer"

const VideoCallBottom = () => {
  const [popMenuType, setPopMenuType] = useState<"liveMessage" | "info" | "userList" | undefined>(undefined)

  const popUpMenuTypeChangeHandler = (menuType: "liveMessage" | "info" | "userList") => {
    if (popMenuType == menuType) {
      setPopMenuType(undefined)
    } else {
      setPopMenuType(menuType)
    }
  }

  const {callDetail} = useSelector((state:{callRedcuer:callReducerSlate}) => state.callRedcuer)

  const popUpMenuOnCloseButtonHandler = () => {
    // setPopMenuType(undefined)
  }
  return (
    <>
      <div className="absolute bottom-5 w-full ">
        <VideoCallControllBar onMenuChangeHandler={popUpMenuTypeChangeHandler} />
      </div>
      {popMenuType != undefined && (
        <div className="pb-10 w-[35vw] ">
          {popMenuType == "liveMessage" && (
            <div className="py-10 px-5 flex-1 h-full">
              <LiveChatContainer />
            </div>
          )}
          {popMenuType == "info" && (
            <div className="py-10 px-5 flex-1 h-full">
              <VideoCallInfo onCloseButtonHandler={popUpMenuOnCloseButtonHandler} referenceId={callDetail?.referenceId} />
            </div>
          )}
          {popMenuType == "userList" && (
            <div className="py-10 px-5 flex-1 h-full">
              <VideoCallUserList onCloseButtonHandler={popUpMenuOnCloseButtonHandler} />
            </div>
          )}
        </div>
      )}
    </>
  )
}

export default VideoCallBottom
