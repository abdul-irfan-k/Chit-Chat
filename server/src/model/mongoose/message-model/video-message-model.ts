import { Document, Schema, model,Types } from "mongoose"

const videoMessageSchema = new Schema(
  {
    chatRoomId: { type: String, required: true },
    postedByUser: { type: String, required: true },
    videoMessageSrc: { type: String, required: true },
    messageType: { type: String },
    readreadByRecipient: [{ readByUserId: { type: String }, readAt: { type: Date, default: Date.now() } }],
    reactions:{type:Schema.Types.ObjectId}
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
  reactions?: Types.ObjectId | undefined
}

export interface VideoMessageDocument extends Document, videoMessageSchemaInterface {}
const VideoMessageModel = model<VideoMessageDocument>("videoMessage", videoMessageSchema)
export default VideoMessageModel
