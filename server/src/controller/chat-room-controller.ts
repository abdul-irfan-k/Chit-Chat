import { Request, Response } from "express"
import textMessageModel from "../model/mongoose/text-message-model.js"
import ChatRoomModel from "../model/mongoose/chat-room-model.js"

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

export const getChatRoomMessageHandler = async (req: Request, res: Response) => {
  try {
    const { chatRoomId } = req.body
    console.log('chatRoomId',chatRoomId)
    const chatRoomMessages = await ChatRoomModel.getMessageOfChatRoom(chatRoomId)
    return res.status(200).json(chatRoomMessages)
  } catch (error) {
    console.log(error)
    return res.status(400).json({ isValid: false })
    // console.log(error)
  }
}
