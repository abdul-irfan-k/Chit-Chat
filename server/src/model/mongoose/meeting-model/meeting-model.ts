import mongoose, { Model, Schema, Types, model } from "mongoose"

interface CallRoomSchemaInterface {
  chatRoomId: string
  userIds: string[]
  callCurrentStatus?: string
  callStatus?: string
  callIntiatorUserId?: Types.ObjectId
  callType?: string | undefined
}
const CallRoomSchema = new Schema(
  {
    chatRoomId: { type: String, required: true },
    callCurrentStatus: { type: String },
    callStatus: { type: String },
    callIntiatorUserId: { type: Schema.Types.ObjectId, required: true },
    callType: { type: String },
  },
  {
    timestamps: true,
  },
)

interface initiateCallRoomArgument {
  userId: string
  chatRoomId: string
  callType: "videoCall" | "audioCall"
}
CallRoomSchema.statics.initiateCallRoom = async function ({ chatRoomId, userId, callType }: initiateCallRoomArgument) {
  const intiatorUserId = new mongoose.Types.ObjectId(userId)
  const videoCallRoom = new this({ chatRoomId, userIds: [userId], callIntiatorUserId: intiatorUserId, callType })
  await videoCallRoom.save()
  return { isCreatedRoom: true, _id: videoCallRoom._id }
}

interface addCallRoomUserArgument {
  userId: string
  callRoomId: string
}

CallRoomSchema.statics.addCallRoomUser = async function ({ userId, callRoomId }: addCallRoomUserArgument) {
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

CallRoomSchema.statics.getCallRoom = async function (chatRoomId: string) {
  const videoCallRoom = await this.findOne({ chatRoomId })
  return videoCallRoom
}

interface staticInterface extends Model<VideoCallRoomDocument> {
  initiateCallRoom(details: initiateCallRoomArgument): { isCreatedRoom: boolean; _id: Types.ObjectId }
  addCallRoomUser(details: addCallRoomUserArgument): any
  getCallRoom(chatRoomId: string): void
}

export interface VideoCallRoomDocument extends CallRoomSchemaInterface, Document {}
const CallRoomModel = model<VideoCallRoomDocument, staticInterface>("Meeting", CallRoomSchema)
export default CallRoomModel
