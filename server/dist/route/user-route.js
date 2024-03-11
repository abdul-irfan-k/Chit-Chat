import express from "express";
import multer from "multer";
import path from "path";
import { fileURLToPath } from "node:url";
import { acceptFreindRequestHandler, changePasswordHanldler, changePasswordWithOtpHandler, checkUserIdAvilableHandler, getUserDetailHandler, getUserDetailsByUserIdHandler, gettingStartedSettingSetupHandler, googleLoginWithAcessTokenHandler, loginUserHandler, loginWithGithubHandler, loginWithGoogleWithCredintialsHandler, logoutUserHandler, requestChangePasswordWithOtpHandler, sendFreindRequestHandler, sendVerifyUserEmailHandler, signUpUserHandler, updateUserDetailHandler, updateUserProfileHandler, verifyUserEmailHandler, verifyUserIsLogedInHandler, } from "../controller/user-controller.js";
import { checkisLogedInMiddleware } from "../middleware/user-middleware.js";
const router = express.Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, "../", "../", "public", "upload"));
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        cb(null, file.fieldname + "-" + uniqueSuffix + "." + file.mimetype.split("/")[1]);
    },
});
const upload = multer({ storage });
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
router.post("/forgotPassword");
// update user details
router.post("/updateUserProfile", checkisLogedInMiddleware, upload.single("profileImage"), updateUserProfileHandler);
router.post("/updateUserDetail", checkisLogedInMiddleware, upload.single("profileImage"), updateUserDetailHandler);
router.post("/updateUserEmail");
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
// welco0me page setting setup
router.post("/gettingStartedSettingSetup", checkisLogedInMiddleware, gettingStartedSettingSetupHandler);
router.post("/updateSetting", checkisLogedInMiddleware);
export default router;
