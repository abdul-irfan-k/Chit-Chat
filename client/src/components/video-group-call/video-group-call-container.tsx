import React from "react"
import VideoGroupCallSidebar from "./video-group-call-sidebar/video-group-call-sidebar"
import VideoGroupCallHeader from "./video-group-call-header/video-group-call-header"
import VideoGroupCallStatus from "./video-group-call-status/video-group-call-status"
import VideoGroupCallControllBar from "./video-group-call-controllbar/video-group-call-contoll-bar"
import VideoGroupCallViewsContainer from "./video-group-call-views/video-group-call-views-container"

const VideoGroupCallContainer = () => {
  return (
    <div>
      <div className="relative flex gap-5">
        <div className="relative w-14">
          <div className="absolute">
            <VideoGroupCallSidebar />
          </div>
        </div>

        <div className="py-5 relative w-[60vw] h-screen ">
          <VideoGroupCallHeader />
          <VideoGroupCallStatus />
          <VideoGroupCallViewsContainer />
          <div className="absolute bottom-5 w-full ">
            <VideoGroupCallControllBar />
          </div>
        </div>
      </div>
    </div>
  )
}

export default VideoGroupCallContainer
