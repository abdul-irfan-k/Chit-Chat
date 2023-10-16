"use client"

import { callRequestReducerSlate } from "@/redux/reducers/call-request-reducer/call-request-reducer"
import React, { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import VideoCallRequestMenuFullSize from "./video-call-request-menu-full-size/video-call-request-menu-full-size"

const CallRequestMenuCotainer = () => {
  const [isHideFullScreenMenu, setIsHideFullScreenMenu] = useState<boolean>()
  const { isCalling, callRequestData } = useSelector(
    (state: { callRequestReducer: callRequestReducerSlate }) => state.callRequestReducer,
  )

  useEffect(() => {
    console.log("request data is changed ")
  }, [callRequestData])

  return (
    <div>
      {isCalling && (
        <>
          {callRequestData?.callType == "videoCall" && (
            <>
              <VideoCallRequestMenuFullSize userDetail={callRequestData.userDetail} />
            </>
          )}
        </>
      )}
    </div>
  )
}

export default CallRequestMenuCotainer
