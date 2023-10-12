import mongoose from "mongoose"
import { redisClient } from "../../config/redis.js"
import SocketModel from "../mongoose/socket-model.js"

export const getRedisSocketCached = async (receiverId: string) => {
  try {
    const data = await redisClient.get(`socket:${receiverId}`)

    const isCached = data != null
    if (isCached) {
      const jsonData = await JSON.parse(data)
      return jsonData
    }

    const receiverObjectId = new mongoose.Types.ObjectId(receiverId)
    const socketData = await SocketModel.findOne({ userId: receiverId })
    if (socketData == null) return console.log("no socket data found")
    await assignRedisSocketCache(`socket:${receiverId}`, socketData)

    return socketData
  } catch (error) {
    console.log(error)
  }
}

export const assignRedisSocketCache = async (query: string, data: Object) => {
  try {
    await redisClient.set(query, JSON.stringify(data))
  } catch (error) {
    console.log(error)
  }
}
