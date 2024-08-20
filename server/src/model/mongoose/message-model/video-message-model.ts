import { Document, Schema, model, Types } from "mongoose"
import { v4 as uuidv4 } from "uuid"

const videoMessageSchema = new Schema(
  {
    _id: { type: String, default: uuidv4 },
    chatRoomId: { type: String, required: true },
    postedByUser: { type: String, required: true },
    videoSrc: { type: String, required: true },
    messageType: { type: String },
    readreadByRecipient: [{ readByUserId: { type: String }, readAt: { type: Date, default: Date.now() } }],
    reactions: { type: Schema.Types.ObjectId },
  },
  {
    timestamps: true,
  },
)

interface videoMessageSchemaInterface {
  chatRoomId: string
  postedByUser: string
  videoSrc: string[]
  messageType?: string | undefined
  readreadByRecipient: {
    readAt: Date
    readByUserId?: string | undefined
  }[]
  reactions?: Types.ObjectId | undefined
}

export interface VideoMessageDocument extends Document, videoMessageSchemaInterface {}
const VideoMessageModel = model<VideoMessageDocument>("videoMessage", videoMessageSchema)
export default VideoMessageModel
