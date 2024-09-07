import express from "express"

import {
  createGroupHandler,
  getAllChatGroupsHandler,
  getAllChatUsersHandler,
  getChatRoomMessageHandler,
  getChatRoomMessageReactionHandler,
  getFreindRequestsHandler,
  getGroupChatRoomMessageHandler,
  postFreindRequestHandler,
} from "../controller/chat-room-controller"
import { checkisLogedInMiddleware } from "../middleware/user-middleware"

const router = express.Router()

router.all("*", (req, res, next) => {
  console.log("all")
  next()
})

router.get("/freinds", checkisLogedInMiddleware, getFreindRequestsHandler)
router.post("/freindRequest", checkisLogedInMiddleware, postFreindRequestHandler)
router.put("/rejectfreindRequest", checkisLogedInMiddleware)
router.put("/acceptfreindRequest", checkisLogedInMiddleware)

router.post("/getUserChatRoomId")
router.post("/getAllChatRoom")
router.post("/getAllChatUsers", checkisLogedInMiddleware, getAllChatUsersHandler)
router.post("/getAllChatGroups", checkisLogedInMiddleware, getAllChatGroupsHandler)
router.post("/changeGroupSetting")
router.post("/changeGroupDetail")

// create the group
router.post("/createGroup", checkisLogedInMiddleware, createGroupHandler)
router.post("/acceptGroup", checkisLogedInMiddleware) // member accept the group
router.post("/joinGroupWithUrl")
router.post("/leaveGroup", checkisLogedInMiddleware) // member accept the group
router.post("/updateGroupSetting")
router.post("/deleteGroup")

router.post("/getChatRoomMessage", checkisLogedInMiddleware, getChatRoomMessageHandler)
router.post("/getGroupChatRoomMessage", checkisLogedInMiddleware, getGroupChatRoomMessageHandler)
router.post("/getChatRoomMessageReaction", getChatRoomMessageReactionHandler)
router.post("/getGroupChatRoomMessageReaction", checkisLogedInMiddleware)

export default router
