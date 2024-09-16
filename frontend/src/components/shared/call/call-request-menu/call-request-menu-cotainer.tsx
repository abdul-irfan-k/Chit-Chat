"use client"

import React, { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import VideoCallRequestMenuFullSize from "./video-call-request-menu-full-size/video-call-request-menu-full-size"
import { callReducerState } from "@/redux/reducers/call-reducer/call-reducer"

const CallRequestMenuCotainer = () => {
  const { callRequestDetail } = useSelector((state: { callRedcuer: callReducerState }) => state.callRedcuer)

  return (
    <div>
      {callRequestDetail != undefined && callRequestDetail.isCalling && (
        <>
          {callRequestDetail?.callType == "videoCall" && callRequestDetail.callChannelType == "private" && (
            <>
              <VideoCallRequestMenuFullSize callRequestorDetail={callRequestDetail} />
            </>
          )}
        </>
      )}
    </div>
  )
}

export default CallRequestMenuCotainer
