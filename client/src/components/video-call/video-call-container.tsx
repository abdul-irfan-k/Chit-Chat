"use client"

import React, { useEffect, useRef, useState } from "react"
import VideoCallSidebar from "./video-call-sidebar/video-group-call-sidebar"
import VideoCallHeader from "./video-call-header/video-group-call-header"
import VideoCallStatus from "./video-call-status/video-group-call-status"
import VideoCallViewsContainer from "./video-call-views/video-call-views-container"
import VideoCallControllBar from "./video-call-controllbar/video-call-contoll-bar"
import LiveChatContainer from "./live-chat/live-chat-container"
import { peerJsClient } from "@/util/peer-js/peer-js-client"
import { useSelector } from "react-redux"
import { socketReducerState } from "@/redux/reducers/socket-reducer/socket-reducers"
import { userDetailState } from "@/redux/reducers/user-redicer/user-reducer"

const VideoCallContainer = () => {
  const myVideoRef = useRef<HTMLVideoElement>()
  const communicatorVideoRefArray = useRef<Array<HTMLVideoElement>>([])
  
  const { socket, isAvailableSocket } = useSelector((state: { socketClient: socketReducerState }) => state.socketClient)
  const { userDetail,isChanged } = useSelector((state: { userDetail: userDetailState }) => state.userDetail)


  const [peerJsObj, setPeerJsObj] = useState<peerJsClient>()

  useEffect(() => {
    console.log("my video ref ", myVideoRef)
    const obj = new peerJsClient({ myPeerId: "irfanasdf", myVideoRef, socket })
    setPeerJsObj(obj)
  }, [])

  useEffect(() => {
    if(userDetail == null) return console.log('user detail not found')
    console.log('video call start request ')
    socket?.emit('videocall:startRequest',userDetail._id)
   
    socket?.on('videocall:start',(userIds) => {
      const receiverId = userIds.filter((userId) => userId != userDetail._id )[0]
      console.log('video call start event ',receiverId)
      peerJsObj?.connectToNewUser({userId:receiverId})
    })
  }, [isChanged])




  return (
    <div>
      <div className="relative flex gap-5">
        <div className="relative w-14">
          <div className="absolute">
            <VideoCallSidebar />
          </div>
        </div>

        <div className="py-5 relative w-[65vw] h-screen ">
          <VideoCallHeader />
          <VideoCallStatus />
          <VideoCallViewsContainer userVideoRef={myVideoRef} />
          <div className="absolute bottom-5 w-full ">
            <VideoCallControllBar />
          </div>
        </div>

        <div className="py-5 px-5 flex-1">
          <LiveChatContainer />
        </div>
      </div>
    </div>
  )
}

export default VideoCallContainer
