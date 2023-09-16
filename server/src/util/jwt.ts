import jwt, { VerifyErrors } from "jsonwebtoken"
import { JWTERROR } from "../constants/constants.js"
import { Request } from "express"

interface createJwtTokenHandlerArgument {
  _id: string
  email: string
  expiresIn: "1h" | "1d"
  tokenType: "refreshToken" | "authToken"
}

interface createJwtTokenHandlerReturnType {
  isValid: boolean
  token?: string
  error?: string
}

export const createJwtTokenHandler = async ({
  _id,
  email,
  expiresIn,
  tokenType,
}: createJwtTokenHandlerArgument): Promise<createJwtTokenHandlerReturnType> => {
  try {
    const tokenSecret =
      tokenType == "authToken"
        ? process.env.JWT_AUTH_TOKEN_SECRET
        : process.env.JWT_REFRESH_TOKEN_SECRET

    const token = await jwt.sign({ email, _id }, tokenSecret || "", {
      expiresIn,
    })

    return { isValid: true, token }
  } catch (error) {
    return { isValid: false, error: JWTERROR }
  }
}

interface verifyJwtTokenHandlerArgument {
  req: Request
  token: string
  tokenType: "refreshToken" | "authToken"
}

export const verifyJwtTokenHandler = ({
  req,
  token,
  tokenType,
}: verifyJwtTokenHandlerArgument) => {
  return new Promise((resolve, reject) => {
    const tokenSecret =
      tokenType == "authToken"
        ? process.env.JWT_AUTH_TOKEN_SECRET
        : process.env.JWT_REFRESH_TOKEN_SECRET

    jwt.verify(token, tokenSecret || "", (err, decoded) => {
      if (!err && decoded && typeof decoded !== "string") {
        req.user = { _id: decoded._id, email: decoded.email }
        return resolve({ isValid: true })
      }

      if (err as VerifyErrors) {
        console.log(err?.inner, err?.stack, err?.name, err?.message)
        reject({ isValid: false })
      }
      return reject({ isValid: false })
    })
  })
}
