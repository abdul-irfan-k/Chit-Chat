import { Schema, Types, model } from "mongoose"
import { v4 as uuidV4 } from "uuid"

interface CallRoomSchemaInterface {
  _id: string
  participants: Types.ObjectId[]
  callCurrentStatus?: string
  callStatus?: string
  callIntiatorUserId?: Types.ObjectId
  callType?: string
  startTime?: Date
  endTime?: Date
  duration?: number
}
const CallRoomSchema = new Schema(
  {
    _id: { type: String, default: uuidV4 },
    chatRoomId: { type: String, required: true },
    callCurrentStatus: {
      type: String,
      enum: ["initiated", "in-progress", "ended", "missed"], // Enum for call status
      default: "initiated",
    },
    participants: {
      type: [{ type: Schema.Types.ObjectId, ref: "User" }], // Array of user references
      default: [],
    },
    callStatus: {
      type: String,
      enum: ["active", "ended", "failed"], // Enum for call status
      default: "active",
    },
    callIntiatorUserId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    callType: {
      type: String,
      enum: ["private", "group"], // Enum for call type
      required: true,
    },
    mediaType: {
      type: String,
      enum: ["audio", "video"], // Media type for the call (audio or video)
      required: true,
    },
    startTime: { type: Date },
    endTime: { type: Date },
    duration: { type: Number },
  },
  {
    timestamps: true,
  },
)

export interface VideoCallRoomDocument extends CallRoomSchemaInterface, Document {}
const MeetingModel = model<VideoCallRoomDocument>("Meeting", CallRoomSchema)
export default MeetingModel
