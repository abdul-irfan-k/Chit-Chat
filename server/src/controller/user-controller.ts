import { Request, Response } from "express"
import User from "../model/mongoose/user-model.js"
import {
  INVALIDCOMFIRMPASSWORD,
  INVALIDPASSWORD,
  USERALREADEXIST,
  USERNOTFOUND,
  USERNOTGLOGEDIN,
} from "../constants/constants.js"
import { createJwtTokenHandler } from "../util/jwt.js"
import { assignCookiesHandler } from "../util/cookies.js"
import Otp from "../model/mongoose/otp-model.js"
import otpGenerator from 'otp-generator'

export const signUpUserHandler = async (req: Request, res: Response) => {
  try {
    const { name, email, userId, password, confirmPassword, profileImageUrl } =
      req.body

    const passwordMatched = password === confirmPassword
    if (!passwordMatched)
      return res
        .status(400)
        .json({ isValid: true, errorType: INVALIDCOMFIRMPASSWORD })

    const existingUser = await User.findOne({ userId })
    if (existingUser != null)
      return res
        .status(400)
        .json({ isValid: false, errorType: USERALREADEXIST })

    const user = new User({ name, email, userId, password, profileImageUrl })
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

    if (user == null)
      return res.status(400).json({ isValid: false, errorType: USERNOTFOUND })

    const isCorrectPassword = await user.checkIsCorrectPassword(password)
    if (!isCorrectPassword)
      return res
        .status(400)
        .json({ isValid: false, errorType: INVALIDPASSWORD })

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

export const checkUserIdAvilableHandler = async (
  req: Request,
  res: Response,
) => {
  try {
    const { userId } = req.body

    const user = await User.findOne({ userId })
    if (user == null)
      return res
        .status(400)
        .json({ isValid: false, errorType: USERALREADEXIST })
    return res.status(200).json({ isValid: true })
  } catch (error) {
    return res.status(400).json({ isValid: false })
  }
}


export const verifyUserIsLogedInHandler = (req:Request,res:Response) => {
try {
  const { email,_id} = req.user as userInterface
  const isAvailableUserDetail = _id != undefined && email != undefined

  if(isAvailableUserDetail) return res.status(200).json({isValid:true,isLogedIn:true})
  return res.status(400).json({isValid:false,isLogedIn:false,errorType:USERNOTGLOGEDIN})
} catch (error) {
  return res.status(400).json({isValid:false})
}
}


export const verifyUserEmailHandler = (req:Request,res:Response) => {
  
}
export const sendVerifyUserEmailHandler = async(req:Request,res:Response) => {
  try {
    const {email,_id} = req.user as userInterface

    const isAvailableUserDetail = _id != undefined && email != undefined
    if(isAvailableUserDetail) return res.status(200).json({isValid:false,isSendedOtp:false,errorType:USERNOTGLOGEDIN})

    const generatedOtp = await otpGenerator.generate(6,{upperCaseAlphabets: false, specialChars: false, lowerCaseAlphabets: false })
    if(typeof generatedOtp != 'string' ) return 
    const otp = new Otp({otp:generatedOtp,createdAt:new Date(),email,verificationType:'asdf'})
  } catch (error) {
    
  }
}