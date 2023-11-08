"use client"
import { PeerVideoRefContext } from "@/provider/peer-js-video-provider.tsx/peer-js-video-provider"
import React, { FC, useContext, useEffect, useRef, useState } from "react"

interface VideoCallViewsProps {
  myVideoRef: React.MutableRefObject<HTMLVideoElement | undefined>
  setIsShowingliveChat: React.Dispatch<React.SetStateAction<boolean>>
  communicatorVideos: communicatorVideo[]
}

interface communicatorVideo {
  id: string
  videoSrc: MediaStream
}

const VideoCallViews: FC<VideoCallViewsProps> = ({ myVideoRef, setIsShowingliveChat, communicatorVideos }) => {
  const peerVideoContext = useContext(PeerVideoRefContext)
  const [isPinnedVideo, setIsPinnedVideo] = useState<boolean>(false)
  const [videoSize, setVideoSize] = useState<{ width: number; height: number }>({ width: 50, height: 60 })
  const videoOnClickHandler = () => {
    setIsPinnedVideo(true)
    setVideoSize({ width: 85, height: 100 })
    setIsShowingliveChat(false)
  }

  const [test, setTest] = useState(false)

  // useEffect(() => {
  //   console.log('video added ')
  //   const isEmptyVideo = communicatorVideos.length < 1
  //   if(isEmptyVideo){
  //     setVideoSize({width:85,height:50})
  //   }
  // },[communicatorVideos])

  // useEffect(() => {
  //   console.log("changed video ")
  //   setTest(true)
  // },[peerVideoContext.communicatorsVideoStream])

  const videoRef = useRef<HTMLVideoElement | undefined>(undefined)

  return (
    <div className="mt-5 flex-1 ">
      <div className="relative gap-5  flex  flex-wrap items-center justify-center  h-[78vh]  overflow-hidden ">
        {communicatorVideos?.map((communicatorVideo, index) => {
          console.log("communicator video ref ", communicatorVideo)
          return (
            <div className="h-[45%] rounded-2xl w-[40%] bg-neutral-600 " key={index}>
              <video
                autoPlay
                className="w-full h-full"
                ref={(ref) => {
                  console.log("communicator video src ", communicatorVideo.videoSrc.getTracks())
                  if (ref != null) ref.srcObject = communicatorVideo.videoSrc
                }}
              />
            </div>
          )
        })}

        <div
          className={` rounded-2xl    `}
          style={{ width: `${videoSize.width}%`, aspectRatio: "16/9", display: "flex", alignItems: "center" }}
          // style={{ width: `60%`, aspectRatio: "16/9" }}
          onClick={videoOnClickHandler}
        >
          <video
            autoPlay
            ref={(ref) => {
              if (myVideoRef != undefined && myVideoRef != null && ref != null) ref.srcObject = myVideoRef
            }}
            className="w-full h-full"
            muted={true}
          />
        </div>
       
        {/* <div className=" aspect-video rounded-2xl w-[40%] bg-neutral-600">
          <video autoPlay ref={props.userVideoRef} className="w-full h-full"  />
        </div>
        <div className=" aspect-video rounded-2xl w-[40%] bg-neutral-600">
          <video autoPlay ref={props.userVideoRef} className="w-full h-full"  />
        </div>
        <div className=" aspect-video rounded-2xl w-[40%] bg-neutral-600">
          <video autoPlay ref={props.userVideoRef} className="w-full h-full"  />
        </div> */}
      </div>
    </div>
  )
}

export default VideoCallViews
