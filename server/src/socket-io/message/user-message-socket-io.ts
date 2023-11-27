import { Socket, Server } from "socket.io"
import { getRedisSocketCached } from "../../model/redis/redis.js"
import ChatRoomModel from "../../model/mongoose/chat-room-model/chat-room-model.js"
import textMessageModel from "../../model/mongoose/message-model/text-message-model.js"
import { cloudinaryFileUploadHandler } from "../../config/cloudinary.js"
import fs from "fs"
import path from "path"
import { v4 as uuidv4 } from "uuid"
import { __dirname } from "../../server.js"
import voiceMessageModel from "../../model/mongoose/message-model/voice-message-mode.js"

const userMessageSocketIo = (io: Server, socket: Socket) => {
  socket.on("message:newMessage", async ({ message, receiverId, senderId, chatRoomId }) => {
    try {
      const receiver = await getRedisSocketCached(receiverId)

      ChatRoomModel.initiateChat([receiverId, senderId])
      if (receiver != null) {
        socket.to(receiver.socketId).emit("message:receiveMessage", { message, senderId, chatRoomId })
      }

      const textMessage = await textMessageModel.createNewMessageInChatRoom({
        chatRoomId,
        message,
        postedByUser: senderId,
      })
      console.log(textMessage._id)
      await ChatRoomModel.addChatConversation({ chatRoomId, messageId: textMessage._id, messageType: "textMessage" })
    } catch (error) {
      console.log(error)
    }
  })

  socket.on(
    "message:newAudioMessage",
    async ({ file, postedByUser, chatRoomId }: { file: Buffer; postedByUser: string; chatRoomId: string }) => {
      try {
        // const receiver = awiat getRedisSocketCached(receiverId)
        const randomId = uuidv4()
        const filepath = path.join(__dirname, "..", "public", "uploader", `${randomId}.mp3`)

        // const base64ConvertedData = file.toString("base64")
        await fs.writeFileSync(filepath, file)
        console.log("file", filepath)

        const cloudinaryUpload = await cloudinaryFileUploadHandler(filepath)
        console.log(cloudinaryUpload.imageUrl)
        if (!cloudinaryUpload.isSuccess || cloudinaryUpload.imageUrl == undefined) return
        const voiceMessage = await voiceMessageModel.createNewMessageInChatRoom({
          postedByUser,
          voiceMessageSrc: cloudinaryUpload.imageUrl,
        })
        await ChatRoomModel.addChatConversation({
          chatRoomId,
          messageId: voiceMessage._id,
          messageType: "voiceMessage",
        })
        console.log("remove file sync")
        // fs.unlinkSync(filepath)
      } catch (error) {
        console.log(error)
      }
    },
  )
}

export default userMessageSocketIo
