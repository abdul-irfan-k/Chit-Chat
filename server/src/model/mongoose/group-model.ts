import { Schema } from "mongoose"

const groupChatRoomModel = new Schema(
  {
    name: { type: String, required: true },
    discription: { type: String },
    adminsDetail: {},
    usersDetail: {},
    setting: {
      isAdminOnlySendMessage: { type: Boolean, default: false },
      isAllowedJoinByUrl: { type: Boolean, default: true },
    },
  },
  {
    timestamps: true,
  },
)
