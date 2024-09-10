import { Schema, Types, model } from "mongoose"

const groupSchema = new Schema(
  {
    name: { type: String, required: true },
    discription: { type: String, default: "" },
    groupImage: { type: String },
    adminsDetail: [{ userId: { type: Schema.Types.ObjectId } }],
    members: [{ userId: { type: Schema.Types.ObjectId } }],
    blockedMemberss: [{ userId: { type: Schema.Types.ObjectId } }],
    setting: {
      adminOnlyMessaging: { type: Boolean, default: false },
      adminOnlyChangeSetting: { type: Boolean, default: false },
      allowJoinByUrl: { type: Boolean, default: true },
      hideMemberPhoneNumber: { type: Boolean, default: false },
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
  groupImage: string
  adminsDetail: {
    userId?: Types.ObjectId | undefined
  }[]
  members: {
    userId?: Types.ObjectId | undefined
  }[]
  blockedMembers: {
    userId?: Types.ObjectId | undefined
  }[]
  chatRoomId: Types.ObjectId
  setting?:
    | {
        adminOnlyMessaging: boolean
        allowJoinByUrl: boolean
        hideMemberPhoneNumber: boolean
      }
    | undefined
}

export interface GroupDocument extends groupSchemaInterface, Document {}
const GroupModel = model<GroupDocument>("Group", groupSchema)
export default GroupModel
