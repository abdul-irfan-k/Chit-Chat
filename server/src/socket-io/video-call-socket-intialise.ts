import { Server, Socket } from "socket.io"
import { getRedisSocketCached } from "../model/redis/redis.js"
import VideoCallRoomModel from "../model/mongoose/video-call-room-model.js"
import { v4 as uuidv4 } from "uuid"

const videoCallIntialiseSocketIo = (io: Server, socket: Socket) => {
  socket.on("videoCall:intialise", async ({ chatRoomId, userDetail, userName, receiverId }) => {
    try {
      const videoCallRoom = await VideoCallRoomModel.initiateVideoCallRoom({ chatRoomId, userId: userDetail._id })
      const reciever = await getRedisSocketCached(receiverId)
      socket.to(reciever.socketId).emit("videoCall:requestCallAccept", {
        callRoomId: videoCallRoom._id,
        chatRoomId,
        userDetail,
      })
    } catch (error) {
      console.log("error", error)
    }
  })

  socket.on("videoCall:selfEnd", async () => {})

  socket.on("videoCall:rejectRequest", async (chatRoomId, userId) => {})

  socket.on("videoCall:acceptRequest", async ({ callRoomId, userId }) => {
    try {
      const updatedVideoCallRoom = await VideoCallRoomModel.addVideoCallRoomUser({ callRoomId, userId })
      if (updatedVideoCallRoom == null) return console.log("no room found")

      const chatRoomUserDetails = await updatedVideoCallRoom.userIds.map((userId: string) => {
        const peerId = uuidv4()
        return {
          userId,
          peerId,
        }
      })
      updatedVideoCallRoom?.userIds?.forEach(async (userId: string) => {
        const receiver = await getRedisSocketCached(userId)

        if (receiver.socketId == socket.id) {
          socket.emit("videoCall:start", {
            callRoomId: updatedVideoCallRoom._id,
            chatRoomId: updatedVideoCallRoom.chatRoomId,
            callType: "videoCall",
            callChannelType: "single",
            callRoomUserDetails: chatRoomUserDetails,
          })
        } else {
          socket.to(receiver.socketId).emit("videoCall:start", {
            callRoomId: updatedVideoCallRoom._id,
            callRoomUserDetails: chatRoomUserDetails,
          })
        }
      })
    } catch (error) {
      console.log(error)
    }
  })
}

export default videoCallIntialiseSocketIo
