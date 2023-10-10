import { Model, Schema, model } from "mongoose"

interface readByRecipientSchemaInterface {
  readByUserId: string
  readAt: Date
}
const readByRecipientSchema = new Schema({
  readByUserId: { type: String, required: true },
  readAt: { type: Date, default: Date.now() },
})

interface textMessageSchemaInterface {
  chatRoomId: string
  postedByUser: string
  message: string
  messageType: string
  readByRecipient?: readByRecipientSchemaInterface[]
}
const textMessageSchema = new Schema(
  {
    chatRoomId: { type: String, required: true },
    postedByUser: { type: String, required: true },
    message: { type: String, required: true },
    messageType: { type: String, default: "textMessage" },
    readByRecipient: { type: [readByRecipientSchema], default: [] },
  },
  {
    timestamps: true,
  },
)

interface createNewMessageInChatRoom {
  chatRoomId: string
  postedByUser: string
  message: string
}
textMessageSchema.statics.createNewMessageInChatRoom = async function ({
  chatRoomId,
  postedByUser,
  message,
}: createNewMessageInChatRoom) {
  try {
    const post = await this.create({ chatRoomId, postedByUser, message })
    return post
  } catch (error) {
    console.log(error)
  }
}

interface staticInterface extends Model<TextMessageDocument> {
  createNewMessageInChatRoom(details: createNewMessageInChatRoom): any
}

export interface TextMessageDocument extends textMessageSchemaInterface, Document {}
const textMessageModel = model<TextMessageDocument, staticInterface>("TextMessage", textMessageSchema)
export default textMessageModel
