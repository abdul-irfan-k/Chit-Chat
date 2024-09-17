import express from "express"
import multer from "multer"
import path from "path"
import { fileURLToPath } from "node:url"

import {
  acceptFreindRequestHandler,
  changePasswordHanldler,
  changePasswordWithOtpHandler,
  checkUserIdAvilableHandler,
  getUserDetailHandler,
  getUserDetailsByUserIdHandler,
  gettingStartedSettingSetupHandler,
  googleLoginWithAcessTokenHandler,
  loginUserHandler,
  loginWithGithubHandler,
  loginWithGoogleWithCredintialsHandler,
  logoutUserHandler,
  requestChangePasswordWithOtpHandler,
  searchUserHandler,
  sendFreindRequestHandler,
  sendVerifyUserEmailHandler,
  signUpUserHandler,
  updateUserDetailHandler,
  updateUserProfileHandler,
  verifyUserEmailHandler,
  verifyUserIsLogedInHandler,
} from "../controller/user-controller"
import { verifyUserLoggedIn } from "../middleware/user-middleware"
const router = express.Router()

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../", "../", "public", "upload"))
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9)
    cb(null, file.fieldname + "-" + uniqueSuffix + "." + file.mimetype.split("/")[1])
  },
})
const upload = multer({ storage })

router.post("/signUp", signUpUserHandler)
router.post("/login", loginUserHandler)
router.post("/logout", verifyUserLoggedIn, logoutUserHandler)

router.post("/verifyUserIsLogedIn", verifyUserLoggedIn, verifyUserIsLogedInHandler)
router.post("/getUserDetail", verifyUserLoggedIn, getUserDetailHandler)

router.post("/sendVerifyEmail", verifyUserLoggedIn, sendVerifyUserEmailHandler)
router.post("/verifyEmail", verifyUserLoggedIn, verifyUserEmailHandler)

router.post("/changePassword", verifyUserLoggedIn, changePasswordHanldler)
router.post("/changePasswordWithOtp", verifyUserLoggedIn, changePasswordWithOtpHandler)
router.post("/requestChangePasswordWithOtp", verifyUserLoggedIn, requestChangePasswordWithOtpHandler)
router.post("/forgotPassword", requestChangePasswordWithOtpHandler)

// update user details
router.post("/updateUserProfile", verifyUserLoggedIn, upload.single("profileImage"), updateUserProfileHandler)
router.post("/updateUserDetail", verifyUserLoggedIn, upload.single("profileImage"), updateUserDetailHandler)
router.post("/updateUserEmail")

// fetching the user list in search bar
router.post("/getUserDetailByUserId", verifyUserLoggedIn, getUserDetailsByUserIdHandler)
router.post("/search", verifyUserLoggedIn, searchUserHandler)

// login with social media
router.post("/googleLoginWithAcessToken", googleLoginWithAcessTokenHandler)
router.post("/loginWithGoogleWithCredintials", loginWithGoogleWithCredintialsHandler)
router.post("/loginWithGithub", loginWithGithubHandler)

// welco0me page setting setup
router.post("/gettingStartedSettingSetup", verifyUserLoggedIn, gettingStartedSettingSetupHandler)

router.post("/updateSetting", verifyUserLoggedIn)
export default router
