import { Socket } from "socket.io"
import { getSocketIp } from "../util/socket.js"
import SocketModel from "../model/mongoose/socket-model.js"
import mongoose from "mongoose"
import { removeRedisSocketCachedData } from "../model/redis/redis.js"

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
  })

  socket.on("disconnect", async () => {
    console.log("disconnect")
    const socketData = await SocketModel.findOne({ socketId: socket.id })
    if (socketData != null) await removeRedisSocketCachedData(`socket:${socketData.userId}`)
    await SocketModel.deleteMany({
      socketId: socket.id,
    })
  })
}
