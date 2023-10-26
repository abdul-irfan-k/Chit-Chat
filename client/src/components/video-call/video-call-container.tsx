import React from "react"
import VideoCallSidebar from "./video-call-sidebar/video-group-call-sidebar"
import VideoCallHeader from "./video-call-header/video-group-call-header"
import VideoCallStatus from "./video-call-status/video-group-call-status"
import VideoCallViewsContainer from "./video-call-views/video-call-views-container"
import VideoCallControllBar from "./video-call-controllbar/video-call-contoll-bar"
import LiveChatContainer from "./live-chat/live-chat-container"

const VideoCallContainer = () => {
  return (
    <div>
      <div className="relative flex gap-5">
        <div className="py-5  relative flex flex-col w-[65vw] h-screen ">
          <VideoCallHeader />
          <VideoCallStatus />
          <VideoCallViewsContainer />=
          <div className="relative bottom-5 w-full ">
            <VideoCallControllBar />
          </div>
        </div>

        {/* <div className="py-5 px-5 flex-1">
          <LiveChatContainer />
        </div> */}
      </div>
    </div>
  )
}

export default VideoCallContainer
