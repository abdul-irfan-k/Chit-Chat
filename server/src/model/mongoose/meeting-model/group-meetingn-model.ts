import { Model, Schema, model } from "mongoose"

interface groupCallRoomSchemaInterface {
  referenceId: string
  adminId: string
  callRoomId: string
  callInitiator: string
  pinnedUsers: {
    userId: string
  }[]
  callRoomAllUsers: {
    userId: string
  }[]
  callRoomCurrentUsers: {
    userId: string
    peerId: string
  }[]
}

const groupCallRoomSchema = new Schema({
  referenceId: { type: String, required: true },
  adminId: { type: String, required: true },
  callRoomId: { type: String, required: true },
  callInitiator: { type: String, required: true },
  pinnedUsers: [
    {
      userId: { type: String },
    },
  ],
  callRoomAllUsers: [
    {
      userId: { type: String },
    },
  ],
  callRoomCurrentUsers: [
    {
      userId: { type: String },
      peerId: { type: String },
    },
  ],
})

interface createVideoCallRoomArgument {
  referenceId: string
  userId: string
  peerId: string
  callRoomId: string
}
groupCallRoomSchema.statics.createVideoCallRoom = function ({
  peerId,
  referenceId,
  userId,
  callRoomId,
}: createVideoCallRoomArgument) {
  return new Promise(async (resolve, reject) => {
    console.log("peer id", peerId)
    const newVideoCallRoom = new this({
      referenceId,
      adminId: userId,
      callRoomId,
      callInitiator: userId,
      pinnedUsers: [{ userId }],
      callRoomAllUsers: [{ userId }],
      callRoomCurrentUsers: [{ peerId, userId }],
    })
    await newVideoCallRoom.save()
    return resolve({})
  })
}

groupCallRoomSchema.statics.getAdminDetail = function ({ referenceId }: { referenceId: string }) {
  return new Promise(async (resolve, reject) => {
    const groupCallRoom = await this.findOne({ referenceId })
    if (groupCallRoom == null) return reject()
    return resolve({ userId: groupCallRoom.adminId })
  })
}

interface staticInterface extends Model<GroupCallRoomDocument> {
  createVideoCallRoom(details: createVideoCallRoomArgument): Promise<any>
  getAdminDetail(details: { referenceId: string }): Promise<{ userId: string }>
  addUser(details: any): Promise<any>
}

export interface GroupCallRoomDocument extends groupCallRoomSchemaInterface, Document {}
const GroupCallRoomModel = model<GroupCallRoomDocument, staticInterface>("GroupMeeting", groupCallRoomSchema)
export default GroupCallRoomModel
