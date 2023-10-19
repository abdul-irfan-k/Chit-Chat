import React from "react"
import VideoCallSidebar from "./video-call-sidebar/video-group-call-sidebar"
import VideoCallHeader from "./video-call-header/video-group-call-header"
import VideoCallStatus from "./video-call-status/video-group-call-status"
import VideoCallViewsContainer from "./video-call-views/video-call-views-container"
import VideoCallControllBar from "./video-call-controllbar/video-call-contoll-bar"
import LiveChatContainer from "./live-chat/live-chat-container"

const VideoCallContainer = () => {
  // const communicatorVideoRefArray = useRef<Array<HTMLVideoElement>>([])

  // const { socket, isAvailableSocket } = useSelector((state: { socketClient: socketReducerState }) => state.socketClient)
  // const { userDetail,isChanged } = useSelector((state: { userDetail: userDetailState }) => state.userDetail)

  // const [peerJsObj, setPeerJsObj] = useState<peerJsClient>()

  // useEffect(() => {
  //   const obj = new peerJsClient({ myPeerId: "irfanasdf", myVideoRef, socket })
  //   setPeerJsObj(obj)
  // }, [])

  // useEffect(() => {
  //   if(userDetail == null) return console.log('user detail not found')
  //   console.log('video call start request ')
  //   socket?.emit('videocall:startRequest',userDetail._id)

  //   socket?.on('videocall:start',(userIds) => {
  //     const receiverId = userIds.filter((userId) => userId != userDetail._id )[0]
  //     console.log('video call start event ',receiverId)
  //     peerJsObj?.connectToNewUser({userId:receiverId})
  //   })
  // }, [isChanged])

  // useEffect(() => {
  //   // myVideoRef.current.srcObject = peerVideoContext?.videoStream
  // }, [peerVideoContext?.videoStream])

  return (
    <div>
      <div className="relative flex gap-5">
        <div className="relative w-14">
          <div className="absolute">
            <VideoCallSidebar />
          </div>
        </div>

        <div className="py-5  relative flex flex-col w-[65vw] h-screen ">
          <VideoCallHeader />
          <VideoCallStatus />

            <VideoCallViewsContainer />
=
          <div className="relative bottom-5 w-full ">
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
