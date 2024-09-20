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
import { verifyUserLoggedIn } from "../middleware/user-middleware"
import { adminOnlyAccess } from "../middleware/group-admin"

const router = express.Router()

router.all("*", (req, res, next) => {
  console.log("all")
  next()
})

router.get("/friends", verifyUserLoggedIn, getFreindRequestsHandler)
router.post("/friendRequest", verifyUserLoggedIn, postFreindRequestHandler)
router.put("/acceptfriendRequest", verifyUserLoggedIn, putFreindRequestsHandler)
router.put("/rejectfriendRequest", verifyUserLoggedIn, putFreindRequestsHandler)

router.post("/getAllChatUsers", verifyUserLoggedIn, getAllChatUsersHandler)
router.post("/getAllChatGroups", verifyUserLoggedIn, getAllChatGroupsHandler)

// ######## Group Routes ########
router.get("/groups/:groupId", verifyUserLoggedIn, getGroupDetailHandler)
router.post("/groups", verifyUserLoggedIn, createGroupHandler)

router.put("/groups/:groupId", verifyUserLoggedIn, adminOnlyAccess, updateGroupHandler)
router.put("/groups/:groupId/settings", verifyUserLoggedIn, adminOnlyAccess, updateGroupSettingHandler)
router.post("/groups/:groupId/addMembers", verifyUserLoggedIn, adminOnlyAccess, groupAddMembersHandler)
router.post("/groups/:groupId/removeMembers", verifyUserLoggedIn, adminOnlyAccess, groupRemoveMemberHandler)
router.delete("/groups/:groupId", verifyUserLoggedIn, adminOnlyAccess)

router.post("/groups/:groupId/joinByUrl")
router.post("/groups/:groupId/join", verifyUserLoggedIn)
router.post("/group/:groupId/leave", verifyUserLoggedIn)

router.post("/chatroom/messages", verifyUserLoggedIn, getChatRoomMessageHandler)
router.post("/groupChatroom/messages", verifyUserLoggedIn, getGroupChatRoomMessageHandler)
router.post("/chatroom/messages/reaction", verifyUserLoggedIn, getChatRoomMessageReactionHandler)
router.post("/getGroupChatRoomMessageReaction", verifyUserLoggedIn)

export default router
