import express from "express"
import { checkisLogedInMiddleware } from "../middleware/user-middleware.js"
import { createGroupVideoCallHandler } from "../controller/meeting-controller.js"

const router = express.Router()

router.post("/createGroupVideoCall", checkisLogedInMiddleware, createGroupVideoCallHandler)
router.post("/findMeetingByCode", checkisLogedInMiddleware)

export default router
