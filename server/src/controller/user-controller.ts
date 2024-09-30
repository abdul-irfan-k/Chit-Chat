import { Request, Response } from "express"
import User from "../model/mongoose/user-model"
import {
  ACESSTOKENNOTPROIVIDED,
  FILENOTINCLUEDED,
  INVALIDCOMFIRMPASSWORD,
  INVALIDOTP,
  INVALIDPASSWORD,
  OTPRECORDNOTFOUND,
  USERALREADEXIST,
  USERNOTFOUND,
  USERNOTGLOGEDIN,
} from "../constants/constants"
import { createJwtTokenHandler } from "../util/jwt"
import { assignCookiesHandler } from "../util/cookies"
import Otp from "../model/mongoose/otp-model"
import otpGenerator from "otp-generator"
import { nodeMailerSendEmailer } from "../util/node-mailer"
import { getOtpEmailSubject } from "../util/email-subject"
import { getOtpEmailTemplate } from "../util/email-template"
import axios from "axios"
import jwt from "jsonwebtoken"
import ConnectionModel from "../model/mongoose/connections-model"
import mongoose from "mongoose"
import fs from "fs"
import UserModel from "../model/mongoose/user-model"
import { cloudinaryFileUploadHandler } from "../config/cloudinary"
import UserSettingModel from "../model/mongoose/user-setting-model"

interface MulterRequest extends Request {
  file?: Express.Multer.File | undefined
}

export const signUpUserHandler = async (req: Request, res: Response) => {
  try {
    const { name, email, userId, password, confirmPassword } = req.body
    const passwordMatched = password == confirmPassword
    if (!passwordMatched)
      return res
        .status(400)
        .json({ isValid: false, errorType: INVALIDCOMFIRMPASSWORD, errorMessage: "invalid comfirm password" })

    const existingUser = await User.findOne({ userId })
    if (existingUser != null)
      return res.status(400).json({ isValid: false, errorType: USERALREADEXIST, errorMessage: "user already exist" })

    const user = new User({ name, email, userId, password })
    await user.save()

    const userConnection = new ConnectionModel({ userId: user._id })
    await userConnection.save()

    const { token: authToken } = await createJwtTokenHandler({
      _id: user._id.toString(),
      email: user.email,
      expiresIn: "1 days",
      tokenType: "authToken",
    })
    const { token: refreshToken } = await createJwtTokenHandler({
      _id: user._id.toString(),
      email: user.email,
      expiresIn: "1 days",
      tokenType: "refreshToken",
    })

    assignCookiesHandler({
      res,
      token: authToken,
      expires: "1d",
      tokenName: "authToken",
    })

    assignCookiesHandler({
      res,
      token: refreshToken,
      expires: "1d",
      tokenName: "refreshToken",
    })

    return res.status(200).json({ isValid: true, name: user.name, email: user.email })
  } catch (error) {
    console.log(error)
  }
}

export const loginUserHandler = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body
    const user = await User.findOne({ email })

    if (user == null) return res.status(400).json({ isValid: false, errorType: USERNOTFOUND })

    const isCorrectPassword = await user.checkIsCorrectPassword(password)
    if (!isCorrectPassword) return res.status(400).json({ isValid: false, errorType: INVALIDPASSWORD })

    const { token: authToken } = await createJwtTokenHandler({
      _id: user._id.toString(),
      email: user.email,
      expiresIn: "7 days",
      tokenType: "authToken",
    })
    const { token: refreshToken } = await createJwtTokenHandler({
      _id: user._id.toString(),
      email: user.email,
      expiresIn: "7 days",
      tokenType: "refreshToken",
    })

    await assignCookiesHandler({
      res,
      token: authToken,
      tokenName: "authToken",
      expires: "1d",
    })
    await assignCookiesHandler({
      res,
      token: refreshToken,
      tokenName: "refreshToken",
      expires: "1d",
    })

    return res.status(200).json({ isValid: true, isLogedIn: true })
  } catch (error) {
    console.log(error)
  }
}

