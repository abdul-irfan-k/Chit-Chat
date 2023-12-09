import mongoose, { Model, Schema, model } from "mongoose"

interface videoCallRoomSchemaInterface {
  chatRoomId: string
  userIds: string[]
  callCurrentStatus?: string
  callIntiatorUserId?: string
}
const videoCallRoomSchema = new Schema(
  {
    userIds: { type: [String], default: [] },
    chatRoomId: { type: String, required: true },
    callCurrentStatus: { type: String },
    callIntiatorUserId: { type: String },
  },
  {
    timestamps: true,
  },
)

interface initiateVideoCallRoomArgument {
  userId: string
  chatRoomId: string
}
videoCallRoomSchema.statics.initiateVideoCallRoom = function ({ chatRoomId, userId }: initiateVideoCallRoomArgument) {
  return new Promise(async (resolve, reject) => {
    try {
      const videoCallRoom = new this({ chatRoomId, userIds: [userId], callIntiatorUserId: userId })
      await videoCallRoom.save()
      return resolve({ isCreatedRoom: true, _id: videoCallRoom._id })
    } catch (error) {
      reject()
    }
  })
}

interface addVideoCallRoomUserArgument {
  userId: string
  callRoomId: string
}

videoCallRoomSchema.statics.addVideoCallRoomUser = function ({ userId, callRoomId }: addVideoCallRoomUserArgument) {
  return new Promise(async (resolve, reject) => {
    try {
      const callRoomObjectId = new mongoose.Types.ObjectId(callRoomId)
      const videoCallRoom = await this.findOneAndUpdate(
        { _id: callRoomObjectId },
        {
          $push: { userIds: userId },
        },
        { new: true },
      )
      resolve(videoCallRoom)
    } catch (error) {
      reject()
    }
  })
}

videoCallRoomSchema.statics.getVideoCallRoom = function (chatRoomId: string) {
  return new Promise(async (resolve, reject) => {
    try {
      const videoCallRoom = await this.findOne({ chatRoomId })
      return resolve(videoCallRoom)
    } catch (error) {
      reject()
    }
  })
}

interface staticInterface extends Model<VideoCallRoomDocument> {
  initiateVideoCallRoom(details: initiateVideoCallRoomArgument): Promise<any>
  addVideoCallRoomUser(details: addVideoCallRoomUserArgument): Promise<any>
  getVideoCallRoom(chatRoomId: string): Promise<any>
}

export interface VideoCallRoomDocument extends videoCallRoomSchemaInterface, Document {}
const VideoCallRoomModel = model<VideoCallRoomDocument, staticInterface>("Meeting", videoCallRoomSchema)
export default VideoCallRoomModel
