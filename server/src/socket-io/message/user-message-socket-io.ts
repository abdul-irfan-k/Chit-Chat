import { Server } from "socket.io"
import mongoose from "mongoose"
import fs from "fs"
import { v4 as uuidv4 } from "uuid"
import path from "path"

import { getRedisSocketCached } from "../../model/redis/redis"
import textMessageModel from "../../model/mongoose/message-model/text-message-model"
import { cloudinaryFileUploadHandler } from "../../config/cloudinary"
import { dirpath } from "../../server"
import { SocketIo } from "../../types/socket-io/socket-io"

import ChatRoomModel from "../../model/mongoose/chat-room-model/chat-room-model"
import voiceMessageModel from "../../model/mongoose/message-model/voice-message-model"
import ImageMessageModel from "../../model/mongoose/message-model/image-message-model"
import PollMessageModel from "../../model/mongoose/message-model/poll-message-model"
import VideoMessageModel from "../../model/mongoose/message-model/video-message-model"
import MessageReactionModel from "../../model/mongoose/message-model/message-reaction-model"

const userMessageSocketIo = (io: Server, socket: SocketIo) => {
  socket.on("message:newTextMessage", async ({ message, chatRoomId, receiverId, senderId }, callback) => {
    try {
      console.log("reciver id ", receiverId)
      const receiver = await getRedisSocketCached(receiverId)

      if (receiver != null) {
        socket.to(receiver.socketId).emit("message:receiveTextMessage", { message, chatRoomId, receiverId, senderId })
      }

      const textMessage = await textMessageModel.createNewMessageInChatRoom({
        chatRoomId,
        postedByUser: senderId,
        ...message,
      })

      await ChatRoomModel.addChatConversation({
        chatRoomId,
        messageId: textMessage._id,
        messageType: "textMessage",
      })
    } catch (error) {
      console.log(error)
    }
  })

  socket.on("message:newAudioMessage", async ({ message, chatRoomId, receiverId, senderId }) => {
    try {
      // const receiver = awiat getRedisSocketCached(receiverId)
      const randomId = uuidv4()
      const filepath = path.join(dirpath, "..", "public", "upload", `${randomId}.mp3`)

      // const base64ConvertedData = file.toString("base64")
      await fs.writeFileSync(filepath, message.audioBuffer)

      const cloudinaryUpload = await cloudinaryFileUploadHandler(filepath, { resource_type: "auto" })
      if (!cloudinaryUpload.isSuccess || cloudinaryUpload.url == undefined) return

      const newVoiceMessage = new voiceMessageModel({
        audioSrc: cloudinaryUpload.url,
        postedByUser: senderId,
        _id: message._id,
      })
      await newVoiceMessage.save()
      if (newVoiceMessage == null) return

      const receiver = await getRedisSocketCached(receiverId)
      if (receiver != null) {
        socket.to(receiver.socketId).emit("message:receiveAudioMessage", {
          chatRoomId,
          message: { ...message, audioSrc: cloudinaryUpload.url },
          receiverId: receiverId,
          senderId,
        })
      }

      await ChatRoomModel.addChatConversation({
        chatRoomId,
        messageId: newVoiceMessage._id,
        messageType: "voiceMessage",
      })
      fs.unlinkSync(filepath)
    } catch (error) {
      console.log(error)
    }
  })

  socket.on("message:newImageMessage", async ({ chatRoomId, message, receiverId, senderId }) => {
    const newMessage = new ImageMessageModel({
      chatRoomId,
      postedByUser: senderId,
      messageType: "imageMessage",
      ...message,
    })
    await newMessage.save()

    if (newMessage == null) return
    const receiver = await getRedisSocketCached(receiverId)
    if (receiver != null) {
      socket.to(receiver.socketId).emit("message:recieveImageMessage", { chatRoomId, message, receiverId, senderId })
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
      messageType: "videoMessage",
      ...message,
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

  socket.on("message:deleteMessage", async ({ chatRoomId, message, receiverId, senderId, messageChannelType }) => {
    try {
      const messageObjectId = new mongoose.Types.ObjectId(message._id)
      const chatRoomObjectId = new mongoose.Types.ObjectId(chatRoomId)

      if (message.messageType == "Text") await textMessageModel.deleteOne({ _id: message._id, postedByUser: senderId })
      else if (message.messageType == "Image")
        await ImageMessageModel.deleteOne({ _id: messageObjectId, postedByUser: senderId })
      else if (message.messageType == "Video")
        await voiceMessageModel.deleteOne({ _id: messageObjectId, postedByUser: senderId })
      else if (message.messageType == "Voice")
        await VideoMessageModel.deleteOne({ _id: messageObjectId, postedByUser: senderId })

      await ChatRoomModel.findOneAndUpdate(
        { _id: chatRoomObjectId },
        { $pull: { chatRoomConversations: { messageId: message._id, messageType: message.messageType } } },
      )

      await MessageReactionModel.deleteOne({ messageId: message._id })

      const receiver = await getRedisSocketCached(receiverId)
      if (receiver != null) {
        socket
          .to(receiver.socketId)
          .emit("message:deleteMessage", { chatRoomId, message, receiverId, senderId, messageChannelType })
      }
    } catch (error) {
      console.log(error)
    }
  })

  socket.on("message:reactMessage", async ({ chatRoomId, message, receiverId, senderId, messageChannelType }) => {
    try {
      const userObjectId = new mongoose.Types.ObjectId(senderId)
      const messageReactions = await MessageReactionModel.findOne({ messageId: message._id })

      const receiver = await getRedisSocketCached(receiverId)
      if (receiver != null) {
        socket
          .to(receiver.socketId)
          .emit("message:reactMessage", { message, chatRoomId, receiverId, senderId, messageChannelType })
      }
      if (messageReactions == null) {
        const newMessageReaction = new MessageReactionModel({
          messageId: message._id,
          reactions: [{ emoji: message.emoji, emojiId: message.emojiId, usersId: [userObjectId] }],
        })
        await newMessageReaction.save()
        return
      }
      const isUserAlreadyReactedForMessage = messageReactions.reactions.some(
        //@ts-ignore
        (reaction) => reaction.usersId.indexOf(senderId) !== -1,
      )
      const messageReactionsIndex = messageReactions.reactions.findIndex(
        (reaction) => reaction.emojiId == message.emojiId,
      )

      if (isUserAlreadyReactedForMessage) {
        messageReactions.reactions = messageReactions.reactions.map((reaction) => {
          //@ts-ignore
          const userIndex = reaction.usersId.indexOf(senderId)
          if (userIndex !== -1) {
            //@ts-ignore
            return { ...reaction, usersId: [...reaction.usersId.filter((userId) => userId != senderId)] }
          }
          return { ...reaction }
        })
      }
      if (messageReactionsIndex == -1) {
        messageReactions.reactions.push({ emoji: message.emoji, emojiId: message.emojiId, usersId: [userObjectId] })
      } else {
        messageReactions.reactions[messageReactionsIndex].usersId.push(userObjectId)
      }
      messageReactions.reactions = messageReactions.reactions.filter((reaction) => reaction.usersId.length != 0)
      const updatedMessageReaction = await MessageReactionModel.findOneAndUpdate(
        { messageId: message._id },
        { reactions: messageReactions.reactions },
        { new: true },
      )

      if (updatedMessageReaction == null) return
    } catch (error) {
      console.log(error)
    }
  })
}

export default userMessageSocketIo
