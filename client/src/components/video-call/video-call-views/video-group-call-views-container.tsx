import React from 'react'
import VideoCallQuadViews from './video-call-quad-views/video-call-quad-views'
import VideoCallSingleViews from './video-call-single-views/video-call-single-views'
import VideoCallDoubleViews from './video-call-double-views/video-call-double-views'

const VideoCallViewsContainer = () => {
  return (
    <div className='mt-5'>
       <VideoCallQuadViews /> 
       <VideoCallDoubleViews />
       {/* <VideoCallSingleViews /> */}
    </div>
  )
}

export default VideoCallViewsContainer