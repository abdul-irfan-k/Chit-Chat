import { Schema, Types, model } from "mongoose"

const groupSchema = new Schema(
  {
    name: { type: String, required: true },
    discription: { type: String, default: "" },
    adminsDetail: [{ userId: { type: Schema.Types.ObjectId } }],
    member: [{ userId: { type: Schema.Types.ObjectId } }],
    blockedMember: [{ userId: { type: Schema.Types.ObjectId } }],
    setting: {
      isAdminOnlySendMessage: { type: Boolean, default: false },
      isAllowedJoinByUrl: { type: Boolean, default: true },
      isHidingMembersNumber: { type: Boolean, default: false },
    },
    chatRoomId: { type: Schema.Types.ObjectId, required: true },
  },
  {
    timestamps: true,
  },
)

interface groupSchemaInterface {
  name: string
  discription: string
  adminsDetail: {
    userId?: Types.ObjectId | undefined
  }[]
  member: {
    userId?: Types.ObjectId | undefined
  }[]
  blockedMember: {
    userId?: Types.ObjectId | undefined
  }[]
  chatRoomId: Types.ObjectId
  setting?:
    | {
        isAdminOnlySendMessage: boolean
        isAllowedJoinByUrl: boolean
        isHidingMembersNumber: boolean
      }
    | undefined
}

export interface GroupDocument extends groupSchemaInterface, Document {}
const GroupModel = model<GroupDocument>("Group", groupSchema)
export default GroupModel
