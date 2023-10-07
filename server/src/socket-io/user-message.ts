import { Socket, Server } from "socket.io"
import { getRedisSocketCached } from "../model/redis/redis.js"
import ChatRoomModel from "../model/mongoose/chat-room-model.js"
import textMessageModel from "../model/mongoose/text-message-model.js"
// import { cloudinaryFileUploadHandler } from "../config/cloudinary.js"
import fs from "fs"
import path from 'path'
import { v4 as uuidv4 } from "uuid"
import { __dirname } from "../index.js"

const userMessageSocketIo = (io: Server, socket: Socket) => {
  socket.on("message:newMessage", async ({ message, receiverId, senderId, chatRoomId }) => {
    const receiver = await getRedisSocketCached(receiverId)

    ChatRoomModel.initiateChat([receiverId, senderId])
    if (receiver == null) return console.log("receiver not found")
    socket.to(receiver.socketId).emit("message:receiveMessage", { message })

    const textMessage = await textMessageModel.createNewMessageInChatRoom({
      chatRoomId,
      message,
      postedByUser: senderId,
    })
    console.log(textMessage._id)
    await ChatRoomModel.addChatConversation({ chatRoomId, messageId: textMessage._id, messageType: "textMessage" })
  })

  socket.on("message:newAudioMessage", async({ file }) => {
    // const receiver = awiat getRedisSocketCached(receiverId)
    const randomId = uuidv4()
    const filepath = path.join(__dirname,'..','public','uploader',`${randomId}.mp3`)

    const base64ConvertedData = file.toString('base64')
    const newFile = await fs.appendFileSync(filepath, base64ConvertedData,'base64')
    console.log("file", file, typeof file)
  //   cloudinaryFileUploadHandler(file)
  //     .then((data) => console.log("data", data))
  //     .catch((err) => console.log("error", err))
  })
}

export default userMessageSocketIo
