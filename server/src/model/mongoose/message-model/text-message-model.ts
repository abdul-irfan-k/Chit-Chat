import { Model, Schema, model, Types } from "mongoose"
import { v4 as uuidv4 } from "uuid"

interface readByRecipientSchemaInterface {
  readByUserId: string
  readAt: Date
}
const readByRecipientSchema = new Schema({
  readByUserId: { type: String, required: true },
  readAt: { type: Date, default: Date.now() },
})

interface textMessageSchemaInterface {
  _id: string
  chatRoomId: string
  postedByUser: string
  content: string
  messageType: string
  readByRecipient?: readByRecipientSchemaInterface[]
  reactions?: Types.ObjectId | undefined
}
const textMessageSchema = new Schema(
  {
    _id: { type: String, default: uuidv4 },
    chatRoomId: { type: String, required: true },
    postedByUser: { type: String, required: true },
    content: { type: String, required: true },
    messageType: { type: String, default: "textMessage" },
    readByRecipient: { type: [readByRecipientSchema], default: [] },
    reactions: { type: Schema.Types.ObjectId },
  },
  {
    timestamps: true,
  },
)

interface createNewMessageInChatRoom {
  chatRoomId: string
  postedByUser: string
  content: string
  _id?: string
}
textMessageSchema.statics.createNewMessageInChatRoom = async function ({
  chatRoomId,
  postedByUser,
  content,
  _id,
}: createNewMessageInChatRoom) {
  try {
    const post = await this.create({ chatRoomId, postedByUser, content, _id: _id })
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
