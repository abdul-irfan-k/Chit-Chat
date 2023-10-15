import React from "react"
import VideoCallQuadViews from "./video-call-quad-views/video-call-quad-views"
import VideoCallDoubleViews from "./video-call-double-views/video-call-double-views"
import VideoCallSingleViews from "./video-call-single-views/video-call-single-views"

const VideoCallViewsContainer = (props) => {
  return (
    <div className="mt-5">
      <div className="gap-10  flex  flex-wrap justify-center">
        <div className=" aspect-video rounded-2xl w-[100%] bg-neutral-600">
          <video autoPlay ref={props.userVideoRef} className="w-full h-full" />
        </div>
      </div>
      {/* <VideoCallQuadViews />  */}
      {/* <VideoCallDoubleViews />  */}
      {/* <VideoCallSingleViews /> */}
    </div>
  )
}

export default VideoCallViewsContainer
