import React, { FC, useRef } from "react"

interface VideoMessagePreviewProps {
  messageVideoSrc: string
}
const VideoMessagePreview: FC<VideoMessagePreviewProps> = ({ messageVideoSrc }) => {
  const videoRef = useRef<HTMLVideoElement | null>(null)

  return (
    <div className="fixed  left-0 top-0 w-screen h-screen flex items-center justify-center">
      <div className="flex w-[60%] aspect-video">
        <video className="videoPlayer w-full h-full" controls width="70%" src={messageVideoSrc} ref={videoRef}></video>
      </div>
    </div>
  )
}

export default VideoMessagePreview
