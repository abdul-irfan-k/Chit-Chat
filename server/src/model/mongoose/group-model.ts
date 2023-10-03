import mongoose, { Schema } from "mongoose"

const groupSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  users: {
    type: [mongoose.Types.ObjectId],
    default: [],
  },
  discription: {
    type: String,
  },
  setting: {
    isAdminOnlySendMessage: {
      type: String,
    },
  },
})
