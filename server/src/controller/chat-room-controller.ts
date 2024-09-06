import { Request, Response } from "express"
import textMessageModel from "../model/mongoose/message-model/text-message-model"
import ChatRoomModel from "../model/mongoose/chat-room-model/chat-room-model"
import GroupModel from "../model/mongoose/group-model"
import mongoose from "mongoose"
import ConnectionModel from "../model/mongoose/connections-model"
import UserModel from "../model/mongoose/user-model"
import GroupChatRoomModel from "../model/mongoose/chat-room-model/group-chat-room-model"
import MessageReactionModel from "../model/mongoose/message-model/message-reaction-model"

export const sendMessageToUserHandler = async (req: Request, res: Response) => {
  try {
    const { _id } = req.user as userInterface
    const { chatRoomId, message } = req.body
    await textMessageModel.createNewMessageInChatRoom({ chatRoomId, message, postedByUser: _id })
    return res.status(200).json({ isValid: true, isSaved: true })
  } catch (error) {
    console.log(error)
  }
}

export const getAllChatUsersHandler = async (req: Request, res: Response) => {
  try {
    const { _id } = req.user as userInterface

    const userObjectId = new mongoose.Types.ObjectId(_id)

    const chatUser = await ConnectionModel.aggregate([
      { $match: { userId: userObjectId } },
      { $unwind: "$friends" },
      {
        $lookup: {
          from: "users", // The 'users' collection name in MongoDB
          localField: "friends.userId",
          foreignField: "_id",
          pipeline: [
            {
              $project: { name: 1, email: 1, profileImageUrl: 1, _id: 1, userId: 1, chatRoomId: "friends.chatRoomId" },
            },
          ],
          as: "friendsDetails",
        },
      },
      { $unwind: "$friendsDetails" },
      {
        $addFields: {
          "friendsDetails.chatRoomId": "$friends.chatRoomId", // Add chatRoomId from the friends array to friendDetails
        },
      },
      {
        $group: {
          _id: "$_id", // Group by the Connection document's _id
          friendsDetails: { $push: "$friendsDetails" }, // Push the friendDetails with chatRoomId into an array
        },
      },

      {
        // $project: { friendsDetails: { $first: "$friendsDetails" } },
        $project: { friendsDetails: 1 },
      },
    ])
    return res.status(200).json(chatUser[0]?.friendsDetails)
  } catch (error) {
    console.log(error)
  }
}

export const getAllChatGroupsHandler = async (req: Request, res: Response) => {
  try {
    const { _id } = req.user as userInterface
    const userObjectId = new mongoose.Types.ObjectId(_id)
    // const allNewChatGroup = await GroupModel.find({member:{$elemMatch: {userId:userObjectId }}})
    const allNewChatGroup = await GroupModel.aggregate([
      { $match: { member: { $elemMatch: { userId: userObjectId } } } },
      {
        $addFields: {
          isAdmin: { $in: [userObjectId, "$adminsDetail.userId"] },
        },
      },
    ])

    return res.status(200).json(allNewChatGroup)
  } catch (error) {
    console.log(error)
    return res.status(400).json({})
  }
}

