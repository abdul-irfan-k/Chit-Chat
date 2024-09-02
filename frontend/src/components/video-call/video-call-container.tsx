"use client"
import VideoCallBottom from "./video-call-bottom/video-call-bottom"
import VideoCallHeader from "./video-call-header/video-group-call-header"
import VideoCallViewsContainer from "./video-call-views/video-call-views-container"
import { DndContext } from "@dnd-kit/core"

const VideoCallContainer = () => {
  return (
    <div>
      <div className="relative flex gap-5 w-[95vw]">
        <div
          className="py-5  relative flex flex-col h-screen w-full "
          // style={{ width: popMenuType == undefined ? "95vw" : "65vw" }}
          // style={{ minWidth: "65vw" }}
        >
          <VideoCallHeader />
          {/* <VideoCallStatus /> */}

            <VideoCallViewsContainer />
        </div>

        <VideoCallBottom />
      </div>
    </div>
  )
}

export default VideoCallContainer
