import mongoose from "mongoose"
import path from "path"
import fs from "fs"
import { v4 as uuidv4 } from "uuid"

import { dirpath } from "../../server"
import { SocketIo } from "../../types/socket-io/socket-io"
import { cloudinaryFileUploadHandler } from "../../config/cloudinary"

import PollMessageModel from "../../model/mongoose/message-model/poll-message-model"
import TextMessageModel from "../../model/mongoose/message-model/text-message-model"
import ChatRoomModel from "../../model/mongoose/chat-room-model/chat-room-model"
import voiceMessageModel from "../../model/mongoose/message-model/voice-message-model"
import VideoMessageModel from "../../model/mongoose/message-model/video-message-model"
import GroupModel from "../../model/mongoose/group-model"
import ImageMessageModel from "../../model/mongoose/message-model/image-message-model"

const isUserEnabelToMessage = (groupId: string, userId: string): Promise<boolean> => {
  //@ts-ignore
  return new Promise(async (resolve, reject) => {
    try {
      const groupObjectId = new mongoose.Types.ObjectId(groupId)
      const group = await GroupModel.findOne({ _id: groupObjectId })
      if (group == null) return reject(false)

      if (group.setting?.adminOnlyChangeSetting) {
        //@ts-ignore
        const isAdmin = group.adminsDetail.some((admin) => admin.userId == userId)
        return resolve(isAdmin)
      }
      return resolve(true)
    } catch (error) {
      return resolve(false)
    }
  })
}

const groupMessageSocketIo = (socket: SocketIo) => {
  socket.on("groupMessage:newTextMessage", async ({ chatRoomId, message, senderId, groupId }) => {
    try {
      const userEnabledToMessage = await isUserEnabelToMessage(groupId, senderId)
      if (!userEnabledToMessage) return

      socket.to(`group:${groupId}`).emit("groupMessage:receiveTextMessage", { chatRoomId, message, senderId, groupId })

      const textMessage = new TextMessageModel({
        chatRoomId: chatRoomId,
        content: message.content,
        postedByUser: senderId,
        _id: message._id,
      })
      await textMessage.save()
      if (textMessage == null) return

      ChatRoomModel.addChatConversation({
        chatRoomId: chatRoomId,
        messageId: textMessage._id,
        messageType: "textMessage",
      })
    } catch (error) {
      console.log(error)
    }
  })

  socket.on("groupMessage:newAudioMessage", async ({ chatRoomId, message, senderId, groupId }) => {
    try {
      const userEnabledToMessage = await isUserEnabelToMessage(groupId, senderId)
      if (!userEnabledToMessage) return
      const randomId = uuidv4()
      const filepath = path.join(dirpath, "..", "public", "upload", `${randomId}.mp3`)
      await fs.writeFileSync(filepath, message.audioBuffer)

      const cloudinaryUpload = await cloudinaryFileUploadHandler(filepath, { resource_type: "auto" })
      if (!cloudinaryUpload.isSuccess || cloudinaryUpload.url == undefined) return

      socket.to(`group:${groupId}`).emit("groupMessage:receiveAudioMessage", {
        chatRoomId,
        message: { ...message, audioSrc: cloudinaryUpload.url },
        senderId,
        groupId,
      })

      const voiceMessage = new voiceMessageModel({
        audioSrc: cloudinaryUpload.url,
        postedByUser: senderId,
        _id: message._id,
      })
      await voiceMessage.save()
      if (voiceMessage == null) return

      ChatRoomModel.addChatConversation({
        chatRoomId: chatRoomId,
        messageId: voiceMessage._id,
        messageType: "voiceMessage",
      })
      fs.unlinkSync(filepath)
    } catch (error) {
      console.log(error)
    }
  })
  socket.on("groupMessage:newImageMessage", async ({ chatRoomId, message, senderId, groupId }) => {
    try {
      const userEnabledToMessage = await isUserEnabelToMessage(groupId, senderId)
      if (!userEnabledToMessage) return

      socket.to(`group:${groupId}`).emit("groupMessage:receiveImageMessage", { chatRoomId, message, senderId, groupId })

      const imageMessage = new ImageMessageModel({
        chatRoomId,
        postedByUser: senderId,
        messageType: "imageMessage",
        ...message,
      })
      await imageMessage.save()
      if (imageMessage == null) return

      ChatRoomModel.addChatConversation({
        chatRoomId: chatRoomId,
        messageId: imageMessage._id,
        messageType: "imageMessage",
      })
    } catch (error) {
      console.log(error)
    }
  })

  socket.on("groupMessage:newVideoMessage", async ({ chatRoomId, message, senderId, groupId }) => {
    try {
      const userEnabledToMessage = await isUserEnabelToMessage(groupId, senderId)
      if (!userEnabledToMessage) return

      socket.to(`group:${groupId}`).emit("groupMessage:receiveVideoMessage", { chatRoomId, message, senderId, groupId })

      const videoMessage = new VideoMessageModel({
        chatRoomId,
        postedByUser: senderId,
        messageType: "videoMessage",
        ...message,
      })
      await videoMessage.save()
      if (videoMessage == null) return

      ChatRoomModel.addChatConversation({
        chatRoomId: chatRoomId,
        messageId: videoMessage._id,
        messageType: "videoMessage",
      })
    } catch (error) {
      console.log(error)
    }
  })

  socket.on("groupMessage:newPollMessage", async ({ chatRoomId, groupId, message, senderId }) => {
    try {
      const userEnabledToMessage = await isUserEnabelToMessage(groupId, senderId)
      if (!userEnabledToMessage) return

      socket.to(`group:${groupId}`).emit("groupMessage:receivePollMessage", { chatRoomId, groupId, message, senderId })

      const pollMessage = new PollMessageModel({
        title: message.title,
        options: message.options,
        chatRoomId,
        postedByUser: senderId,
      })
      await pollMessage.save()

      if (pollMessage == null) return
      ChatRoomModel.addChatConversation({
        chatRoomId,
        messageId: pollMessage._id,
        //@ts-ignore
        messageType: "pollMessage",
      })
    } catch (error) {
      console.log(error)
    }
  })

  socket.on("groupMessage:pollMessageVoteUpdate", async ({ chatRoomId, groupDetail, message, senderId }) => {
    console.log("poll update message")
    const messageObjectId = new mongoose.Types.ObjectId(message._id)
    await PollMessageModel.updateVotedMember({
      _id: messageObjectId,
      currentVotedOptionDetail: { _id: message.selectedOption._id },
      userId: senderId,
    })
  })
}
export default groupMessageSocketIo
