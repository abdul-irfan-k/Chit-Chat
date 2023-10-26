import express from 'express'
import { checkisLogedInMiddleware } from '../middleware/user-middleware.js'

const router = express.Router()


router.post("/create-group-video-call",checkisLogedInMiddleware)

export default router