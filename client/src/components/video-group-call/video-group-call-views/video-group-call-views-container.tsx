import React from 'react'
import VideoGroupCallQuadViews from './video-group-call-quad-views/video-group-call-quad-views'
import VideoGroupCallDoubleViews from './video-group-call-double-views/video-group-call-double-views'
import VideoGroupCallSingleViews from './video-group-call-single-views/video-group-call-single-views'

const VideoGroupCallViewsContainer = () => {
  return (
    <div className='mt-5'>
       <VideoGroupCallQuadViews /> 
       {/* <VideoGroupCallDoubleViews /> */}
       {/* <VideoGroupCallSingleViews /> */}
    </div>
  )
}

export default VideoGroupCallViewsContainer