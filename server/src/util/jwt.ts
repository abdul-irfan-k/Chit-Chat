import jwt from "jsonwebtoken"
import { JWTERROR } from "../constants/constants.js"

interface createJwtTokenHandlerArgument {
  userId: string
  userName: string
  expiresIn: "1h" | "1d"
  tokenType: "refreshToken" | "authToken"
}

interface createJwtTokenHandlerReturnType {
  isValid: boolean
  token?: string
  error?: string
}

export const createJwtTokenHandler = async ({
  userId,
  userName,
  expiresIn,
  tokenType,
}: createJwtTokenHandlerArgument): Promise<createJwtTokenHandlerReturnType> => {
  try {
    const tokenSecret =
      tokenType == "authToken"
        ? process.env.JWT_AUTH_TOKEN_SECRET
        : process.env.JWT_REFRESH_TOKEN_SECRET
    console.log(tokenSecret)
    const token = await jwt.sign({ userName, userId }, tokenSecret || "", {
      expiresIn,
    })

    return { isValid: true, token }
  } catch (error) {
    return { isValid: false, error: JWTERROR }
  }
}
