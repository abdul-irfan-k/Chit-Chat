import React from 'react'
import VideoCallQuadViews from './video-group-call-quad-views/video-group-call-quad-views'
import VideoCallDoubleViews from './video-group-call-double-views/video-group-call-double-views'
import VideoCallSingleViews from './video-group-call-single-views/video-group-call-single-views'

const VideoCallViewsContainer = () => {
  return (
    <div className='mt-5'>
       <VideoCallQuadViews /> 
       {/* <VideoCallDoubleViews /> */}
       {/* <VideoCallSingleViews /> */}
    </div>
  )
}

export default VideoCallViewsContainer