export const getChatRoomMessageHandler = async (req: Request, res: Response) => {
  try {
    const { chatRoomId, skip, step, limit, sort } = req.body
    const chatRoomObjectId = new mongoose.Types.ObjectId(chatRoomId)

    const arrayStartingFrom = skip != undefined ? -(skip + 1) * step : -1
    const messageLimit = limit != undefined ? limit : 10

    const messageSort = sort != undefined && sort == "ACCENDING" ? -1 : 1
    const chatRoomMessages = await ChatRoomModel.aggregate([
      { $match: { _id: chatRoomObjectId } },
      { $project: { chatRoomConversations: { $slice: ["$chatRoomConversations", arrayStartingFrom, messageLimit] } } },
      { $unwind: "$chatRoomConversations" },
      {
        $group: {
          _id: null,
          messages: { $push: { type: "$chatRoomConversations.messageType", id: "$chatRoomConversations.messageId" } },
        },
      },

      {
        $project: {
          allMessages: {
            $map: {
              input: "$messages",
              as: "message",
              in: {
                textMessageIds: {
                  $cond: { if: { $eq: ["$$message.type", "textMessage"] }, then: "$$message.id", else: "$$REMOVE" },
                },
                voiceMessageIds: {
                  $cond: { if: { $eq: ["$$message.type", "voiceMessage"] }, then: "$$message.id", else: "$$REMOVE" },
                },
                imageMessageIds: {
                  $cond: { if: { $eq: ["$$message.type", "imageMessage"] }, then: "$$message.id", else: "$$REMOVE" },
                },
                videoMessageIds: {
                  $cond: { if: { $eq: ["$$message.type", "videoMessage"] }, then: "$$message.id", else: "$$REMOVE" },
                },
              },
            },
          },
        },
      },

      {
        $lookup: {
          from: "textmessages",
          let: { messageIds: "$allMessages.textMessageIds" },
          pipeline: [{ $match: { $expr: { $in: ["$_id", "$$messageIds"] } } }],
          as: "textMessage",
        },
      },
      {
        $lookup: {
          from: "voicemessages",
          let: { voiceMessageIds: "$allMessages.voiceMessageIds" },
          pipeline: [{ $match: { $expr: { $in: ["$_id", "$$voiceMessageIds"] } } }],
          as: "voiceMessage",
        },
      },
      {
        $lookup: {
          from: "imagemessages",
          let: { imageMessageIds: "$allMessages.imageMessageIds" },
          pipeline: [{ $match: { $expr: { $in: ["$_id", "$$imageMessageIds"] } } }],
          as: "imageMessage",
        },
      },
      {
        $lookup: {
          from: "videomessages",
          let: { videoMessageIds: "$allMessages.videoMessageIds" },
          pipeline: [{ $match: { $expr: { $in: ["$_id", "$$videoMessageIds"] } } }],
          as: "videoMessage",
        },
      },

      {
        $addFields: {
          messages: { $concatArrays: ["$textMessage", "$voiceMessage", "$imageMessage", "$videoMessage"] },
        },
      },
      {
        $project: {
          messages: {
            $sortArray: {
              input: "$messages",
              sortBy: { createdAt: messageSort },
            },
          },
        },
      },
    ])

    let totalMessages: undefined | number = undefined
    if (skip == 0) {
      const messageSizeData = await ChatRoomModel.aggregate([
        { $match: { _id: chatRoomObjectId } },
        { $project: { totalMessages: { $size: "$chatRoomConversations" } } },
      ])
      if (messageSizeData[0].totalMessages != undefined) totalMessages = messageSizeData[0].totalMessages
    }
    return res.status(200).json({ ...chatRoomMessages, totalMessages })
  } catch (error) {
    console.log(error)
    return res.status(400).json({ isValid: false })
    // console.log(error)
  }
}

// creating the group
export const createGroupHandler = async (req: Request, res: Response) => {
  try {
    const { _id } = req.user as userInterface
    const { groupName, groupMembers }: { groupName: string; groupMembers: Array<{ userId: string }> } = req.body
    groupMembers.push({ userId: _id })

    const newChatRoom = new GroupChatRoomModel({})
    await newChatRoom.save()

    const newGroup = new GroupModel({
      name: groupName,
      adminsDetail: [{ userId: _id }],
      member: groupMembers,
      chatRoomId: newChatRoom._id,
    })
    await newGroup.save()

    GroupChatRoomModel.findOneAndUpdate({ _id: newChatRoom._id }, { groupId: newGroup._id })

    return res.status(200).json({ isValid: true, chatRoomId: newChatRoom._id })
  } catch (error) {
    return res.status(400).json({})
  }
}

export const acceptGroupHandler = async (req: Request, res: Response) => {
  try {
    const { _id } = req.user as userInterface
    const { groupId, groupChatRoomId } = req.body

    const userObjectId = new mongoose.Types.ObjectId(_id)
    const groupObjectId = new mongoose.Types.ObjectId(groupId)
    const groupChatRomObjectId = new mongoose.Types.ObjectId(groupChatRoomId)
    await ConnectionModel.findOneAndUpdate(
      { userId: userObjectId, groups: { $not: { $elemMatch: { groupId: groupObjectId } } } },
      { $push: { groups: { groupId: groupObjectId, chatRoomId: groupChatRomObjectId } } },
    )
  } catch (error) {
    return res.status(400).json({})
  }
}

