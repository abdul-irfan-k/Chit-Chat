import express from "express"
import { checkisLogedInMiddleware } from "../middleware/user-middleware.js"
import { createGroupVideoCallHandler, getAllCallLogsHandler } from "../controller/meeting-controller.js"

const router = express.Router()

router.post("/createGroupVideoCall", checkisLogedInMiddleware, createGroupVideoCallHandler)
router.post("/findMeetingByCode", checkisLogedInMiddleware)
router.post("/getAllCallLogs",checkisLogedInMiddleware,getAllCallLogsHandler)


export default router
