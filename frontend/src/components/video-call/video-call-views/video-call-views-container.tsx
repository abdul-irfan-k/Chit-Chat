"use client"
import React, { useContext, useState } from "react"
import VideoCallViews from "./video-call-views/video-call-views"
import { PeerVideoRefContext } from "@/provider/peer-js-video-provider.tsx/peer-js-video-provider"
import { DndContext, DragEndEvent, useDraggable } from "@dnd-kit/core"
import { CSS } from "@dnd-kit/utilities"
import { arrayMove, SortableContext, useSortable } from "@dnd-kit/sortable"
import { Fullscreen } from "lucide-react"

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
  const [fullscreenVideo, setFullScreenVideo] = useState([
    {
      id: "video4",
      src: "/Asset/video/videocall4.mp4",
    },
  ])

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event
    if (!over) return

    console.log(event)

    const initialContainer = active.data.current?.sortable?.containerId
    const targetContainer = over.data.current?.sortable?.containerId

    if (!initialContainer) return

    let fullScreen
    setVideoData((videoData) => {
      if (initialContainer === targetContainer) {
        const oldIndex = videoData.findIndex((video) => active.id == video.id).toString()
        const newIndex = videoData.findIndex((video) => over.id == video.id).toString()
        videoData = arrayMove(videoData, oldIndex, newIndex)
        return videoData
      } else {
        const temp = [...videoData]
        const index = videoData.findIndex((video) => active.id == video.id)
        fullScreen = videoData[index]

        temp[index] = fullscreenVideo[0]
        console.log(videoData)
        return temp
      }
    })
    if (initialContainer !== targetContainer) {
      setFullScreenVideo([fullScreen])
    }
  }

  return (
    <>
      <div className="gap-5 relative  flex">
        <DndContext onDragEnd={handleDragEnd}>
          <SortableContext items={fullscreenVideo}>
            <div className="w-full aspect-video rounded-md">
              {fullscreenVideo &&
                fullscreenVideo.length > 0 &&
                fullscreenVideo.map((video, index) => {
                  return <VideoBox id={video.id} src={video.src} key={video.id} />
                })}
            </div>
          </SortableContext>
          <div className="w-[25%]">
            <SortableContext items={videoData}>
              <div className="gap-5 flex flex-col">
                {videoData.map((video, index) => {
                  return <VideoBox id={video.id} src={video.src} key={video.id} />
                })}
              </div>
            </SortableContext>
          </div>
        </DndContext>
      </div>
      -
      {/* <VideoCallViews myVideoRef={peerVideoContext.videoStream} setIsShowingliveChat={setIsShowingliveChat} communicatorVideos={peerVideoContext.communicatorsVideoStream} /> */}
    </>
  )
}
export default VideoCallViewsContainer

const VideoBox = ({ id, src }: { id: string; src: string }) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
    id: id,
  })
  const style = {
    transform: CSS.Translate.toString(transform),
    transition,
  }
  return (
    <div
      key={id}
      className={`rounded-2xl w-full aspect-video overflow-hidden `}
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
