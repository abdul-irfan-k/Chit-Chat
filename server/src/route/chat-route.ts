import express from "express"

import {
  createGroupHandler,
  getAllChatGroupsHandler,
  getAllChatUsersHandler,
  getChatRoomMessageHandler,
  getChatRoomMessageReactionHandler,
  getFreindRequestsHandler,
  getGroupChatRoomMessageHandler,
  getGroupDetailHandler,
  groupAddMembersHandler,
  groupRemoveMemberHandler,
  postFreindRequestHandler,
  putFreindRequestsHandler,
  updateGroupHandler,
  updateGroupSettingHandler,
} from "../controller/chat-room-controller"
import { checkisLogedInMiddleware } from "../middleware/user-middleware"
import { adminOnlyAccess } from "../middleware/group-admin"

const router = express.Router()

router.all("*", (req, res, next) => {
  console.log("all")
  next()
})

router.get("/friends", checkisLogedInMiddleware, getFreindRequestsHandler)
router.post("/friendRequest", checkisLogedInMiddleware, postFreindRequestHandler)
router.put("/acceptfriendRequest", checkisLogedInMiddleware, putFreindRequestsHandler)
router.put("/rejectfriendRequest", checkisLogedInMiddleware, putFreindRequestsHandler)

router.post("/getUserChatRoomId")
router.post("/getAllChatRoom")
router.post("/getAllChatUsers", checkisLogedInMiddleware, getAllChatUsersHandler)
router.post("/getAllChatGroups", checkisLogedInMiddleware, getAllChatGroupsHandler)
router.post("/changeGroupSetting")
router.post("/changeGroupDetail")

// ######## Group Routes ########
router.get("/groups/:groupId", checkisLogedInMiddleware, getGroupDetailHandler)
router.post("/groups", checkisLogedInMiddleware, createGroupHandler)

router.put("/groups/:groupId", checkisLogedInMiddleware, adminOnlyAccess, updateGroupHandler)
router.put("/groups/:groupId/settings", checkisLogedInMiddleware, adminOnlyAccess, updateGroupSettingHandler)
router.post("/groups/:groupId/addMembers", checkisLogedInMiddleware, adminOnlyAccess, groupAddMembersHandler)
router.post("/groups/:groupId/removeMembers", checkisLogedInMiddleware, adminOnlyAccess, groupRemoveMemberHandler)
router.delete("/groups/:groupId", checkisLogedInMiddleware, adminOnlyAccess)

router.post("/groups/:groupId/joinByUrl")
router.post("/groups/:groupId/join", checkisLogedInMiddleware)
router.post("/group/:groupId/leave", checkisLogedInMiddleware)

router.post("/chatroom/messages", checkisLogedInMiddleware, getChatRoomMessageHandler)
router.post("/groupChatroom/messages", checkisLogedInMiddleware, getGroupChatRoomMessageHandler)
router.post("/getChatRoomMessageReaction", getChatRoomMessageReactionHandler)
router.post("/getGroupChatRoomMessageReaction", checkisLogedInMiddleware)

export default router
