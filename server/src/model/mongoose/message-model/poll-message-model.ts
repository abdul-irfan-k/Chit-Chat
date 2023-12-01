import { Schema, model } from "mongoose"

const pollMessageSchema = new Schema(
  {
    title: { type: String, required: true },
    options: [{ title: { type: String }, votedMembers: [{ userId: { type: String } }] }],
    chatRoomId: { type: String, required: true },
    postedByUser: { type: String, required: true },
    messageType: { type: String },
    readreadByRecipient: [{ readByUserId: { type: String }, readAt: { type: Date, default: Date.now() } }],
  },
  {
    timestamps: true,
  },
)
interface pollMessageSchemaInterface {
  title: string
  options: {
    votedMembers: {
      userId?: string | undefined
    }[]
    title?: string | undefined
  }[]
  chatRoomId: string
  postedByUser: string
  messageType?: string | undefined
  readreadByRecipient: {
    readAt: Date
    readByUserId?: string | undefined
  }[]
}

export interface PollMessageDocument extends Document, pollMessageSchemaInterface {}
const PollMessageModel = model<PollMessageDocument>("pollMessage", pollMessageSchema)
export default PollMessageModel
