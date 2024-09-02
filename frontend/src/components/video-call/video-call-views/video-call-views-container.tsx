"use client"
import React, { useContext, useState } from "react"
import VideoCallViews from "./video-call-views/video-call-views"
import { PeerVideoRefContext } from "@/provider/peer-js-video-provider.tsx/peer-js-video-provider"
import { DndContext, useDraggable } from "@dnd-kit/core"
import { CSS } from "@dnd-kit/utilities"

const VideoCallViewsContainer = () => {
  const peerVideoContext = useContext(PeerVideoRefContext)
  const [isShowingLiveChat, setIsShowingliveChat] = useState<boolean>(false)

  const [videoData, setVideoData] = useState([
    {
      id: "video1",
      src: "/Asset/video/videocall1.mp4",
    },
    {
      id: "video2",
      src: "/Asset/video/videocall2.mp4",
    },
    {
      id: "video3",
      src: "/Asset/video/videocall3.mp4",
    },
  ])

  const handleDragEnd = (event) => {
    console.log("event ", event)
    const { active, over } = event
  }

  return (
    <>
      <div className="gap-1 relative w-[22%] flex flex-col">
        <DndContext onDragEnd={handleDragEnd}>
          {videoData.map((video, index) => {
            return <VideoBox id={video.id} src={video.src} />
          })}
        </DndContext>
      </div>
      -
      {/* <VideoCallViews myVideoRef={peerVideoContext.videoStream} setIsShowingliveChat={setIsShowingliveChat} communicatorVideos={peerVideoContext.communicatorsVideoStream} /> */}
    </>
  )
}
export default VideoCallViewsContainer

const VideoBox = ({ id, src }: { id: string; src: string }) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: id,
  })
  const style = {
    transform: CSS.Translate.toString(transform),
  }
  return (
    <div
      key={id}
      className={`rounded-2xl w-full aspect-video `}
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      // style={{ width: `30%`, aspectRatio: "16/9" }}
    >
      <video autoPlay className="w-full h-full" muted={true} src={src} />
    </div>
  )
}