export const logoutUserHandler = async (req: Request, res: Response) => {
  try {
    await res.clearCookie("authToken")
    await res.clearCookie("refreshToken")

    return res.status(200).json({ isLogedOut: true })
  } catch (error) {
    console.log(error)
  }
}

export const checkUserIdAvilableHandler = async (req: Request, res: Response) => {
  try {
    const { userId } = req.body

    const user = await User.findOne({ userId })
    if (user == null) return res.status(400).json({ isValid: false, errorType: USERALREADEXIST })
    return res.status(200).json({ isValid: true })
  } catch (error) {
    return res.status(400).json({ isValid: false })
  }
}

export const verifyUserIsLogedInHandler = (req: Request, res: Response) => {
  try {
    const { email, _id } = req.user as userInterface
    const isAvailableUserDetail = _id != undefined && email != undefined
    if (isAvailableUserDetail) return res.status(200).json({ isValid: true, isLogedIn: true })

    return res.status(400).json({ isValid: false, isLogedIn: false, errorType: USERNOTGLOGEDIN })
  } catch (error) {
    return res.status(400).json({ isValid: false })
  }
}

export const getUserDetailHandler = async (req: Request, res: Response) => {
  try {
    const { _id } = req.user as userInterface
    const userDetail = await User.getUserDetail(_id)

    return res.status(200).json(userDetail)
  } catch (error) {
    return res.status(400).json({ isValid: false })
  }
}

export const verifyUserEmailHandler = async (req: Request, res: Response) => {
  try {
    const { otp } = req.body
    const { email, _id } = req.user as userInterface

    const isAvailableUserDetail = _id != undefined && email != undefined
    if (!isAvailableUserDetail) return res.status(400).json({ isValid: false, errorType: USERNOTGLOGEDIN })

    const avilableOtp = await Otp.findOne({ email })
    if (avilableOtp == null) return res.status(400).json({ isValid: false, errorType: OTPRECORDNOTFOUND })

    const isCorrectOtp = await avilableOtp.verifyOtp(otp)
    if (!isCorrectOtp) return res.status(400).json({ isValid: false, errorType: INVALIDOTP })

    await Otp.deleteMany({ email })
    res.status(200).json({ isValid: true, isCorrectOtp: true })
  } catch (error) {
    console.log(error)
  }
}

export const sendVerifyUserEmailHandler = async (req: Request, res: Response) => {
  try {
    const { email, _id } = req.user || {}

    const isAvailableUserDetail = _id != undefined && email != undefined
    if (!isAvailableUserDetail)
      return res.status(200).json({ isValid: false, isSendedOtp: false, errorType: USERNOTGLOGEDIN })

    const generatedOtp = await otpGenerator.generate(6, {
      upperCaseAlphabets: false,
      specialChars: false,
      lowerCaseAlphabets: false,
    })
    if (typeof generatedOtp != "string") return

    await Otp.deleteMany({ email })
    const otp = new Otp({
      otp: generatedOtp,
      createdAt: new Date(),
      email,
      verificationType: "asdf",
    })
    await otp.save()

    const subject = getOtpEmailSubject()
    const html = getOtpEmailTemplate({ otp: generatedOtp, userName: "irfan" })
    const { isSendedEmail, isValid } = await nodeMailerSendEmailer({
      email,
      subject,
      html,
      text: "hello",
    })
    if (isSendedEmail && isValid) return res.status(200).json({ isValid, isSendedEmail })
  } catch (error) {
    console.log(error)
  }
}

