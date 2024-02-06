import { Server } from "socket.io"
import { getRedisSocketCached } from "../../model/redis/redis.js"
import ChatRoomModel from "../../model/mongoose/chat-room-model/chat-room-model.js"
import textMessageModel from "../../model/mongoose/message-model/text-message-model.js"
import { cloudinaryFileUploadHandler } from "../../config/cloudinary.js"
import fs from "fs"
import path from "path"
import { v4 as uuidv4 } from "uuid"
import { __dirname } from "../../server.js"
import voiceMessageModel from "../../model/mongoose/message-model/voice-message-model.js"
import { SocketIo } from "../../types/socket-io/socket-io.js"
import ImageMessageModel from "../../model/mongoose/message-model/image-message-model.js"
import mongoose from "mongoose"
import PollMessageModel from "../../model/mongoose/message-model/poll-message-model.js"
import VideoMessageModel from "../../model/mongoose/message-model/video-message-model.js"
import MessageReactionModel from "../../model/mongoose/message-model/message-reaction-model.js"

const userMessageSocketIo = (io: Server, socket: SocketIo) => {
  socket.on("message:newMessage", async ({ message, receiverId, senderId, chatRoomId }) => {
    try {
      const receiver = await getRedisSocketCached(receiverId)

      ChatRoomModel.initiateChat([receiverId, senderId])
      if (receiver != null) {
        socket.to(receiver.socketId).emit("message:receiveMessage", { message, senderId, chatRoomId, receiverId })
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

  socket.on("message:newAudioMessage", async ({ message, senderId, chatRoomId }) => {
    try {
      // const receiver = awiat getRedisSocketCached(receiverId)
      const randomId = uuidv4()
      const filepath = path.join(__dirname, "..", "public", "uploader", `${randomId}.mp3`)

      // const base64ConvertedData = file.toString("base64")
      await fs.writeFileSync(filepath, message.file)
      console.log("file", filepath)

      const cloudinaryUpload = await cloudinaryFileUploadHandler(filepath)
      console.log(cloudinaryUpload.imageUrl)
      if (!cloudinaryUpload.isSuccess || cloudinaryUpload.imageUrl == undefined) return
      const voiceMessage = await voiceMessageModel.createNewMessageInChatRoom({
        voiceMessageSrc: cloudinaryUpload.imageUrl,
        postedByUser: senderId,
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
  })

  socket.on("message:newImageMessage", async ({ chatRoomId, message, receiverId, senderId }) => {
    console.log("new message", receiverId)
    const newMessage = new ImageMessageModel({
      chatRoomId,
      postedByUser: senderId,
      imageMessageSrc: [message.imageMessageSrc],
      messageType: "imageMessage",
    })
    await newMessage.save()

    if (newMessage == null) return
    const receiver = await getRedisSocketCached(receiverId)
    if (receiver != null) {
      socket.to(receiver.socketId).emit("message:recieveNewImageMessage", { chatRoomId, message, receiverId, senderId })
    }

    ChatRoomModel.addChatConversation({
      chatRoomId,
      messageId: newMessage._id,
      messageType: "imageMessage",
    })
  })

  socket.on("message:newVideoMessage", async ({ chatRoomId, message, receiverId, senderId }) => {
    const newMessage = new VideoMessageModel({
      chatRoomId,
      postedByUser: senderId,
      videoMessageSrc: message.videoMessageSrc,
      messageType: "videoMessage",
    })
    await newMessage.save()

    if (newMessage == null) return
    const receiver = await getRedisSocketCached(receiverId)
    if (receiver != null) {
      socket.to(receiver.socketId).emit("message:receiveVideoMessage", { chatRoomId, message, receiverId, senderId })
    }

    ChatRoomModel.addChatConversation({
      chatRoomId,
      messageId: newMessage._id,
      messageType: "videoMessage",
    })
  })

  socket.on("message:deleteMessage", async ({ chatRoomId, message, receiverId, senderId }) => {
    try {
      const messageObjectId = new mongoose.Types.ObjectId(message._id)
      const chatRoomObjectId = new mongoose.Types.ObjectId(chatRoomId)

      if (message.messageType == "textMessage")
        await textMessageModel.deleteOne({ _id: messageObjectId, postedByUser: senderId })
      else if (message.messageType == "imageMessage")
        await ImageMessageModel.deleteOne({ _id: messageObjectId, postedByUser: senderId })
      else if (message.messageType == "voiceMessage")
        await voiceMessageModel.deleteOne({ _id: messageObjectId, postedByUser: senderId })
      else if (message.messageType == "pollMessage")
        await PollMessageModel.deleteOne({ _id: messageObjectId, postedByUser: senderId })
      else if (message.messageType == "videoMessage")
        await VideoMessageModel.deleteOne({ _id: messageObjectId, postedByUser: senderId })

      await ChatRoomModel.findOneAndUpdate(
        { _id: chatRoomObjectId },
        { $pull: { chatRoomConversations: { messageId: messageObjectId, messageType: message.messageType } } },
      )

      const receiver = await getRedisSocketCached(receiverId)
      if (receiver != null) {
        socket.to(receiver.socketId).emit("message:deleteMessage", { chatRoomId, message, receiverId, senderId })
      }
    } catch (error) {
      console.log(error)
    }
  })

  socket.on("message:reactMessage", async ({ chatRoomId, groupDetail, message, receiverId, senderId }) => {
    try {
      const messageObjectId = new mongoose.Types.ObjectId(message._id)
      const userObjectId = new mongoose.Types.ObjectId(senderId)
      const messageReactions = await MessageReactionModel.findOrCreateMessageReactionModel(messageObjectId)

      const isAlreadyReactedForMessage = messageReactions.reactions.some(
        (reaction) => reaction.usersId.indexOf(senderId) !== -1,
      )

      if (!isAlreadyReactedForMessage) {
        const updatedMessageReaction = await MessageReactionModel.findOneAndUpdate(
          { messageId: messageObjectId },
          { reactions: [{ emoji: message.emoji, emojiId: message.emojiId, usersId: [userObjectId] }] },
        )
      }
    } catch (error) {}
  })
}

export default userMessageSocketIo
