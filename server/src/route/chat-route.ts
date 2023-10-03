import express from "express"
const router = express.Router()

router.all("*", (req, res, next) => {
  console.log("all")
  next()
})


router.post('/getUserChatRoomId')
router.post("/getAllChatRoom")
router.post("/getChatRoomMessage")

router.post("/sendMessageToUser")
router.post("/sendMessageToGroup")
export default router
