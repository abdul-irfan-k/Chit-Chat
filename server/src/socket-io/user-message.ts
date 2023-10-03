import { Socket, Server } from "socket.io"
import { getRedisSocketCached } from "../model/redis/redis.js"
import ChatRoomModel from "../model/mongoose/chat-room-model.js"
import textMessageModel from "../model/mongoose/text-message-model.js"

const userMessageSocketIo = (io: Server, socket: Socket) => {
  socket.on("message:newMessage", async ({ message, receiverId, senderId, chatRoomId }) => {
    console.log("message", message, receiverId, senderId)
    const receiver = await getRedisSocketCached(receiverId)

    await ChatRoomModel.initiateChat([receiverId, senderId])
    if (receiver == null) return console.log("receiver not found")
    socket.to(receiver.socketId).emit("message:receiveMessage", { message })
    textMessageModel.createNewMessageInChatRoom({ chatRoomId, message, postedByUser:senderId })
  })
}

export default userMessageSocketIo
