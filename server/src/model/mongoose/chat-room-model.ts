import mongoose, { Model, Schema, model } from "mongoose"

interface chatRoomSchemaInterface {
  UserIds: string[]
  chatRoomConversations: chatRoomConversationsInterface
}

interface chatRoomConversationsInterface {
  messageId: Schema.Types.ObjectId
  messageType: string
}

const chatRoomConversationsSchema = new Schema({
  messageId: Schema.Types.ObjectId,
  messageType: String,
})

const chatRoomSchema = new Schema(
  {
    userIds: { type: [String] },
    chatRoomConversations: {
      type: [chatRoomConversationsSchema],
      default: [],
    },
  },
  {
    timestamps: true,
  },
)

interface staticInterface extends Model<ChatRoomDocument> {
  initiateChat(userIds: string[]): any
  getMessageOfChatRoom(chatRoomId: string): any
  addChatConversation(details: addChatConversation): any
}

chatRoomSchema.statics.initiateChat = async function (userIds: string[]) {
  // const messageObjectId = new mongoose.Types.ObjectId(messageId)
  try {
    const avilableRoom = await this.findOne({
      userIds: {
        $all: userIds,
      },
      // {
      //   $push:{chatRoomConversations:{messageId:messageObjectId,messageType} }
      // }
    })

    console.log("available room", avilableRoom)
    if (avilableRoom != null) return

    const newRoom = new this({ userIds: userIds })
    await newRoom.save()
    console.log(newRoom)
    return {
      new: true,
    }
  } catch (error) {}
}

chatRoomSchema.statics.getMessageOfChatRoom = async function (chatRoomId: string) {
  const chatRoomObjectId = new mongoose.Types.ObjectId(chatRoomId)
  try {
    const allMessage = this.aggregate([
      { $match: { _id: chatRoomObjectId } },
      { $unwind: "$chatRoomConversations" },
      {
        $group: {
          _id: null,
          messages: { $push: { type: "$chatRoomConversations.messageType", id: "$chatRoomConversations.messageId" } },
        },
      },

      {
        $project: {
          allMessages: {
            $map: {
              input: "$messages",
              as: "message",
              in: {
                textMessageIds: {
                  $cond: { if: { $eq: ["$$message.type", "textMessage"] }, then: "$$message.id", else: "$$REMOVE" },
                },
                voiceMessageIds: {
                  $cond: { if: { $eq: ["$$message.type", "voiceMessage"] }, then: "$$message.id", else: "$$REMOVE" },
                },
              },
            },
          },
        },
      },

      {
        $lookup: {
          from: "textmessages",
          let: { messageIds: "$allMessages.textMessageIds" },
          pipeline: [{ $match: { $expr: { $in: ["$_id", "$$messageIds"] } } }],
          as: "textMessage",
        },
      },
      {
        $lookup: {
          from: "voicemessages",
          let: { voiceMessageIds: "$allMessages.voiceMessageIds" },
          pipeline: [{ $match: { $expr: { $in: ["$_id", "$$voiceMessageIds"] } } }],
          as: "voiceMessage",
        },
      },

      {
        $addFields: {
          messages: { $concatArrays: ["$textMessage", "$voiceMessage"] },
        },
      },
      {
        $project: {
          messages: {
            $sortArray: {
              input: "$messages",
              sortBy: { createdAt: 1 },
            },
          },
        },
      },
    ])
    return allMessage
  } catch (error) {
    console.log("error")
  }
}

interface addChatConversation {
  messageId: string
  messageType: string
  chatRoomId: string
}
chatRoomSchema.statics.addChatConversation = async function ({
  messageId,
  messageType,
  chatRoomId,
}: addChatConversation) {
  try {
    const chatConversation = await this.findOneAndUpdate(
      { _id: chatRoomId },
      {
        $push: { chatRoomConversations: { messageId, messageType } },
      },
    )
    return chatConversation
  } catch (error) {
    console.log("chatroom id is not found")
  }
}

export interface ChatRoomDocument extends chatRoomSchemaInterface, Document {}
const ChatRoomModel = model<ChatRoomDocument, staticInterface>("ChatRoom", chatRoomSchema)
export default ChatRoomModel
