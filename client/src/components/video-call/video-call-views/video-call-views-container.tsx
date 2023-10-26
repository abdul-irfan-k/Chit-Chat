"use client"
import React, { useContext, useEffect, useState } from "react"
import VideoCallViews from "./video-call-views/video-call-views"
import { PeerVideoRefContext } from "@/provider/peer-js-video-provider.tsx/peer-js-video-provider"

const VideoCallViewsContainer = () => {
  const peerVideoContext = useContext(PeerVideoRefContext)
  const [isShowingLiveChat, setIsShowingliveChat] = useState<boolean>(false)

    useEffect(() => {
    // myVideoRef.current.srcObject = peerVideoContext?.videoStream
  }, [peerVideoContext?.videoStream])

  return (
    <>
      <VideoCallViews myVideoRef={peerVideoContext.videoStream} setIsShowingliveChat={setIsShowingliveChat} communicatorVideos={peerVideoContext.communicatorsVideoStream} />
    </>
  )
}

export default VideoCallViewsContainer