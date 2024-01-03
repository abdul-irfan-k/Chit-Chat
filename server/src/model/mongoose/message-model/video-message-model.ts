import { Document, Schema, model } from "mongoose"

const videoMessageSchema = new Schema(
  {
    chatRoomId: { type: String, required: true },
    postedByUser: { type: String, required: true },
    videoMessageSrc: { type: String, required: true },
    messageType: { type: String },
    readreadByRecipient: [{ readByUserId: { type: String }, readAt: { type: Date, default: Date.now() } }],
  },
  {
    timestamps: true,
  },
)

interface videoMessageSchemaInterface {
  chatRoomId: string
  postedByUser: string
  videoMessageSrc: string[]
  messageType?: string | undefined
  readreadByRecipient: {
    readAt: Date
    readByUserId?: string | undefined
  }[]
}

export interface VideoMessageDocument extends Document, videoMessageSchemaInterface {}
const VideoMessageModel = model<VideoMessageDocument>("videoMessage", videoMessageSchema)
export default VideoMessageModel
