import { Socket } from "socket.io"
import { getRedisSocketCached } from "../../model/redis/redis.js"
import CallRoomModel from "../../model/mongoose/meeting-model/meeting-model.js"
import { v4 as uuidv4 } from "uuid"
import mongoose from "mongoose"

const callSocketIo = (socket: Socket) => {
  socket.on("privateCall:intialise", async ({ chatRoomId, userDetail, userName, receiverId }) => {
    try {
      const videoCallRoom = await CallRoomModel.initiateCallRoom({
        chatRoomId,
        userId: userDetail._id,
        callType: "videoCall",
      })
      const reciever = await getRedisSocketCached(receiverId)
      socket.to(reciever.socketId).emit("privateCall:requestCallAccept", {
        callRoomId: videoCallRoom._id,
        chatRoomId,
        userDetail,
      })
    } catch (error) {
      console.log("error", error)
    }
  })

  socket.on("privateCall:selfEnd", async ({ callRoomId, userId }) => {
    try {
      const callRoomObjectId = new mongoose.Types.ObjectId(callRoomId)
      await CallRoomModel.findOneAndUpdate({ _id: callRoomObjectId }, { callStatus: "missedCall" })
    } catch (error) {}
  })

  socket.on("privateCall:rejectRequest", async (chatRoomId, userId) => {})

  socket.on("privateCall:acceptRequest", async ({ callRoomId, userId }) => {
    try {
      console.log("call room id", callRoomId)
      const updatedVideoCallRoom = await CallRoomModel.addCallRoomUser({ callRoomId, userId })
      if (updatedVideoCallRoom == null) return console.log("no room found")
      console.log("updated video call room", updatedVideoCallRoom)
      const chatRoomUserDetails = await updatedVideoCallRoom.participants.map((userId: string) => {
        const peerId = uuidv4()
        return {
          userId,
          peerId,
        }
      })
      updatedVideoCallRoom?.participants?.forEach(async (userId: string) => {
        const receiver = await getRedisSocketCached(userId)

        if (receiver.socketId == socket.id) {
          socket.emit("privateCall:start", {
            callRoomId: updatedVideoCallRoom._id,
            chatRoomId: updatedVideoCallRoom.chatRoomId,
            callType: "videoCall",
            callChannelType: "single",
            callRoomUserDetails: chatRoomUserDetails,
          })
        } else {
          socket.to(receiver.socketId).emit("privateCall:start", {
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
