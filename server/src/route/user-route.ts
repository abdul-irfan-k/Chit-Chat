import express from "express"
import {
    checkUserIdAvilableHandler,
  loginUserHandler,
  signUpUserHandler,
  verifyUserIsLogedInHandler,
} from "../controller/user-controller.js"
import { checkisLogedInMiddleware } from "../middleware/user-middleware.js"
const router = express.Router()

router.post("/signUp", signUpUserHandler)
router.post("/signUp", loginUserHandler)
router.post("/verifyUserIsLogedIn",checkisLogedInMiddleware,verifyUserIsLogedInHandler)

router.post("/checkUserIdAvilable",checkUserIdAvilableHandler)
router.post("/verifyEmail")

export default router
