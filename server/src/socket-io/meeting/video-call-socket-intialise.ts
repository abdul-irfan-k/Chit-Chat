import { Socket } from "socket.io"
import { getRedisSocketCached } from "../../model/redis/redis.js"
import CallRoomModel from "../../model/mongoose/meeting-model/meeting-model.js"
import { v4 as uuidv4 } from "uuid"
import mongoose from "mongoose"

const callSocketIo = (socket: Socket) => {
  socket.on("videoCall:intialise", async ({ chatRoomId, userDetail, userName, receiverId }) => {
    try {
      const videoCallRoom = await CallRoomModel.initiateCallRoom({
        chatRoomId,
        userId: userDetail._id,
        callType: "videoCall",
      })
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

  socket.on("videoCall:selfEnd", async ({ callRoomId, userId }) => {
    try {
      const callRoomObjectId = new mongoose.Types.ObjectId(callRoomId)
      await CallRoomModel.findOneAndUpdate({ _id: callRoomObjectId }, { callStatus: "missedCall" })
      
    } catch (error) {}
  })

  socket.on("videoCall:rejectRequest", async (chatRoomId, userId) => {})

  socket.on("videoCall:acceptRequest", async ({ callRoomId, userId }) => {
    try {
      const updatedVideoCallRoom = await CallRoomModel.addCallRoomUser({ callRoomId, userId })
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

export default callSocketIo
