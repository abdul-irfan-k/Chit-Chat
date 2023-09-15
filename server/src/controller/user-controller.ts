import { Request, Response } from "express"
import User from "../model/mongoose/user-model.js"
import {
  INVALIDCOMFIRMPASSWORD,
  INVALIDPASSWORD,
  USERALREADEXIST,
  USERNOTFOUND,
} from "../constants/constants.js"
import { createJwtTokenHandler } from "../util/jwt.js"

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

    // const authToken = createJwtTokenHandler({
    //   userId: user._id.toString(),
    //   userName: user.name,
    //   expiresIn: "1h",
    //   tokenType: "authToken",
    // })
    // const refreshToken = createJwtTokenHandler({
    //   userId: user._id.toString(),
    //   userName: user.name,
    //   expiresIn: "1d",
    //   tokenType: "refreshToken",
    // })

    // res.cookie("authToken", authToken, {
    //   httpOnly: true,
    //   sameSite: "strict",
    //   expires: new Date(Date.now() + 1000 * 60 * 60 * 24),
    // })
    // res.cookie("refreshToken", refreshToken, {
    //   httpOnly: true,
    //   sameSite: "strict",
    //   expires: new Date(Date.now() + 1000 * 60 * 60 * 24),
    // })

    return res.status(200).json({ isValid: true })
  } catch (error) {
    console.log(error)
  }
}

export const loginUserHandler = async (req: Request, res: Response) => {
  try {
    const { userName, email, password } = req.body

    const user = await User.findOne({ email })

    if (user == null)
      return res.status(400).json({ isValid: false, errorType: USERNOTFOUND })

    const isCorrectPassword = await user.checkIsCorrectPassword(password)
    if(!isCorrectPassword) return res.status(400).json({isValid:false,errorType:INVALIDPASSWORD})

    const authToken = createJwtTokenHandler({
        userId: user._id.toString(),
        userName: user.name,
        expiresIn: "1h",
        tokenType: "authToken",
      })
    //   const refreshToken = createJwtTokenHandler({
    //     userId: user._id.toString(),
    //     userName: user.name,
    //     expiresIn: "1d",
    //     tokenType: "refreshToken",
    //   })
  
    //   res.cookie("authToken", authToken, {
    //     httpOnly: true,
    //     sameSite: "strict",
    //     expires: new Date(Date.now() + 1000 * 60 * 60 * 24),
    //   })
    //   res.cookie("refreshToken", refreshToken, {
    //     httpOnly: true,
    //     sameSite: "strict",
    //     expires: new Date(Date.now() + 1000 * 60 * 60 * 24),
    //   })


      return res.status(200).json({isValid:true})

  } catch (error) {
console.log(error)
  }
}
