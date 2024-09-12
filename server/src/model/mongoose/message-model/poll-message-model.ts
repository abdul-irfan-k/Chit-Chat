import { Model, Types, Schema, model } from "mongoose"
import { v4 as uuidv4 } from "uuid"

const pollMessageSchema = new Schema(
  {
    _id: { type: String, default: uuidv4 },
    title: { type: String, required: true },
    options: [{ title: { type: String }, votedMembers: [{ userId: { type: String } }] }],
    totalVotedMembers: { type: Number, default: 0 },
    chatRoomId: { type: String, required: true },
    postedByUser: { type: String, required: true },
    messageType: { type: String },
    readreadByRecipient: [{ readByUserId: { type: String }, readAt: { type: Date, default: Date.now() } }],
  },
  {
    timestamps: true,
  },
)

interface optionInterface {
  _id: Types.ObjectId
  votedMembers: {
    userId?: string | undefined
  }[]
  title?: string | undefined
}
interface pollMessageSchemaInterface {
  _id: string
  title: string
  totalVotedMembers: number
  options: optionInterface[]
  chatRoomId: string
  postedByUser: string
  messageType?: string | undefined
  readreadByRecipient: {
    readAt: Date
    readByUserId?: string | undefined
  }[]
}

interface updateVoteInterface {
  _id: Types.ObjectId
  currentVotedOptionDetail: {
    _id: string
  }
  userId: string
}
pollMessageSchema.statics.updateVotedMember = async function ({
  _id,
  currentVotedOptionDetail,
  userId,
}: updateVoteInterface) {
  const pollMessage: pollMessageSchemaInterface | null = await this.findOne({ _id })
  if (pollMessage == null) return

  // const updatedOptions: Array<optionInterface> = []
  const updatedOptions: Array<optionInterface> = pollMessage.options.map((option, index) => {
    const previosVotedOptionDetail = pollMessage.options[index].votedMembers.filter((member) => member.userId == userId)
    if (previosVotedOptionDetail.length > 0) {
      const updatedVotedMembers = option.votedMembers.filter((member) => member.userId != userId)
      return { votedMembers: [...updatedVotedMembers], _id: option._id, title: option.title }
    } else if (option._id.toString() == currentVotedOptionDetail._id) {
      const updatedMembers = option.votedMembers
      updatedMembers.push({ userId: userId })
      return { votedMembers: [...updatedMembers], _id: option._id, title: option.title }
    } else return { votedMembers: [...option.votedMembers], _id: option._id, title: option.title }
  })
  // console.log("updated options", updatedOptions)
  await this.findOneAndUpdate({ _id }, { options: updatedOptions }, { new: true })
  debugger
}

interface staticInterface extends Model<PollMessageDocument> {
  updateVotedMember(details: updateVoteInterface): any
}
export interface PollMessageDocument extends Document, pollMessageSchemaInterface {}
const PollMessageModel = model<PollMessageDocument, staticInterface>("pollMessage", pollMessageSchema)
export default PollMessageModel
