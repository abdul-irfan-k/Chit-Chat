import { Document, Schema, Types, model } from "mongoose"

const connectionSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  friends: [
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
      status: {
        type: String,
        enum: ["pending", "accepted", "rejected"],
        default: "pending",
        required: true,
      },
    },
  ],
  receivedFreindRequest: [
    {
      userId: { type: Schema.Types.ObjectId },
      status: {
        type: String,
        enum: ["pending", "accepted", "rejected"],
        default: "pending",
        required: true,
      },
    },
  ],
})

interface connectionSchemaInterface {
  userId: Types.ObjectId
  friends: {
    userId?: Types.ObjectId | undefined
    chatRoomId?: Types.ObjectId | undefined
  }[]
  sendedFreindRequest: {
    userId?: Types.ObjectId | undefined
    status: "pending" | "accepted" | "rejected"
  }[]
  receivedFreindRequest: {
    userId?: Types.ObjectId | undefined
    status: "pending" | "accepted" | "rejected"
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
