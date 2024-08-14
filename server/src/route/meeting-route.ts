import express from "express"
import { checkisLogedInMiddleware } from "../middleware/user-middleware"
import { createGroupVideoCallHandler, getAllCallLogsHandler } from "../controller/meeting-controller"

const router = express.Router()

router.post("/createGroupVideoCall", checkisLogedInMiddleware, createGroupVideoCallHandler)
router.post("/findMeetingByCode", checkisLogedInMiddleware)
// router.post("/getAllCallLogs",checkisLogedInMiddleware,getAllCallLogsHandler)
router.post("/getCallLogs", getAllCallLogsHandler)

export default router