export const changePasswordHanldler = async (req: Request, res: Response) => {
  try {
    const { oldPassword, newPassword, newComfirmPassword } = req.body
    const { _id } = req.user as userInterface

    const isCorrectComfirtPassword = newPassword == newComfirmPassword
    if (!isCorrectComfirtPassword) {
      return res.status(400).json({ isValid: false, isChangedPassword: false, errorType: INVALIDCOMFIRMPASSWORD })
    }

    const userDetail = await User.findOne({ _id })
    if (userDetail == null) {
      return res.status(400).json({ isValid: false, isChangedPassword: false, errorType: USERNOTGLOGEDIN })
    }

    const isCorrectPassword = await userDetail.checkIsCorrectPassword(oldPassword)
    if (!isCorrectPassword) {
      return res.status(400).json({ isValid: false, isChangedPassword: false, errorType: INVALIDPASSWORD })
    }
    await userDetail.changePassword(newPassword)
    return res.status(200).json({ isValid: true, isCorrectPassword: true, isChnagedPassword: true })
  } catch (error) {
    console.log("user error ", error)
  }
}

export const requestChangePasswordWithOtpHandler = async (req: Request, res: Response) => {
  try {
    const _id = req.user?._id
    const email = req.user?.email
    const { email: emailBody } = req.body

    const isAvailableUserData = _id != undefined && email != undefined

    const mongooseParams = isAvailableUserData ? { _id, email } : { email: emailBody }

    const user = await User.findOne(mongooseParams)
    if (user == null) return res.status(400).json({ isValid: false, errorType: USERNOTFOUND })

    const generatedOtp = await otpGenerator.generate(6, {
      upperCaseAlphabets: false,
      specialChars: false,
      lowerCaseAlphabets: false,
    })
    if (typeof generatedOtp != "string") return

    await Otp.deleteMany({ email })
    const otp = new Otp({
      otp: generatedOtp,
      createdAt: new Date(),
      email,
      verificationType: "asdf",
    })
    await otp.save()

    const subject = getOtpEmailSubject()
    const html = getOtpEmailTemplate({ otp: generatedOtp, userName: user.name })

    const { isSendedEmail, isValid } = await nodeMailerSendEmailer({
      email: user.email,
      subject,
      html,
      text: "",
    })
    if (isSendedEmail && isValid) return res.status(200).json({ isValid, isSendedEmail })
  } catch (error) {
    console.log(error)
  }
}

export const changePasswordWithOtpHandler = async (req: Request, res: Response) => {
  try {
    const _id = req.user?._id
    const email = req.user?.email
    const { email: emailBody, otp, newPassword, newComfirmPassword } = req.body

    const isAvailableUserData = _id != undefined && email != undefined
    const mongooseParams = isAvailableUserData ? { email } : { email: emailBody }

    const availableOtp = await Otp.findOne(mongooseParams)
    if (availableOtp == null) return res.status(400).json({ isValid: false, errorType: OTPRECORDNOTFOUND })

    const isCorrectOtp = await availableOtp.verifyOtp(otp)
    if (!isCorrectOtp) return res.status(400).json({ isValid: false, errorType: INVALIDOTP })

    const isCorrectComfirtPassword = newPassword == newComfirmPassword
    if (!isCorrectComfirtPassword) return res.status(400).json({ isValid: false, errorType: INVALIDCOMFIRMPASSWORD })

    await User.findOneAndUpdate(mongooseParams, { password: newPassword })
    return res.status(200).json({ isValid: true, isUpdatedPassword: true })
  } catch (error) {
    console.log(error)
  }
}