// get group chat room messages
export const getGroupChatRoomMessageHandler = async (req: Request, res: Response) => {
  try {
    const { chatRoomId } = req.body
    console.log("chatRoomId", chatRoomId)
    const chatRoomObjectId = new mongoose.Types.ObjectId(chatRoomId)
    const chatRoomMessages = await GroupChatRoomModel.aggregate([
      { $match: { _id: chatRoomObjectId } },
      { $unwind: "$chatRoomConversations" },
      {
        $group: {
          _id: null,
          messages: { $push: { type: "$chatRoomConversations.messageType", id: "$chatRoomConversations.messageId" } },
        },
      },

      {
        $project: {
          allMessages: {
            $map: {
              input: "$messages",
              as: "message",
              in: {
                textMessageIds: {
                  $cond: { if: { $eq: ["$$message.type", "textMessage"] }, then: "$$message.id", else: "$$REMOVE" },
                },
                voiceMessageIds: {
                  $cond: { if: { $eq: ["$$message.type", "voiceMessage"] }, then: "$$message.id", else: "$$REMOVE" },
                },
                imageMessageIds: {
                  $cond: { if: { $eq: ["$$message.type", "imageMessage"] }, then: "$$message.id", else: "$$REMOVE" },
                },
                pollMessageIds: {
                  $cond: { if: { $eq: ["$$message.type", "pollMessage"] }, then: "$$message.id", else: "$$REMOVE" },
                },
                videoMessageIds: {
                  $cond: { if: { $eq: ["$$message.type", "videoMessage"] }, then: "$$message.id", else: "$$REMOVE" },
                },
              },
            },
          },
        },
      },

      {
        $lookup: {
          from: "textmessages",
          let: { messageIds: "$allMessages.textMessageIds" },
          pipeline: [{ $match: { $expr: { $in: ["$_id", "$$messageIds"] } } }],
          as: "textMessage",
        },
      },
      {
        $lookup: {
          from: "voicemessages",
          let: { voiceMessageIds: "$allMessages.voiceMessageIds" },
          pipeline: [{ $match: { $expr: { $in: ["$_id", "$$voiceMessageIds"] } } }],
          as: "voiceMessage",
        },
      },
      {
        $lookup: {
          from: "imagemessages",
          let: { imageMessageIds: "$allMessages.imageMessageIds" },
          pipeline: [{ $match: { $expr: { $in: ["$_id", "$$imageMessageIds"] } } }],
          as: "imageMessage",
        },
      },
      {
        $lookup: {
          from: "videomessages",
          let: { videoMessageIds: "$allMessages.imageMessageIds" },
          pipeline: [{ $match: { $expr: { $in: ["$_id", "$$videoMessageIds"] } } }],
          as: "videoMessage",
        },
      },
      {
        $lookup: {
          from: "pollmessages",
          let: { pollMessageIds: "$allMessages.pollMessageIds" },
          pipeline: [{ $match: { $expr: { $in: ["$_id", "$$pollMessageIds"] } } }],
          as: "pollMessage",
        },
      },

      {
        $addFields: {
          messages: {
            $concatArrays: ["$textMessage", "$voiceMessage", "$imageMessage", "$videoMessage", "$pollMessage"],
          },
        },
      },
      {
        $project: {
          messages: {
            $sortArray: {
              input: "$messages",
              sortBy: { createdAt: 1 },
            },
          },
        },
      },
    ])

    return res.status(200).json(chatRoomMessages)
  } catch (error) {
    console.log(error)
    return res.status(400).json({ isValid: false })
    // console.log(error)
  }
}

export const getChatRoomMessageReactionHandler = async (req: Request, res: Response) => {
  try {
    const { chatRoomId, skip, step, limit } = req.body

    const chatRoomObjectId = new mongoose.Types.ObjectId(chatRoomId)

    const arrayStartingFrom = -(skip + 1) * step

    // const chatRoomMessageReactions = await ChatRoomModel.findOne(
    //   { _id: chatRoomObjectId },
    //   { chatRoomConversations: { $slice: [arrayStartingFrom, limit] } },
    // )
    console.log(arrayStartingFrom, limit)
    const chatRoomMessageReactions = await ChatRoomModel.aggregate([
      { $match: { _id: chatRoomObjectId } },
      { $project: { chatRoomConversations: { $slice: ["$chatRoomConversations", arrayStartingFrom, limit] } } },
      {
        $lookup: {
          from: "messagereactions",
          let: { messageIds: "$chatRoomConversations" },
          pipeline: [{ $match: { $expr: { $in: ["$_id", "$$messageIds.messageId"] } } }],
          as: "messageReaction",
        },
      },
    ])

    return res.status(200).json({ chatRoomMessageReactions })
  } catch (error) {
    console.log(error)
    return res.status(400).json({})
  }
}

export const getFreindRequestsHandler = async (req: Request, res: Response) => {
  try {
  } catch (error) {
    return res.status(400).json({})
  }
}

export const postFreindRequestHandler = async (req: Request, res: Response) => {
  try {
    const _id = req.user?._id as string
    const userObjectId = new mongoose.Types.ObjectId(_id)
    const { freindRequestorId } = req.body

    if (freindRequestorId) return res.status(400).json({})
    const freindRequestorObjectId = new mongoose.Types.ObjectId(freindRequestorId)

    const userConnections = await ConnectionModel.findOne({ _id: userObjectId })
    const isContainSendedFreindRequest = userConnections?.sendedFreindRequest.some(
      (request) => request.userId == freindRequestorId,
    )
    if (isContainSendedFreindRequest) return res.status(400).json({ isValid: false })
    const isContainReceivedFreindRequest = userConnections?.receivedFreindRequest.some(
      (request) => request.userId == freindRequestorId,
    )
    if (isContainReceivedFreindRequest) return res.status(400).json({ isValid: false })

    await ConnectionModel.findOneAndUpdate(
      { _id: userObjectId },
      { $push: { sendedFreindRequest: { userId: freindRequestorId, status: "pending" } } },
    )
    await ConnectionModel.findOneAndUpdate(
      { _id: freindRequestorObjectId },
      { $push: { receivedFreindRequest: { userId: freindRequestorId, status: "pending" } } },
    )
    return res.status(200).json({ isValid: true })
  } catch (error) {
    return res.status(400).json({})
  }
}

export const updateFreindRequestHandler = async (req: Request, res: Response) => {}
