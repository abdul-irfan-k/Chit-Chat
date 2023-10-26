import { Model, Schema, model } from "mongoose"

interface groupCallRoomSchemaInterface {
  referenceId: string
  adminDetail: {
    userId: string
  }
  callRoomId: string
  callInitiator: string
  pinnedUsers: {
    userId: { type: string }
  }[]
  callRoomAllUsers: {
    userId: { type: string }
  }[]
  callRoomCurrentusers: {
    userId: { type: string }
    peerId: { type: String }
  }[]
}

const groupCallRoomSchema = new Schema({
  referenceId: { type: String, required: true },
  adminDetail: { id: { type: String, required: true }, required: true },
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
  callRoomAvailableusers: [{ userId: { type: String }, peerId: { type: String } }],
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
    const newVideoCallRoom = new this({
      referenceId,
      adminDetail: {
        userId,
      },
      callRoomId,
      callInitiator: userId,
      pinnedUsers: [{ userId }],
      callRoomAllUsers: [{ userId }],
      callRoomAvailableusers: [{ userId, peerId }],
    })
    await newVideoCallRoom.save()
    return resolve({})
  })
}

groupCallRoomSchema.statics.getAdminDetail = function ({ referenceId }: { referenceId: string }) {
  return new Promise(async (resolve, reject) => {
    const groupCallRoom = await this.findOne({ referenceId })
    if (groupCallRoom == null) return reject()
    return resolve(groupCallRoom.adminDetail)
  })
}

interface staticInterface extends Model<GroupCallRoomDocument> {
  createVideoCallRoom(details: createVideoCallRoomArgument): Promise<any>
  getAdminDetail({ referenceId: string }): Promise<{ userId: string }>
  addUser(details):Promise<any>
}

export interface GroupCallRoomDocument extends groupCallRoomSchema, Document {}
const GroupCallRoomModel = model<GroupCallRoomDocument, staticInterface>("GroupCallRoom", groupCallRoomSchema)
export default GroupCallRoomModel
