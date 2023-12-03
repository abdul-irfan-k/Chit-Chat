import { Socket } from "socket.io"
import { SocketIo } from "../../types/socket-io/socket-io.js"
import PollMessageModel from "../../model/mongoose/message-model/poll-message-model.js"
import textMessageModel from "../../model/mongoose/message-model/text-message-model.js"
import GroupChatRoomModel from "../../model/mongoose/chat-room-model/group-chat-room-model.js"

const groupMessageSocketIo = (socket: SocketIo) => {
  socket.on("groupMessage:newTextMessage", async ({ chatRoomId, message, senderId, groupDetail }) => {
    try {
      socket
        .to(`group:${groupDetail._id}`)
        .emit("groupMessage:receiveTextMessage", { chatRoomId, groupDetail, message, senderId })

      const newMessage = await textMessageModel.createNewMessageInChatRoom({
        chatRoomId: chatRoomId,
        message: message.messageContent,
        postedByUser: senderId,
      })
      if (newMessage == null) return

      GroupChatRoomModel.addChatConversation({
        chatRoomId: chatRoomId,
        messageId: newMessage._id.toString(),
        messageType: "textMessage",
      })
    } catch (error) {
      console.log(error)
    }
  })

  socket.on("groupMessage:newPollMessage", async ({ chatRoomId, groupDetail, message, senderId }) => {
    try {
      socket
        .to(`group:${groupDetail._id}`)
        .emit("groupMessage:receivePollMessage", { chatRoomId, groupDetail, message, senderId })

      const newMessage = new PollMessageModel({
        title: message.title,
        options: message.options,
        chatRoomId,
        postedByUser: senderId,
      })
      await newMessage.save()

      if (newMessage == null) return
      GroupChatRoomModel.addChatConversation({
        chatRoomId,
        messageId: newMessage._id.toString(),
        messageType: "pollMessage",
      })
    } catch (error) {
      console.log(error)
    }
  })
}
export default groupMessageSocketIo
