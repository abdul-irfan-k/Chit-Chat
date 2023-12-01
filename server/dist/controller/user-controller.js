var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import User from "../model/mongoose/user-model.js";
import { ACESSTOKENNOTPROIVIDED, INVALIDCOMFIRMPASSWORD, INVALIDOTP, INVALIDPASSWORD, OTPRECORDNOTFOUND, USERALREADEXIST, USERNOTFOUND, USERNOTGLOGEDIN, } from "../constants/constants.js";
import { createJwtTokenHandler } from "../util/jwt.js";
import { assignCookiesHandler } from "../util/cookies.js";
import Otp from "../model/mongoose/otp-model.js";
import otpGenerator from "otp-generator";
import { nodeMailerSendEmailer } from "../util/node-mailer.js";
import { getOtpEmailSubject } from "../util/email-subject.js";
import { getOtpEmailTemplate } from "../util/email-template.js";
import axios from "axios";
import jwt from "jsonwebtoken";
import ConnectionModel from "../model/mongoose/connections-model.js";
import mongoose from "mongoose";
import UserModel from "../model/mongoose/user-model.js";
// import { mongo } from "mongoose"
export const signUpUserHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, userId, password, confirmPassword } = req.body;
        const passwordMatched = password == confirmPassword;
        if (!passwordMatched)
            return res
                .status(400)
                .json({ isValid: false, errorType: INVALIDCOMFIRMPASSWORD, errorMessage: "invalid comfirm password" });
        const existingUser = yield User.findOne({ userId });
        if (existingUser != null)
            return res.status(400).json({ isValid: false, errorType: USERALREADEXIST, errorMessage: "user already exist" });
        const user = new User({ name, email, userId, password });
        yield user.save();
        const userConnection = new ConnectionModel({ userId: user._id });
        yield userConnection.save();
        const { token: authToken } = yield createJwtTokenHandler({
            _id: user._id.toString(),
            email: user.email,
            expiresIn: "1 days",
            tokenType: "authToken",
        });
        const { token: refreshToken } = yield createJwtTokenHandler({
            _id: user._id.toString(),
            email: user.email,
            expiresIn: "1 days",
            tokenType: "refreshToken",
        });
        assignCookiesHandler({
            res,
            token: authToken,
            expires: "1d",
            tokenName: "authToken",
        });
        assignCookiesHandler({
            res,
            token: refreshToken,
            expires: "1d",
            tokenName: "refreshToken",
        });
        return res.status(200).json({ isValid: true, name: user.name, email: user.email });
    }
    catch (error) {
        console.log(error);
    }
});
export const loginUserHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const user = yield User.findOne({ email });
        if (user == null)
            return res.status(400).json({ isValid: false, errorType: USERNOTFOUND });
        const isCorrectPassword = yield user.checkIsCorrectPassword(password);
        if (!isCorrectPassword)
            return res.status(400).json({ isValid: false, errorType: INVALIDPASSWORD });
        const { token: authToken } = yield createJwtTokenHandler({
            _id: user._id.toString(),
            email: user.email,
            expiresIn: "1 days",
            tokenType: "authToken",
        });
        const { token: refreshToken } = yield createJwtTokenHandler({
            _id: user._id.toString(),
            email: user.email,
            expiresIn: "1 days",
            tokenType: "refreshToken",
        });
        yield assignCookiesHandler({
            res,
            token: authToken,
            tokenName: "authToken",
            expires: "1d",
        });
        yield assignCookiesHandler({
            res,
            token: refreshToken,
            tokenName: "refreshToken",
            expires: "1d",
        });
        return res.status(200).json({ isValid: true, isLogedIn: true });
    }
    catch (error) {
        console.log(error);
    }
});
export const logoutUserHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield res.clearCookie("authToken");
        yield res.clearCookie("refreshToken");
        return res.status(200).json({ isLogedOut: true });
    }
    catch (error) {
        console.log(error);
    }
});
export const checkUserIdAvilableHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.body;
        const user = yield User.findOne({ userId });
        if (user == null)
            return res.status(400).json({ isValid: false, errorType: USERALREADEXIST });
        return res.status(200).json({ isValid: true });
    }
    catch (error) {
        return res.status(400).json({ isValid: false });
    }
});
export const verifyUserIsLogedInHandler = (req, res) => {
    try {
        const { email, _id } = req.user;
        const isAvailableUserDetail = _id != undefined && email != undefined;
        if (isAvailableUserDetail)
            return res.status(200).json({ isValid: true, isLogedIn: true });
        return res.status(400).json({ isValid: false, isLogedIn: false, errorType: USERNOTGLOGEDIN });
    }
    catch (error) {
        return res.status(400).json({ isValid: false });
    }
};
export const getUserDetailHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { _id } = req.user;
        const userDetail = yield User.getUserDetail(_id);
        return res.status(200).json(userDetail);
    }
    catch (error) {
        return res.status(400).json({ isValid: false });
    }
});
export const verifyUserEmailHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { otp } = req.body;
        const { email, _id } = req.user;
        const isAvailableUserDetail = _id != undefined && email != undefined;
        if (!isAvailableUserDetail)
            return res.status(400).json({ isValid: false, errorType: USERNOTGLOGEDIN });
        const avilableOtp = yield Otp.findOne({ email });
        if (avilableOtp == null)
            return res.status(400).json({ isValid: false, errorType: OTPRECORDNOTFOUND });
        const isCorrectOtp = yield avilableOtp.verifyOtp(otp);
        if (!isCorrectOtp)
            return res.status(400).json({ isValid: false, errorType: INVALIDOTP });
        yield Otp.deleteMany({ email });
        res.status(200).json({ isValid: true, isCorrectOtp: true });
    }
    catch (error) {
        console.log(error);
    }
});
export const sendVerifyUserEmailHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, _id } = req.user || {};
        const isAvailableUserDetail = _id != undefined && email != undefined;
        if (!isAvailableUserDetail)
            return res.status(200).json({ isValid: false, isSendedOtp: false, errorType: USERNOTGLOGEDIN });
        const generatedOtp = yield otpGenerator.generate(6, {
            upperCaseAlphabets: false,
            specialChars: false,
            lowerCaseAlphabets: false,
        });
        if (typeof generatedOtp != "string")
            return;
        yield Otp.deleteMany({ email });
        const otp = new Otp({
            otp: generatedOtp,
            createdAt: new Date(),
            email,
            verificationType: "asdf",
        });
        yield otp.save();
        const subject = getOtpEmailSubject();
        const html = getOtpEmailTemplate({ otp: generatedOtp, userName: "irfan" });
        const { isSendedEmail, isValid } = yield nodeMailerSendEmailer({
            email,
            subject,
            html,
            text: "hello",
        });
        if (isSendedEmail && isValid)
            return res.status(200).json({ isValid, isSendedEmail });
    }
    catch (error) {
        console.log(error);
    }
});
export const changePasswordHanldler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { oldPassword, newPassword, newComfirmPassword } = req.body;
        const { _id } = req.user;
        const isCorrectComfirtPassword = newPassword == newComfirmPassword;
        if (!isCorrectComfirtPassword) {
            return res.status(400).json({ isValid: false, isChangedPassword: false, errorType: INVALIDCOMFIRMPASSWORD });
        }
        const userDetail = yield User.findOne({ _id });
        if (userDetail == null) {
            return res.status(400).json({ isValid: false, isChangedPassword: false, errorType: USERNOTGLOGEDIN });
        }
        const isCorrectPassword = yield userDetail.checkIsCorrectPassword(oldPassword);
        if (!isCorrectPassword) {
            return res.status(400).json({ isValid: false, isChangedPassword: false, errorType: INVALIDPASSWORD });
        }
        yield userDetail.changePassword(newPassword);
        return res.status(200).json({ isValid: true, isCorrectPassword: true, isChnagedPassword: true });
    }
    catch (error) {
        console.log("user error ", error);
    }
});
export const requestChangePasswordWithOtpHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        const _id = (_a = req.user) === null || _a === void 0 ? void 0 : _a._id;
        const email = (_b = req.user) === null || _b === void 0 ? void 0 : _b.email;
        const { email: emailBody } = req.body;
        const isAvailableUserData = _id != undefined && email != undefined;
        const mongooseParams = isAvailableUserData ? { _id, email } : { email: emailBody };
        const user = yield User.findOne(mongooseParams);
        if (user == null)
            return res.status(400).json({ isValid: false, errorType: USERNOTFOUND });
        const generatedOtp = yield otpGenerator.generate(6, {
            upperCaseAlphabets: false,
            specialChars: false,
            lowerCaseAlphabets: false,
        });
        if (typeof generatedOtp != "string")
            return;
        yield Otp.deleteMany({ email });
        const otp = new Otp({
            otp: generatedOtp,
            createdAt: new Date(),
            email,
            verificationType: "asdf",
        });
        yield otp.save();
        const subject = getOtpEmailSubject();
        const html = getOtpEmailTemplate({ otp: generatedOtp, userName: "irfan" });
        const { isSendedEmail, isValid } = yield nodeMailerSendEmailer({
            email: user.email,
            subject,
            html,
            text: "hello",
        });
        if (isSendedEmail && isValid)
            return res.status(200).json({ isValid, isSendedEmail });
    }
    catch (error) {
        console.log(error);
    }
});
export const changePasswordWithOtpHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _c, _d;
    try {
        const _id = (_c = req.user) === null || _c === void 0 ? void 0 : _c._id;
        const email = (_d = req.user) === null || _d === void 0 ? void 0 : _d.email;
        const { email: emailBody, otp, newPassword, newComfirmPassword } = req.body;
        const isAvailableUserData = _id != undefined && email != undefined;
        const mongooseParams = isAvailableUserData ? { email } : { email: emailBody };
        const availableOtp = yield Otp.findOne(mongooseParams);
        if (availableOtp == null)
            return res.status(400).json({ isValid: false, errorType: OTPRECORDNOTFOUND });
        const isCorrectOtp = yield availableOtp.verifyOtp(otp);
        if (!isCorrectOtp)
            return res.status(400).json({ isValid: false, errorType: INVALIDOTP });
        const isCorrectComfirtPassword = newPassword == newComfirmPassword;
        if (!isCorrectComfirtPassword)
            return res.status(400).json({ isValid: false, errorType: INVALIDCOMFIRMPASSWORD });
        yield User.findOneAndUpdate(mongooseParams, { password: newPassword });
        return res.status(200).json({ isValid: true, isUpdatedPassword: true });
    }
    catch (error) {
        console.log(error);
    }
});
export const googleLoginWithAcessTokenHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log(req.url);
        const { acessToken } = req.body;
        if (acessToken == undefined)
            return res.status(400).json({ isValid: false, errorType: ACESSTOKENNOTPROIVIDED });
        console.log("acess token", acessToken);
        const { data: fetchedUserData } = yield axios.get("https://www.googleapis.com/oauth2/v1/userinfo", {
            headers: { Authorization: `Bearer ${acessToken}` },
        });
        const userDetails = yield User.findOne({ email: fetchedUserData.email });
        if (userDetails == null)
            return res.status(400).json({ isValid: false, errorType: USERNOTFOUND });
        const { token: authToken } = yield createJwtTokenHandler({
            _id: userDetails._id.toString(),
            email: userDetails.email,
            expiresIn: "1 days",
            tokenType: "authToken",
        });
        const { token: refreshToken } = yield createJwtTokenHandler({
            _id: userDetails._id.toString(),
            email: userDetails.email,
            expiresIn: "1 days",
            tokenType: "refreshToken",
        });
        assignCookiesHandler({
            res,
            token: authToken,
            expires: "1d",
            tokenName: "authToken",
        });
        assignCookiesHandler({
            res,
            token: refreshToken,
            expires: "1d",
            tokenName: "refreshToken",
        });
        console.log("user detail", userDetails);
        return res.status(200).json({ isValid: true });
    }
    catch (error) {
        console.log("error");
        return res.status(400).json({ isValid: false });
    }
});
export const loginWithGoogleWithCredintialsHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { credential } = req.body;
        const decodedData = jwt.decode(credential);
        if (decodedData == null || typeof decodedData === "string")
            return res.status(400).json({ isValid: false });
        const userDetail = yield User.findOne({ email: decodedData.email });
        if (userDetail == null)
            return res.status(400).json({ isVaild: false, errorType: USERNOTFOUND });
        const { token: authToken } = yield createJwtTokenHandler({
            _id: userDetail._id.toString(),
            email: userDetail.email,
            expiresIn: "1 days",
            tokenType: "authToken",
        });
        const { token: refreshToken } = yield createJwtTokenHandler({
            _id: userDetail._id.toString(),
            email: userDetail.email,
            expiresIn: "1 days",
            tokenType: "refreshToken",
        });
        assignCookiesHandler({
            res,
            token: authToken,
            expires: "1d",
            tokenName: "authToken",
        });
        assignCookiesHandler({
            res,
            token: refreshToken,
            expires: "1d",
            tokenName: "refreshToken",
        });
        return res.status(200).json({ isValid: true });
    }
    catch (error) {
        console.log(error);
    }
});
export const loginWithGithubHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { code } = req.body;
        console.log("login with github", code);
        const { GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET, FRONTEND_URL } = process.env;
        axios
            .post("https://github.com/login/oauth/access_token", {
            client_id: GITHUB_CLIENT_ID,
            client_secret: GITHUB_CLIENT_SECRET,
            redirect_uri: `${FRONTEND_URL + "/authentication" || "http://localhost:3000/authentication"}`,
            code,
        })
            .then(({ data }) => {
            const params = Object.fromEntries(new URLSearchParams(data));
            if (!params.access_token)
                return res.status(400).json({});
            axios
                .get("https://api.github.com/user/emails", { headers: { Authorization: `token ${params.access_token}` } })
                .then(({ data }) => __awaiter(void 0, void 0, void 0, function* () {
                const userDetail = yield User.findOne({ email: data[0].email });
                if (userDetail == null)
                    return res.status(400).json({ isValid: false, errorType: USERNOTFOUND });
                const { token: authToken } = yield createJwtTokenHandler({
                    _id: userDetail._id.toString(),
                    email: userDetail.email,
                    expiresIn: "1 days",
                    tokenType: "authToken",
                });
                const { token: refreshToken } = yield createJwtTokenHandler({
                    _id: userDetail._id.toString(),
                    email: userDetail.email,
                    expiresIn: "1 days",
                    tokenType: "refreshToken",
                });
                assignCookiesHandler({
                    res,
                    token: authToken,
                    expires: "1d",
                    tokenName: "authToken",
                });
                assignCookiesHandler({
                    res,
                    token: refreshToken,
                    expires: "1d",
                    tokenName: "refreshToken",
                });
                return res.status(200).json({ isValid: true });
            }))
                .catch((err) => console.log(err));
        });
    }
    catch (error) {
        console.log(error);
    }
});
// send freind request to another user
export const sendFreindRequestHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { _id } = req.user;
        const { requestedFreindUserId } = req.body;
        if (requestedFreindUserId == undefined)
            return;
        const userObjectId = new mongoose.Types.ObjectId(_id);
        const requestedFreindUserObjectId = new mongoose.Types.ObjectId(requestedFreindUserId);
        // adding request sender user database
        yield ConnectionModel.updateOne({
            _id: userObjectId,
            sendedFreindRequest: { $not: { $elemMatch: { userId: requestedFreindUserObjectId } } },
        }, {
            $push: { sendedFreindRequest: { userId: requestedFreindUserObjectId } },
        });
        // adding to record to the request receiver database
        yield ConnectionModel.updateOne({
            _id: requestedFreindUserObjectId,
            receivedFreindRequest: { $not: { $elemMatch: { userId: userObjectId } } },
        }, {
            $push: { receivedFreindRequest: { userId: userObjectId } },
        });
    }
    catch (error) {
        return res.status(400).json({});
    }
});
// accept the freind request
export const acceptFreindRequestHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { _id } = req.user;
        const { acceptedFreindUserId } = req.body;
        if (acceptedFreindUserId == undefined)
            return res.status(400).json({});
        const userObjectId = new mongoose.Types.ObjectId(_id);
        const acceptedFreindUserObjectId = new mongoose.Types.ObjectId(acceptedFreindUserId);
        yield ConnectionModel.updateOne({
            _id: userObjectId,
        }, {
            $pull: { receivedFreindRequest: { userId: acceptedFreindUserObjectId } },
            $push: { freinds: { userId: acceptedFreindUserObjectId } },
        });
        yield ConnectionModel.updateOne({
            _id: acceptedFreindUserObjectId,
        }, {
            $pull: { sendedFreindRequest: { userId: userObjectId } },
            $push: { freinds: { userId: userObjectId } },
        });
    }
    catch (error) {
        return res.status(400).json({});
    }
});
(req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { _id } = req.user;
        const { acceptedFreindUserId } = req.body;
        if (acceptedFreindUserId == undefined)
            return res.status(400).json({});
        const userObjectId = new mongoose.Types.ObjectId(_id);
        const acceptedFreindUserObjectId = new mongoose.Types.ObjectId(acceptedFreindUserId);
        yield ConnectionModel.updateOne({
            _id: userObjectId,
        }, {
            $pull: { receivedFreindRequest: { userId: acceptedFreindUserObjectId } },
        });
        yield ConnectionModel.updateOne({
            _id: acceptedFreindUserObjectId,
        }, {
            $pull: { sendedFreindRequest: { userId: userObjectId } },
        });
    }
    catch (error) {
        return res.status(400).json({});
    }
});
// get user details on search
export const getUserDetailsByUserIdHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { _id } = req.user;
        // const { userId } = req.body
        const userObjectId = new mongoose.Types.ObjectId(_id);
        console.log("user object id", userObjectId);
        const usersDetails = yield UserModel.aggregate([
            { $match: { _id: { $ne: userObjectId } } },
            { $project: { name: 1, email: 1, userId: 1 } },
        ]);
        // debugger;
        return res.status(200).json(usersDetails);
    }
    catch (error) {
        return res.status(400).json({});
    }
});
