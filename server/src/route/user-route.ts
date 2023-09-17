import express from "express"
import {
  changePasswordHanldler,
  changePasswordWithOtpHandler,
  checkUserIdAvilableHandler,
  loginUserHandler,
  logoutUserHandler,
  requestChangePasswordWithOtpHandler,
  sendVerifyUserEmailHandler,
  signUpUserHandler,
  verifyUserEmailHandler,
  verifyUserIsLogedInHandler,
} from "../controller/user-controller.js"
import { checkisLogedInMiddleware } from "../middleware/user-middleware.js"
const router = express.Router()

router.post("/signUp", signUpUserHandler)
router.post("/login", loginUserHandler)
router.post("/logout",checkisLogedInMiddleware,logoutUserHandler)
router.post("/verifyUserIsLogedIn", checkisLogedInMiddleware, verifyUserIsLogedInHandler)

router.post("/checkUserIdAvilable", checkUserIdAvilableHandler)

router.post("/sendVerifyEmail", checkisLogedInMiddleware, sendVerifyUserEmailHandler)
router.post("/verifyEmail", checkisLogedInMiddleware, verifyUserEmailHandler)

router.post("/changePassword", checkisLogedInMiddleware, changePasswordHanldler)
router.post("/changePasswordWithOtp", checkisLogedInMiddleware, changePasswordWithOtpHandler)
router.post("/requestChangePasswordWithOtp", checkisLogedInMiddleware, requestChangePasswordWithOtpHandler)

export default router
