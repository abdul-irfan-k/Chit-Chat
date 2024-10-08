import express from "express"
import { verifyUserLoggedIn } from "../middleware/user-middleware"
import {
  createGroupVideoCallHandler,
  getAllCallLogsHandler,
  getChatRoomCallLogsHandler,
} from "../controller/meeting-controller"

const router = express.Router()

router.post("/createGroupVideoCall", verifyUserLoggedIn, createGroupVideoCallHandler)
router.post("/findMeetingByCode", verifyUserLoggedIn)
// router.post("/getAllCallLogs",verifyUserLoggedIn,getAllCallLogsHandler)
router.get("/callLogs", verifyUserLoggedIn, getAllCallLogsHandler)
router.get("/callLogs/:chatRoomId", verifyUserLoggedIn, getChatRoomCallLogsHandler)

export default router
