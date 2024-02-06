import { Model, Schema, Types, model,Document } from "mongoose"

const messageReactionSchema = new Schema(
  {
    messageId: { type: Schema.Types.ObjectId, required: true },
    reactions: [
      {
        reactionType: { type: String },
        emoji: { type: String, required: true },
        emojiId: { type: String, required: true },
        usersId: [{ userId: Schema.Types.ObjectId }],
      },
    ],
  },
  { timestamps: true },
)

interface messageReaction {
  messageId: Types.ObjectId
  reactions: {
    reactionType?: string
    emoji: string
    emojiId: string
    usersId: {
      userId?: Types.ObjectId | undefined
    }[]
  }[]
}

interface MessageReactionDocument extends messageReaction, Document {
  findOrCreateMessageReactionModel(messageId: Types.ObjectId): Promise<messageReaction>
}

messageReactionSchema.statics.findOrCreateMessageReactionModel = async function (messageId) {
  const messageReaction = await this.findOne({ messageId })
  if (!messageReaction) return messageReaction

  const newMessageReaction = new this({ messageId, reactions: [] })
  await newMessageReaction.save()

  return newMessageReaction
}

const MessageReactionModel = model<MessageReactionDocument>("messageReaction", messageReactionSchema)
export default MessageReactionModel
