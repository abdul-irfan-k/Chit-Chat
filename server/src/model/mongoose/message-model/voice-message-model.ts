import { Schema, Document, model, Model, Types } from "mongoose"

interface readByRecipientSchemaInterface {
  readByUserId: string
  readAt: Date
}
const readByRecipientSchema = new Schema({
  readByUserId: { type: String, required: true },
  readAt: { type: Date, default: Date.now() },
})

interface voiceMessageSchemaInerface {
  chatRoomId?: string
  postedByUser: string
  voiceMessageSrc: string
  messageType: string
  readreadByRecipient?: readByRecipientSchemaInterface[]
  reactions?: Types.ObjectId | undefined
}
const voiceMessageSchema = new Schema(
  {
    chatRoomId: { type: String },
    postedByUser: { type: String, required: true },
    voiceMessageSrc: { type: String, required: true },
    messageType: { type: String, default: "voiceMessage" },
    readreadByRecipient: { type: [readByRecipientSchema], default: [] },
    reactions: { type: Schema.Types.ObjectId },
  },
  {
    timestamps: true,
  },
)

interface staticInterface extends Model<VoiceMessageDocument> {
  createNewMessageInChatRoom(details: createNewMessageInChatRoom): any
}
interface createNewMessageInChatRoom {
  chatRoomId?: string
  postedByUser: string
  voiceMessageSrc: string
}

voiceMessageSchema.statics.createNewMessageInChatRoom = async function ({
  chatRoomId,
  postedByUser,
  voiceMessageSrc,
}: createNewMessageInChatRoom) {
  try {
    const post = await this.create({ postedByUser, voiceMessageSrc })
    return post
  } catch (error) {
    console.log(error)
  }
}

export interface VoiceMessageDocument extends voiceMessageSchemaInerface, Document {}
const voiceMessageModel = model<VoiceMessageDocument, staticInterface>("voiceMessage", voiceMessageSchema)
export default voiceMessageModel
