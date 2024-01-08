import { Model, Schema, Types, model } from "mongoose"

interface messageReactionSchemaInterface {
  messageId: Types.ObjectId
  reactions: {
    reactionType: string
    emoji: string
    usersId: {
      userId?: Types.ObjectId | undefined
    }[]
  }
}
const messageReactionSchema = new Schema(
  {
    messageId: { type: Schema.Types.ObjectId, required: true },
    reactions: [
      {
        reactionType: { type: String, required: true },
        emoji: { type: String, required: true },
        usersId: [{ userId: Schema.Types.ObjectId }],
      },
    ],
  },
  { timestamps: true },
)

export interface MessageReactionDocument extends Document, messageReactionSchemaInterface {}
const MessageReactionModel = model("messageReaction",messageReactionSchema)
export default MessageReactionModel
