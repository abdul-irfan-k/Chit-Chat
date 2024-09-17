import { Request, Response } from "express"
import GroupCallRoomModel from "../model/mongoose/meeting-model/group-meetingn-model"
import { generateRandomUUID } from "../util/random-text-generator"
import { v4 as uuidv4 } from "uuid"
import CallRoomModel from "../model/mongoose/meeting-model/meeting-model"
import mongoose from "mongoose"

export const createGroupVideoCallHandler = async (req: Request, res: Response) => {
  try {
    const { _id: userId } = req.user as userInterface

    const referenceId = generateRandomUUID(9)
    const peerId = uuidv4()
    const callRoomId = uuidv4()

    await GroupCallRoomModel.createVideoCallRoom({ callRoomId, peerId, referenceId, userId })
    return res.status(200).json({
      isCreated: true,
      callRoomId,
      peerId,
      referenceId,
      adminDetail: { userId: userId },
      callInitiator: { userId: userId },
    })
  } catch (error) {
    return res.status(400).json({ isValid: false })
  }
}

export const findMeetingByCodeHandler = (req: Request, res: Response) => {
  try {
    const {} = req.body
  } catch (error) {}
}

export const getAllCallLogsHandler = async (req: Request, res: Response) => {
  try {
    const { _id } = req.user as userInterface
    const userObjectId = new mongoose.Types.ObjectId(_id)

    const callLogs = await CallRoomModel.aggregate([
      { $match: { $expr: { $in: [userObjectId, "$participants"] } } },
      {
        $lookup: {
          from: "users",
          let: { chatRoomId: "$chatRoomId" },
          localField: "participants",
          foreignField: "_id",
          as: "participants",
          pipeline: [
            { $match: { _id: { $ne: userObjectId } } },
            { $project: { name: 1, _id: 1, userId: 1, profileImageUrl: 1, chatRoomId: "$$chatRoomId" } },
          ],
        },
      },
      {
        $addFields: {
          isIncomingCall: { $cond: [{ $eq: [userObjectId, "$callIntiatorUserId"] }, true, false] },
          startTime: "$createdAt",
          isMissedCall: { $cond: [{ $eq: ["$callStatus", "ended"] }, false, true] },
        },
      },
      { $sort: { createdAt: -1 } },
    ])
    return res.json(callLogs)
  } catch (error) {
    console.log(error)
    return res.status(400).json({})
  }
}

export const getChatRoomCallLogsHandler = async (req: Request, res: Response) => {
  try {
    const chatRoomId = req.params.chatRoomId
    console.log(chatRoomId)
    const _id = req.user?._id as string
    const userObjectId = new mongoose.Types.ObjectId(_id)

    const callLogs = await CallRoomModel.aggregate([
      { $match: { chatRoomId: chatRoomId } },

      {
        $addFields: {
          isIncomingCall: { $cond: [{ $eq: [userObjectId, "$callIntiatorUserId"] }, true, false] },
          startTime: "$createdAt",
          isMissedCall: { $cond: [{ $eq: ["$callStatus", "ended"] }, false, true] },
        },
      },
      { $sort: { createdAt: -1 } },
    ])
    console.log(callLogs)
    return res.json(callLogs)
  } catch (error) {
    return res.status(400).json({})
  }
}
