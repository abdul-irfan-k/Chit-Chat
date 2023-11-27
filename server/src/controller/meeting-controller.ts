import { Request, Response } from "express"
import GroupCallRoomModel from "../model/mongoose/meeting-model/video-group-call-room-model.js"
import { generateRandomUUID } from "../util/random-text-generator.js"
import { v4 as uuidv4 } from "uuid"

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
