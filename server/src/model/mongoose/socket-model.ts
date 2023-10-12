import { Schema, model, Document, Model } from "mongoose"

const socketSchema = new Schema(
  {
    ip: { type: String },
    socketId: { type: String, required: true },
    user: { type: Schema.Types.ObjectId, ref: "User" },
    userId: { type: String },
  },
  {
    timestamps: true,
  },
)

export interface socketSchemaInterface {
  socketId: string
  ip?: string | undefined
  user?: Schema.Types.ObjectId | undefined
  userId?: string | undefined
}

socketSchema.statics.getOnlineUsers = async function () {
  try {
    const onlineUsers = await this.aggregate([{ $project: { userId: 1 } }])
    return onlineUsers
  } catch (error) {
    console.log(error)
  }
}

interface staticInterface extends Model<SocketDocument> {
  getOnlineUsers(): any
}

export interface SocketDocument extends Document, socketSchemaInterface {}
const SocketModel = model<SocketDocument, staticInterface>("Socket", socketSchema)
export default SocketModel
