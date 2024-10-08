import { Document, Schema, model, Types } from "mongoose"
import { v4 as uuidv4 } from "uuid"

const imageMessageSchema = new Schema(
  {
    _id: { type: String, default: uuidv4 },
    chatRoomId: { type: String, required: true },
    postedByUser: { type: String, required: true },
    imageSrc: { type: [String], required: true },
    messageType: { type: String },
    readreadByRecipient: [{ readByUserId: { type: String }, readAt: { type: Date, default: Date.now() } }],
    reactions: { type: Schema.Types.ObjectId },
  },
  {
    timestamps: true,
  },
)

interface imageMessageSchemaInterface {
  chatRoomId: string
  postedByUser: string
  imageSrc: string[]
  messageType?: string | undefined
  readreadByRecipient: {
    readAt: Date
    readByUserId?: string | undefined
  }[]
  reactions?: Types.ObjectId | undefined
}

export interface ImageMessageDocument extends Document, imageMessageSchemaInterface {}
const ImageMessageModel = model<ImageMessageDocument>("imageMessage", imageMessageSchema)
export default ImageMessageModel
