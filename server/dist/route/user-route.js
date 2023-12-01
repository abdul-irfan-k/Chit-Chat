import express from "express";
import { acceptFreindRequestHandler, changePasswordHanldler, changePasswordWithOtpHandler, checkUserIdAvilableHandler, getUserDetailHandler, getUserDetailsByUserIdHandler, googleLoginWithAcessTokenHandler, loginUserHandler, loginWithGithubHandler, loginWithGoogleWithCredintialsHandler, logoutUserHandler, requestChangePasswordWithOtpHandler, sendFreindRequestHandler, sendVerifyUserEmailHandler, signUpUserHandler, verifyUserEmailHandler, verifyUserIsLogedInHandler, } from "../controller/user-controller.js";
import { checkisLogedInMiddleware } from "../middleware/user-middleware.js";
const router = express.Router();
router.post("/signUp", signUpUserHandler);
router.post("/login", loginUserHandler);
router.post("/logout", checkisLogedInMiddleware, logoutUserHandler);
router.post("/verifyUserIsLogedIn", checkisLogedInMiddleware, verifyUserIsLogedInHandler);
router.post("/getUserDetail", checkisLogedInMiddleware, getUserDetailHandler);
router.post("/checkUserIdAvilable", checkUserIdAvilableHandler);
router.post("/sendVerifyEmail", checkisLogedInMiddleware, sendVerifyUserEmailHandler);
router.post("/verifyEmail", checkisLogedInMiddleware, verifyUserEmailHandler);
router.post("/changePassword", checkisLogedInMiddleware, changePasswordHanldler);
router.post("/changePasswordWithOtp", checkisLogedInMiddleware, changePasswordWithOtpHandler);
router.post("/requestChangePasswordWithOtp", checkisLogedInMiddleware, requestChangePasswordWithOtpHandler);
// fetching the user list in search bar
router.post("/getUserDetailByUserId", checkisLogedInMiddleware, getUserDetailsByUserIdHandler);
// login with social media
router.post("/googleLoginWithAcessToken", googleLoginWithAcessTokenHandler);
router.post("/loginWithGoogleWithCredintials", loginWithGoogleWithCredintialsHandler);
router.post("/loginWithGithub", loginWithGithubHandler);
// send the freind list
router.post("/sendFreindRequest", checkisLogedInMiddleware, sendFreindRequestHandler);
router.post("/acceptFreindRequest", checkisLogedInMiddleware, acceptFreindRequestHandler); // accept the freind request
router.post("/rejectFreindRequest", checkisLogedInMiddleware); // reject freind request
export default router;