export const googleLoginWithAcessTokenHandler = async (req: Request, res: Response) => {
  try {
    console.log(req.url)
    const { acessToken } = req.body
    if (acessToken == undefined) return res.status(400).json({ isValid: false, errorType: ACESSTOKENNOTPROIVIDED })
    console.log("acess token", acessToken)
    const { data: fetchedUserData } = await axios.get("https://www.googleapis.com/oauth2/v1/userinfo", {
      headers: { Authorization: `Bearer ${acessToken}` },
    })

    const userDetails = await User.findOne({ email: fetchedUserData.email })
    if (userDetails == null) return res.status(400).json({ isValid: false, errorType: USERNOTFOUND })

    const { token: authToken } = await createJwtTokenHandler({
      _id: userDetails._id.toString(),
      email: userDetails.email,
      expiresIn: "1 days",
      tokenType: "authToken",
    })
    const { token: refreshToken } = await createJwtTokenHandler({
      _id: userDetails._id.toString(),
      email: userDetails.email,
      expiresIn: "1 days",
      tokenType: "refreshToken",
    })

    assignCookiesHandler({
      res,
      token: authToken,
      expires: "1d",
      tokenName: "authToken",
    })

    assignCookiesHandler({
      res,
      token: refreshToken,
      expires: "1d",
      tokenName: "refreshToken",
    })
    console.log("user detail", userDetails)
    return res.status(200).json({ isValid: true })
  } catch (error) {
    console.log("error")
    return res.status(400).json({ isValid: false })
  }
}

export const loginWithGoogleWithCredintialsHandler = async (req: Request, res: Response) => {
  try {
    const { credential } = req.body
    const decodedData = jwt.decode(credential)

    if (decodedData == null || typeof decodedData === "string") return res.status(400).json({ isValid: false })
    const userDetail = await User.findOne({ email: decodedData.email })
    if (userDetail == null) return res.status(400).json({ isVaild: false, errorType: USERNOTFOUND })

    const { token: authToken } = await createJwtTokenHandler({
      _id: userDetail._id.toString(),
      email: userDetail.email,
      expiresIn: "1 days",
      tokenType: "authToken",
    })
    const { token: refreshToken } = await createJwtTokenHandler({
      _id: userDetail._id.toString(),
      email: userDetail.email,
      expiresIn: "1 days",
      tokenType: "refreshToken",
    })

    assignCookiesHandler({
      res,
      token: authToken,
      expires: "1d",
      tokenName: "authToken",
    })

    assignCookiesHandler({
      res,
      token: refreshToken,
      expires: "1d",
      tokenName: "refreshToken",
    })

    return res.status(200).json({ isValid: true })
  } catch (error) {
    console.log(error)
  }
}

export const loginWithGithubHandler = async (req: Request, res: Response) => {
  try {
    const { code } = req.body
    console.log("login with github", code)
    const { GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET, FRONTEND_URL } = process.env

    axios
      .post("https://github.com/login/oauth/access_token", {
        client_id: GITHUB_CLIENT_ID,
        client_secret: GITHUB_CLIENT_SECRET,
        redirect_uri: `${FRONTEND_URL + "/authentication" || "http://localhost:3000/authentication"}`,
        code,
      })
      .then(({ data }) => {
        const params = Object.fromEntries(new URLSearchParams(data))
        if (!params.access_token) return res.status(400).json({})

        axios
          .get("https://api.github.com/user/emails", { headers: { Authorization: `token ${params.access_token}` } })
          .then(async ({ data }) => {
            const userDetail = await User.findOne({ email: data[0].email })
            if (userDetail == null) return res.status(400).json({ isValid: false, errorType: USERNOTFOUND })

            const { token: authToken } = await createJwtTokenHandler({
              _id: userDetail._id.toString(),
              email: userDetail.email,
              expiresIn: "1 days",
              tokenType: "authToken",
            })
            const { token: refreshToken } = await createJwtTokenHandler({
              _id: userDetail._id.toString(),
              email: userDetail.email,
              expiresIn: "1 days",
              tokenType: "refreshToken",
            })

            assignCookiesHandler({
              res,
              token: authToken,
              expires: "1d",
              tokenName: "authToken",
            })

            assignCookiesHandler({
              res,
              token: refreshToken,
              expires: "1d",
              tokenName: "refreshToken",
            })

            return res.status(200).json({ isValid: true })
          })
          .catch((err) => console.log(err))
      })
  } catch (error) {
    console.log(error)
  }
}

