import mongoose, { Model, model } from "mongoose"
import { Document } from "mongoose"
import { Schema, Types } from "mongoose"

const groupChatRoomSchema = new Schema(
  {
    groupId: { type: Schema.Types.ObjectId },
    chatRoomConversations: [
      {
        messageId: Schema.Types.ObjectId,
        messageType: String,
        postedByUser: Schema.Types.ObjectId,
      },
    ],
  },
  {
    timestamps: true,
  },
)

interface groupChatRoomSchemaInterface {
  groupId?: Types.ObjectId | undefined
  chatRoomConversations: {
    messageId?: Types.ObjectId | undefined
    messageType?: string | undefined
    postedByUser?: Types.ObjectId | undefined
  }[]
}

interface staticInterface extends Model<GroupChatRoomDocument> {
  initiateChat(userIds: string[]): void
  addChatConversation(details: addChatConversation): void
}

groupChatRoomSchema.statics.initiateChat = async function (groupId: string) {
  try {
    const groupObjectId = new mongoose.Types.ObjectId(groupId)
    const avilableRoom = await this.findOne({ groupId: groupObjectId })
    if (avilableRoom != null) return

    const newRoom = new this({ groupId: groupObjectId })
    await newRoom.save()
    return { new: true }
  } catch (error) {
    console.log(error)
  }
}

interface addChatConversation {
  messageId: string
  messageType:  "textMessage" | "voiceMessage"|"imageMessage"|"pollMessage"
  chatRoomId: string
}
groupChatRoomSchema.statics.addChatConversation = async function ({
  messageId,
  messageType,
  chatRoomId,
}: addChatConversation) {
  try {
    await this.findOneAndUpdate({ _id: chatRoomId }, { $push: { chatRoomConversations: { messageId, messageType } } })
    return
  } catch (error) {
    console.log(error)
  }
}

export interface GroupChatRoomDocument extends groupChatRoomSchemaInterface, Document {}
const GroupChatRoomModel = model<GroupChatRoomDocument, staticInterface>("GroupChatRoom", groupChatRoomSchema)
export default GroupChatRoomModel
