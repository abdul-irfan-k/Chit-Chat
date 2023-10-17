import { Server, Socket } from "socket.io"
import { getRedisSocketCached } from "../model/redis/redis.js"
import VideoCallRoomModel from "../model/mongoose/video-call-room-model.js"

const videoCallIntialiseSocketIo = (io: Server, socket: Socket) => {
  socket.on("videoCall:intialise", async ({chatRoomId, userDetail, userName, receiverId}) => {
    try {
      const videoCallRoom = await VideoCallRoomModel.initiateVideoCallRoom({ chatRoomId, userId:userDetail._id})
      const reciever = await getRedisSocketCached(receiverId)
      socket.to(reciever.socketId).emit("videoCall:requestCallAccept", {
        callRoomId: videoCallRoom._id,
        chatRoomId,
        userDetail ,
      })
    } catch (error) {
      console.log('error',error)
    }
  })

  
  socket.on("videoCall:selfEnd",async() => {
    
  })

  socket.on("videoCall:rejectRequest", async (chatRoomId, userId) => {})

  socket.on("videoCall:acceptRequest", async (chatRoomId, userId) => {
    try {
      const updatedVideoCallRoom = await VideoCallRoomModel.addVideoCallRoomUser({ chatRoomId, userId })
      if (updatedVideoCallRoom == null) return console.log("not room found")
      console.log("video call room users ", updatedVideoCallRoom)

      updatedVideoCallRoom?.userIds?.forEach(async (userId:string) => {
        console.log("user ids ", userId)

        const receiver = await getRedisSocketCached(userId)
        socket
          .to(receiver.socketId)
          .emit("videoCall:start", {
            callRoomId: updatedVideoCallRoom._id,
            callRoomUserDetails: updatedVideoCallRoom.userIds,
          })
      })
    } catch (error) {}
  })
}

export default videoCallIntialiseSocketIo
