import { Request, Response } from "express"
import textMessageModel from "../model/mongoose/text-message-model"

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