// send freind request to another user
export const sendFreindRequestHandler = async (req: Request, res: Response) => {
  try {
    const { _id } = req.user as userInterface

    const { requestedFreindUserId } = req.body
    if (requestedFreindUserId == undefined) return

    const userObjectId = new mongoose.Types.ObjectId(_id)
    const requestedFreindUserObjectId = new mongoose.Types.ObjectId(requestedFreindUserId)

    // adding request sender user database
    await ConnectionModel.updateOne(
      {
        _id: userObjectId,
        sendedFreindRequest: { $not: { $elemMatch: { userId: requestedFreindUserObjectId } } },
      },
      {
        $push: { sendedFreindRequest: { userId: requestedFreindUserObjectId } },
      },
    )
    // adding to record to the request receiver database
    await ConnectionModel.updateOne(
      {
        _id: requestedFreindUserObjectId,
        receivedFreindRequest: { $not: { $elemMatch: { userId: userObjectId } } },
      },
      {
        $push: { receivedFreindRequest: { userId: userObjectId } },
      },
    )
  } catch (error) {
    return res.status(400).json({})
  }
}

// accept the freind request
export const acceptFreindRequestHandler = async (req: Request, res: Response) => {
  try {
    const { _id } = req.user as userInterface
    const { acceptedFreindUserId } = req.body
    if (acceptedFreindUserId == undefined) return res.status(400).json({})

    const userObjectId = new mongoose.Types.ObjectId(_id)
    const acceptedFreindUserObjectId = new mongoose.Types.ObjectId(acceptedFreindUserId)

    await ConnectionModel.updateOne(
      {
        _id: userObjectId,
      },
      {
        $pull: { receivedFreindRequest: { userId: acceptedFreindUserObjectId } },
        $push: { freinds: { userId: acceptedFreindUserObjectId } },
      },
    )

    await ConnectionModel.updateOne(
      {
        _id: acceptedFreindUserObjectId,
      },
      {
        $pull: { sendedFreindRequest: { userId: userObjectId } },
        $push: { freinds: { userId: userObjectId } },
      },
    )
  } catch (error) {
    return res.status(400).json({})
  }
}

// reject the freind request
;async (req: Request, res: Response) => {
  try {
    const { _id } = req.user as userInterface
    const { acceptedFreindUserId } = req.body
    if (acceptedFreindUserId == undefined) return res.status(400).json({})

    const userObjectId = new mongoose.Types.ObjectId(_id)
    const acceptedFreindUserObjectId = new mongoose.Types.ObjectId(acceptedFreindUserId)

    await ConnectionModel.updateOne(
      {
        _id: userObjectId,
      },
      {
        $pull: { receivedFreindRequest: { userId: acceptedFreindUserObjectId } },
      },
    )

    await ConnectionModel.updateOne(
      {
        _id: acceptedFreindUserObjectId,
      },
      {
        $pull: { sendedFreindRequest: { userId: userObjectId } },
      },
    )
  } catch (error) {
    return res.status(400).json({})
  }
}

// get user details on search
export const getUserDetailsByUserIdHandler = async (req: Request, res: Response) => {
  try {
    const { _id } = req.user as userInterface
    // const { userId } = req.body
    const userObjectId = new mongoose.Types.ObjectId(_id)
    console.log("user object id", userObjectId)
    const usersDetails = await UserModel.aggregate([
      { $match: { _id: { $ne: userObjectId } } },
      { $project: { name: 1, email: 1, userId: 1 } },
    ])

    // debugger;
    return res.status(200).json(usersDetails)
  } catch (error) {
    return res.status(400).json({})
  }
}

