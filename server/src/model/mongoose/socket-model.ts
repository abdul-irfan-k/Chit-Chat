import { InferSchemaType, Schema, model, Document } from "mongoose"

const socketSchema = new Schema({
  ip: { type: String, unique: true },
  time: { type: Date, default: Date.now },
  user: { type: Schema.Types.ObjectId, ref: "User" },
})

const Socket = model("Socket", socketSchema)
export default Socket

export type SocketDocument = InferSchemaType<typeof socketSchema> & Document
