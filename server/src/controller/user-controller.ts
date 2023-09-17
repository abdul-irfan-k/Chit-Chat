import { Request, Response } from "express"
import User from "../model/mongoose/user-model.js"
import {
  INVALIDCOMFIRMPASSWORD,
  INVALIDOTP,
  INVALIDPASSWORD,
  OTPRECORDNOTFOUND,
  USERALREADEXIST,
  USERNOTFOUND,
  USERNOTGLOGEDIN,
} from "../constants/constants.js"
import { createJwtTokenHandler } from "../util/jwt.js"
import { assignCookiesHandler } from "../util/cookies.js"
import Otp from "../model/mongoose/otp-model.js"
import otpGenerator from "otp-generator"
import { nodeMailerSendEmailer } from "../util/node-mailer.js"
import { getOtpEmailSubject } from "../util/email-subject.js"
import { getOtpEmailTemplate } from "../util/email-template.js"

export const signUpUserHandler = async (req: Request, res: Response) => {
  try {
    const { name, email, userId, password, confirmPassword } = req.body
    const passwordMatched = password == confirmPassword
    if (!passwordMatched) return res.status(400).json({ isValid: false, errorType: INVALIDCOMFIRMPASSWORD })

    const existingUser = await User.findOne({ userId })
    if (existingUser != null) return res.status(400).json({ isValid: false, errorType: USERALREADEXIST })

    const user = new User({ name, email, userId, password })
    console.log(user)
    user.save()

    const { token: authToken } = await createJwtTokenHandler({
      _id: user._id.toString(),
      email: user.email,
      expiresIn: "1h",
      tokenType: "authToken",
    })
    const { token: refreshToken } = await createJwtTokenHandler({
      _id: user._id.toString(),
      email: user.email,
      expiresIn: "1d",
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

export const loginUserHandler = async (req: Request, res: Response) => {
  try {
    const { userName, email, password } = req.body

    const user = await User.findOne({ email })
    console.log(userName)

    if (user == null) return res.status(400).json({ isValid: false, errorType: USERNOTFOUND })

    const isCorrectPassword = await user.checkIsCorrectPassword(password)
    if (!isCorrectPassword) return res.status(400).json({ isValid: false, errorType: INVALIDPASSWORD })

    const { token: authToken } = await createJwtTokenHandler({
      _id: user._id.toString(),
      email: user.email,
      expiresIn: "1h",
      tokenType: "authToken",
    })
    const { token: refreshToken } = await createJwtTokenHandler({
      _id: user._id.toString(),
      email: user.email,
      expiresIn: "1d",
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

    return res.status(200).json({ isValid: true })
  } catch (error) {
    console.log(error)
  }
}

export const logoutUserHandler = async (req: Request, res: Response) => {
  try {
    await res.clearCookie("authToken")
    await res.clearCookie("refreshToken")

    return res.status(200).json({isLogedOut:true})
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
    const { email, _id } = req.user as userInterface

    const isAvailableUserDetail = _id != undefined && email != undefined
    if (!isAvailableUserDetail)
      return res.status(200).json({
        isValid: false,
        isSendedOtp: false,
        errorType: USERNOTGLOGEDIN,
      })

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
    if (!isCorrectComfirtPassword)
      return res.status(400).json({
        isValid: false,
        isChangedPassword: false,
        errorType: INVALIDCOMFIRMPASSWORD,
      })

    const userDetail = await User.findById(_id)
    if (userDetail == null)
      return res.status(400).json({
        isValid: false,
        isChangedPassword: false,
        errorType: USERNOTGLOGEDIN,
      })

    const isCorrectPassword = await userDetail.checkIsCorrectPassword(oldPassword)

    if (!isCorrectPassword)
      return res.status(400).json({
        isValid: false,
        isChangedPassword: false,
        errorType: INVALIDPASSWORD,
      })

    await User.findByIdAndUpdate(_id, { password: newPassword })
    return res.status(200).json({ isValid: true, isCorrectPassword: true })
  } catch (error) {
    console.log(error)
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
    const html = getOtpEmailTemplate({ otp: generatedOtp, userName: "irfan" })

    const { isSendedEmail, isValid } = await nodeMailerSendEmailer({
      email: user.email,
      subject,
      html,
      text: "hello",
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
