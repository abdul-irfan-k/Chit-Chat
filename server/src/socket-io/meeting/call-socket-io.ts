import { Socket } from "socket.io"
import { getRedisSocketCached } from "../../model/redis/redis"
import MeetingModel from "../../model/mongoose/meeting-model/meeting-model"
import { v4 as uuidv4 } from "uuid"
import mongoose from "mongoose"

const callSocketIo = (socket: Socket) => {
  socket.on(
    "privateCall:intialise",
    async ({ callRoomId, chatRoomId, callerDetails, receiverId, callType, mediaType }) => {
      try {
        const participants = [callerDetails._id, receiverId].map((userId) => new mongoose.Types.ObjectId(userId))
        const callRoom = new MeetingModel({
          _id: callRoomId,
          chatRoomId,
          callType,
          participants,
          mediaType,
          callIntiatorUserId: new mongoose.Types.ObjectId(callerDetails._id),
        })
        await callRoom.save()
        const reciever = await getRedisSocketCached(receiverId)
        socket.to(reciever.socketId).emit("privateCall:receive", {
          callRoomId: callRoom._id,
          chatRoomId,
          callerDetails,
          mediaType,
          callType,
        })
      } catch (error) {
        console.log("error", error)
      }
    },
  )

  socket.on("privateCall:rejectRequest", async (callRoomId, userId) => {
    const callRoom = await MeetingModel.findOneAndUpdate({ callRoomId }, { callStatus: "failed" })
    if (callRoom == null) return

    callRoom.participants
      //@ts-ignore
      .filter((id: string) => id != userId)
      //@ts-ignore
      .forEach(async (userId: string) => {
        const receiver = await getRedisSocketCached(userId)
        socket.to(receiver.socketId).emit("privateCall:rejected", { callRoomId })
      })
  })

  socket.on("privateCall:acceptRequest", async ({ callRoomId, userId }) => {
    try {
      const startTime = new Date()
      const callRoom = await MeetingModel.findOneAndUpdate({ callRoomId }, { callStatus: "accepted", startTime })
      if (callRoom == null) return
      //@ts-ignore
      const chatRoomUserDetails = await callRoom.participants.map((userId: string) => {
        const peerId = uuidv4()
        return {
          userId,
          peerId,
        }
      })
      //@ts-ignore
      callRoom?.participants?.forEach(async (userId: string) => {
        const receiver = await getRedisSocketCached(userId)

        if (receiver.socketId == socket.id) {
          socket.emit("privateCall:start", {
            callRoomId: callRoom._id,
            chatRoomId: callRoom.chatRoomId,
            callType: callRoom.callType,
            callRoomUserDetails: chatRoomUserDetails,
          })
        } else {
          socket.to(receiver.socketId).emit("privateCall:start", {
            callRoomId: callRoom._id,
            callRoomUserDetails: chatRoomUserDetails,
          })
        }
      })
    } catch (error) {
      console.log(error)
    }
  })

  socket.on("privateCall:end", async ({ callRoomId, userId }) => {
    try {
      const callRoom = await MeetingModel.findOne({ _id: callRoomId })
      if (callRoom == null) return

      callRoom.participants
        //@ts-ignore
        .filter((id: string) => id != userId)
        //@ts-ignore
        .forEach(async (userId: string) => {
          const receiver = await getRedisSocketCached(userId)
          socket.to(receiver.socketId).emit("privateCall:ended", { callRoomId })
        })
      if (callRoom.callCurrentStatus == "initiated") {
        await MeetingModel.updateOne({ _id: callRoomId }, { callStatus: "failed", endTime: new Date() })
      } else {
        const endTime = new Date()
        //@ts-ignore
        const duration = endTime.getTime() - callRoom.startTime.getTime()
        await MeetingModel.updateOne({ _id: callRoomId }, { callStatus: "ended", endTime, duration })
      }
    } catch (error) {}
  })
}

export default callSocketIo
