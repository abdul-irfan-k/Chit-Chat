import { Socket } from "socket.io"
import { getSocketIp } from "../../util/socket.js"
import SocketModel from "../../model/mongoose/socket-model.js"
import mongoose from "mongoose"
import { removeRedisSocketCachedData } from "../../model/redis/redis.js"
import ConnectionModel from "../../model/mongoose/connections-model.js"

export const userSocketIntialization = async (socket: Socket) => {
  const ip = getSocketIp(socket)

  socket.on("socket:join", async ({ userId }) => {
    console.log("join", socket.id)
    // const id = new mongoose.Types.ObjectId(_id)
    await SocketModel.create({
      socketId: socket.id,
      ip,
      userId,
    })
    // joining the group room
    const userObjectId = new mongoose.Types.ObjectId(userId)
    const joinRequiredGroups = await ConnectionModel.findOne({ userId: userObjectId })
    if (joinRequiredGroups == null) return
    joinRequiredGroups.groups.forEach((group) => {
      socket.join(`group:${group.groupId}`)
    })
  })

  socket.on("disconnect", async () => {
    console.log("disconnect")
    const socketData = await SocketModel.findOne({ socketId: socket.id })
    if (socketData != null) await removeRedisSocketCachedData(`socket:${socketData.userId}`)
    await SocketModel.deleteMany({
      socketId: socket.id,
    })

    if (socketData == null) return

    const userObjectId = new mongoose.Types.ObjectId(socketData.userId)
    const socketRoomLeaveRequiredGroups = await ConnectionModel.findOne({ userId: userObjectId })
    if (socketRoomLeaveRequiredGroups == null) return
    socketRoomLeaveRequiredGroups.groups.forEach((group) => {
      socket.leave(`group:${group.groupId}`)
    })
  })
}
