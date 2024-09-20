import { Model, Schema, Types, model, Document } from "mongoose"

const messageReactionSchema = new Schema(
  {
    messageId: { type: String, required: true },
    reactions: [
      {
        reactionType: { type: String },
        emoji: { type: String, required: true },
        emojiId: { type: String, required: true },
        usersId: [{ type: Schema.Types.ObjectId, ref: "User", required: true }],
      },
    ],
  },
  { timestamps: true },
)

interface messageReaction {
  messageId: string
  reactions: {
    emoji: string
    emojiId: string
    usersId: Types.ObjectId[]
  }[]
}

interface MessageReactionDocument extends Model<messageReaction> {}

const MessageReactionModel = model<messageReaction, MessageReactionDocument>("messageReaction", messageReactionSchema)
export default MessageReactionModel