export const updateUserProfileHandler = async (req: MulterRequest, res: Response) => {
  try {
    const { _id } = req.user as userInterface
    const userObjectId = new mongoose.Types.ObjectId(_id)
    if (req.file == undefined) return res.status(400).json({ errorType: FILENOTINCLUEDED })

    const cloudinaryUpload = await cloudinaryFileUploadHandler(req.file.path, { resource_type: "image" })
    if (cloudinaryUpload.url) {
      await UserModel.findOneAndUpdate({ _id: userObjectId }, { profileImageUrl: cloudinaryUpload.url })
      res.status(200).json({ isvalid: true, isUploadedImage: true, fileUrl: cloudinaryUpload.url })
    }
    fs.unlinkSync(req.file.path)
  } catch (error) {
    return res.status(400).json({})
  }
}

export const updateUserDetailHandler = async (req: MulterRequest, res: Response) => {
  try {
    const { _id } = req.user as userInterface
    const userObjectId = new mongoose.Types.ObjectId(_id)

    let profileImageUrl: undefined | string = undefined
    const userUpdatedDetails: Object = req.body
    console.log("user updated details", userUpdatedDetails)
    if (req.file != undefined) {
      const cloudinaryUpload = await cloudinaryFileUploadHandler(req.file.path, { resource_type: "image" })
      if (cloudinaryUpload.url) {
        profileImageUrl = cloudinaryUpload.url
      }
      fs.unlinkSync(req.file.path)
    }
    if (profileImageUrl != undefined) {
      await UserModel.findOneAndUpdate(
        { _id: userObjectId },
        { profileImageUrl: profileImageUrl, ...userUpdatedDetails },
      )
    } else {
      await UserModel.findOneAndUpdate(
        { _id: userObjectId },
        { profileImageUrl: profileImageUrl, ...userUpdatedDetails },
      )
    }
    return res.status(200).json({ isValid: true, isUpdated: true })
  } catch (error) {
    return res.status(400).json({})
  }
}

export const updateSettingHandler = async (req: Request, res: Response) => {
  try {
    const { _id } = req.user as userInterface
    const userObjectId = new mongoose.Types.ObjectId(_id)

    const { setting } = req.body
    await UserSettingModel.findOneAndUpdate({ _id: userObjectId }, { ...setting })
    return res.status(200).json({ isUpdated: true })
  } catch (error) {
    return res.status(400).json({})
  }
}

export const gettingStartedSettingSetupHandler = async (req: Request, res: Response) => {
  try {
    const { _id } = req.user as userInterface
    const userObjectId = new mongoose.Types.ObjectId(_id)
    const { theme } = req.body

    const userSetting = UserSettingModel.findOne({ _id: userObjectId })
    if (userSetting == null) {
      const newUserSettting = new UserSettingModel({ userId: userObjectId })
      await newUserSettting.save()
      return res.status(200).json({ isUpdated: true })
    }

    await UserSettingModel.findOneAndUpdate({ _id: userObjectId }, { $set: { "generalSetting.theme": theme } })
    return res.status(200).json({ isUpdated: true })
  } catch (error) {
    return res.status(400).json({})
  }
}

export const searchUserHandler = async (req: Request, res: Response) => {
  try {
    const _id = req.user?._id as string
    const userObjectId = new mongoose.Types.ObjectId(_id)

    const { query } = req.body

    const users = await UserModel.aggregate([
      {
        $search: {
          index: "default", // The name of your search index
          compound: {
            should: [
              {
                autocomplete: {
                  query: query, // Replace with your search term
                  path: "name",
                  fuzzy: {
                    maxEdits: 1,
                  },
                },
              },
              {
                autocomplete: {
                  query: query, // Replace with your search term
                  path: "email",
                  fuzzy: {
                    maxEdits: 1,
                  },
                },
              },
            ],
          },
        },
      },
      {
        $match: {
          _id: { $ne: userObjectId },
        },
      },
      {
        $limit: 10,
      },
      {
        $project: {
          name: 1,
          email: 1,
          _id: 1,
          profileImageUrl: 1,
          UserId: 1,
        },
      },
    ])

    return res.status(200).json({ users })
  } catch (error) {
    return res.status(400).json({})
  }
}
