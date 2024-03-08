import { Request, Response } from "express"
import GroupCallRoomModel from "../model/mongoose/meeting-model/group-meetingn-model.js"
import { generateRandomUUID } from "../util/random-text-generator.js"
import { v4 as uuidv4 } from "uuid"
import CallRoomModel from "../model/mongoose/meeting-model/meeting-model.js"
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
    // const { _id } = req.user as userInterface
    const { skip, step, limit, sort, _id } = req.body
    const userObjectId = new mongoose.Types.ObjectId(_id)

    const callLogs = await CallRoomModel.aggregate([
      {
        $match: {
          $expr: { $in: [_id, "$participants"] },
        },
      },
    ])
    return res.json(callLogs)
  } catch (error) {
    console.log(error)
    return res.status(400).json({})
  }
}
