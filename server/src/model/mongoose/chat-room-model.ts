import mongoose, { Model, Schema, model } from "mongoose"

interface chatRoomSchemaInterface {
  UserIds: string[]
}
const chatRoomSchema = new Schema(
  {
    userIds: { type: [String] },
  },
  {
    timestamps: true,
  },
)

interface staticInterface extends Model<ChatRoomDocument> {
  initiateChat(userIds: string[]): any
  getAllMessageOfChatRoom(chatRoomId: string): any
}

export interface ChatRoomDocument extends chatRoomSchemaInterface, Document {}
const ChatRoomModel = model<ChatRoomDocument, staticInterface>("ChatRoom", chatRoomSchema)
export default ChatRoomModel

chatRoomSchema.statics.initiateChat = async function (userIds: string[]) {
  try {
    const avilableRoom = await this.findOne({
      userIds: {
        $all: userIds,
      },
    })

    console.log("available room", avilableRoom)
    if (avilableRoom != null) return

    const newRoom = new this({ userIds: userIds })
    await newRoom.save()
    console.log(newRoom)
    return {
      new: true,
    }
  } catch (error) {}
}

chatRoomSchema.statics.getAllMessageOfChatRoom = async function (chatRoomId: string) {
  const chatRoomObjectId = new mongoose.Types.ObjectId(chatRoomId)
  try {
    const allMessage = this.aggregate([
      { $match: { _id: chatRoomObjectId } },
      {
        $lookup: {
          from: "textmessages",
          localField: "_id",
          foreignField: "chatRoomId",
          as: "textMessage",
        },
      },
    ])
    return allMessage
  } catch (error) {}
}
