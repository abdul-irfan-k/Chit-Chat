import express from "express"
import { getChatRoomMessageHandler } from "../controller/chat-room-controller.js"
import { checkisLogedInMiddleware } from "../middleware/user-middleware.js"
const router = express.Router()

router.all("*", (req, res, next) => {
  console.log("all")
  next()
})

router.post("/getUserChatRoomId")
router.post("/getAllChatRoom")
router.post("/getChatRoomMessage", checkisLogedInMiddleware, getChatRoomMessageHandler)

router.post("/sendMessageToUser")
router.post("/sendMessageToGroup")
export default router
