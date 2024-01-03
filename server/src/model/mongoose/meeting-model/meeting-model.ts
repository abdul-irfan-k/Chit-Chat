import mongoose, { Model, Schema, Types, model } from "mongoose"

interface CallRoomSchemaInterface {
  chatRoomId: string
  userIds: string[]
  callCurrentStatus?: string
  callIntiatorUserId?: Types.ObjectId
  callType?: string | undefined
}
const CallRoomSchema = new Schema(
  {
    chatRoomId: { type: String, required: true },
    callCurrentStatus: { type: String },
    callIntiatorUserId: { type: Schema.Types.ObjectId, required: true },
    callType: { type: String },
  },
  {
    timestamps: true,
  },
)

interface initiateVideoCallRoomArgument {
  userId: string
  chatRoomId: string
}
CallRoomSchema.statics.initiateVideoCallRoom = async function ({ chatRoomId, userId }: initiateVideoCallRoomArgument) {
   const intiatorUserId = new mongoose.Types.ObjectId(userId)
  const videoCallRoom = new this({ chatRoomId, userIds: [userId], callIntiatorUserId: intiatorUserId })
  await videoCallRoom.save()
  return { isCreatedRoom: true, _id: videoCallRoom._id }
}

interface addVideoCallRoomUserArgument {
  userId: string
  callRoomId: string
}

CallRoomSchema.statics.addVideoCallRoomUser = async function ({ userId, callRoomId }: addVideoCallRoomUserArgument) {
  const callRoomObjectId = new mongoose.Types.ObjectId(callRoomId)
  const videoCallRoom = await this.findOneAndUpdate(
    { _id: callRoomObjectId },
    {
      $push: { userIds: userId },
    },
    { new: true },
  )
  return videoCallRoom
}

CallRoomSchema.statics.getVideoCallRoom = async function (chatRoomId: string) {
  const videoCallRoom = await this.findOne({ chatRoomId })
  return videoCallRoom
}

interface staticInterface extends Model<VideoCallRoomDocument> {
  initiateVideoCallRoom(details: initiateVideoCallRoomArgument): { isCreatedRoom: boolean; _id: Types.ObjectId }
  addVideoCallRoomUser(details: addVideoCallRoomUserArgument): any
  getVideoCallRoom(chatRoomId: string): void
}

export interface VideoCallRoomDocument extends CallRoomSchemaInterface, Document {}
const VideoCallRoomModel = model<VideoCallRoomDocument, staticInterface>("Meeting", CallRoomSchema)
export default VideoCallRoomModel
