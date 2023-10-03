import { Schema, model, Document } from "mongoose"

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

const SocketModel = model("Socket", socketSchema)
export default SocketModel

export interface socketSchemaInterface {
  socketId: string
  ip?: string | undefined
  user?: Schema.Types.ObjectId | undefined
  userId?: string | undefined;
}

export interface SocketDocument extends Document, socketSchemaInterface {}
