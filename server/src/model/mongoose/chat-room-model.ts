import mongoose, { Model, Schema, model } from "mongoose"

interface chatRoomSchemaInterface {
  UserIds: string[]
  chatRoomConversations: chatRoomConversationsInterface
}

interface chatRoomConversationsInterface {
  messageId: Schema.Types.ObjectId
  messageType: string
}

const chatRoomConversationsSchema = new Schema({
  messageId: Schema.Types.ObjectId,
  messageType: String,
})

const chatRoomSchema = new Schema(
  {
    userIds: { type: [String] },
    chatRoomConversations: {
      type: [chatRoomConversationsSchema],
      default: [],
    },
  },
  {
    timestamps: true,
  },
)

interface staticInterface extends Model<ChatRoomDocument> {
  initiateChat(userIds: string[]): any
  getMessageOfChatRoom(chatRoomId: string): any
  addChatConversation(details: addChatConversation): any
}

chatRoomSchema.statics.initiateChat = async function (userIds: string[], messageId, messageType) {
  // const messageObjectId = new mongoose.Types.ObjectId(messageId)
  try {
    const avilableRoom = await this.findOne({
      userIds: {
        $all: userIds,
      },
      // {
      //   $push:{chatRoomConversations:{messageId:messageObjectId,messageType} }
      // }
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

chatRoomSchema.statics.getMessageOfChatRoom = async function (chatRoomId: string) {
  const chatRoomObjectId = new mongoose.Types.ObjectId(chatRoomId)
  try {
    const allMessage = this.aggregate([
      { $match: { _id: chatRoomObjectId } },
      { $unwind: "$chatRoomConversations" },
      {
        $group: {
          _id: "$chatRoomConversations.messageType",
          messages: {
            $push: {
              type: "$chatRoomConversations.messageType",
              id: "$chatRoomConversations.messageId",
            },
          },
        },
      },

      {
        $project: {
          textMessages: {
            $map: {
              input: "$messages",
              as: "message",
              in: {
                id: {
                  $cond: { if: { $eq: ["$$message.type", "textMessage"] }, then: "$$message.id", else: "$$REMOVE" },
                },
              },
            },
          },
        },
      },

      {
        $lookup: {
          from: "textmessages",
          let: { messageIds: "$textMessages.id" },
          pipeline: [
            {
              $match: {
                $expr: { $in: ["$_id", "$$messageIds"] },
              },
            },
          ],
          as: "textMessage",
        },
      },
      {
        $unwind:'$textMessage'
      },
      {
        $sort:{
          "textMessage.createdAt":-1
        }
      }
    ])
    return allMessage
  } catch (error) {
    console.log("error")
  }
}

interface addChatConversation {
  messageId: string
  messageType: string
  chatRoomId: string
}
chatRoomSchema.statics.addChatConversation = async function ({
  messageId,
  messageType,
  chatRoomId,
}: addChatConversation) {
  try {
    const chatConversation = await this.findOneAndUpdate(
      { _id: chatRoomId },
      {
        $push: { chatRoomConversations: { messageId, messageType } },
      },
    )
    return chatConversation
  } catch (error) {
    console.log("chatroom id is not found")
  }
}

export interface ChatRoomDocument extends chatRoomSchemaInterface, Document {}
const ChatRoomModel = model<ChatRoomDocument, staticInterface>("ChatRoom", chatRoomSchema)
export default ChatRoomModel

// db.users.aggregate([
//   {
//     $project: {
//       val: {
//         $switch: {
//           branches: [{ case: { $eq: ["$userId", "irfan76"] }, then: "uppinangady" }],
//           default: "puttur",
//         },
//       },
//       name: 1,
//       email: 1,
//     },
//   },
//   {
//     $group: {
//       _id: "$val",
//       detail: {
//         $push: {
//           type: "$val",
//           name: "$name",
//         },
//         // $push: "$name",
//       },
//     },
//   },
//   {
//     $project: {
//       // admin: {
//       //   $cond: { if: { $eq: ["$_id", "uppinangady"] }, then: "$val", else: "$$REMOVE" },
//       // },
//       // user: {
//       //   $cond: { if: { $eq: ["$_id", "puttur"] }, then: "$val", else: "$$REMOVE" },
//       // },
//       // user:{
//       //   $map: {
//       //     input: "$places",
//       //     as: "hobby",
//       //     // cond: { $eq: ["_id",'uppinangady'] } ,
//       //     in:'$$hobby'
//       // }
//       user: {
//         $filter: {
//           input: "$detail.name",
//           as: "hobby",
//           cond: { $eq: ["$de", "uppinangady"] },
//           // in:'$$hobby'
//         },
//       },
//     },
//   },
//   // {
//   //   $unwind: "$_id",
//   // },
//   {
//     $lookup: {
//       from: "users",
//       let: {
//         a: "$user",
//       },
//       pipeline: [
//         {
//           $match: {
//             // "name":"zuhair"
//             $expr: { $in: ["$name", "$$a"] },
//             // },
//             // $project:{
//             //   a:'$$a'
//           },
//         },
//       ],
//       as: "looks",
//     },
//   },
// ])

// db.users.aggregate([
//   {
//     $project: {
//       val: {
//         $switch: {
//           branches: [{ case: { $eq: ["$userId", "irfan76"] }, then: "uppinangady" }],
//           default: "puttur",
//         },
//       },
//       name: 1,
//       email: 1,
//     },
//   },
//   {
//     $group: {
//       _id: "$val",
//       detail: {
//         $push: {
//           type: "$val",
//           name: "$name",
//         },
//       },
//     },
//   },
//   {
//     $project: {
//       user: {
//         $map: {
//           input: "$detail",
//           as: "hobby",
//           in: {
//             test: {
//               $cond: { if: { $eq: ["$$hobby.type", "puttur"] }, then: "$$hobby.name", else: "$$REMOVE" },
//             },
//           },
//         },
//       },
//     },
//   },
//   {
//     $lookup: {
//       from: "users",
//       let: {
//         a: "$user.test",
//       },
//       pipeline: [
//         {
//           $match: {
//             // "name":"zuhair"
//             $expr: { $in: ["$name", "$$a"] },
//             // },
//             // $project:{
//             //   a:'$$a'
//           },
//         },
//       ],
//       as: "looks",
//     },
//   },
// ])
