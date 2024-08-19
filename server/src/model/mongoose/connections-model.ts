import { Document, Schema, Types, model } from "mongoose"

const connectionSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  freinds: [
    {
      userId: { type: Schema.Types.ObjectId },
      chatRoomId: { type: Schema.Types.ObjectId },
    },
  ],
  groups: [
    {
      groupId: { type: Schema.Types.ObjectId },
      chatRoomId: { type: Schema.Types.ObjectId },
    },
  ],

  sendedFreindRequest: [
    {
      userId: { type: Schema.Types.ObjectId },
    },
  ],
  receivedFreindRequest: [
    {
      userId: { type: Schema.Types.ObjectId },
    },
  ],
})

interface connectionSchemaInterface {
  userId: Types.ObjectId
  freinds: {
    userId?: Types.ObjectId | undefined
    chatRoomId?: Types.ObjectId | undefined
  }[]
  sendedFreindRequest: {
    userId?: Types.ObjectId | undefined
  }[]
  receivedFreindRequest: {
    userId?: Types.ObjectId | undefined
  }[]
  chatRooms: {
    chatRoomId?: Types.ObjectId | undefined
  }[]
  groups: {
    chatRoomId?: Types.ObjectId | undefined
    groupId?: Types.ObjectId | undefined
  }[]
}

export interface ConnectionDocument extends connectionSchemaInterface, Document {}
const ConnectionModel = model<ConnectionDocument>("Connection", connectionSchema)
export default ConnectionModel
