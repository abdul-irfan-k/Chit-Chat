import jwt, { VerifyErrors } from "jsonwebtoken"
import { Request } from "express"

interface createJwtTokenHandlerArgument {
  _id: string
  email: string
  expiresIn: "1h" | "1 days" | "7 days"
  tokenType: "refreshToken" | "authToken"
}

interface createJwtTokenHandlerReturnType {
  isValid: boolean
  token: string
  error?: string
}

export const createJwtTokenHandler = async ({
  _id,
  email,
  expiresIn,
  tokenType,
}: createJwtTokenHandlerArgument): Promise<createJwtTokenHandlerReturnType> => {
  return new Promise((resolve, reject) => {
    const tokenSecret =
      tokenType == "authToken" ? process.env.JWT_AUTH_TOKEN_SECRET : process.env.JWT_REFRESH_TOKEN_SECRET

    jwt.sign({ email, _id }, tokenSecret || "", { expiresIn }, (error, token) => {
      if (typeof token === "string") resolve({ isValid: true, token })
      if (typeof error !== "undefined") reject({ isValid: false, error: error?.name })
    })
  })
}

interface verifyJwtTokenHandlerArgument {
  req: Request
  token: string
  tokenType: "refreshToken" | "authToken"
}

interface verifyJwtTokenHandlerReturnType {
  isValid: boolean
  error?: string
}
export const verifyJwtTokenHandler = ({
  req,
  token,
  tokenType,
}: verifyJwtTokenHandlerArgument): Promise<verifyJwtTokenHandlerReturnType> => {
  return new Promise((resolve, reject) => {
    const tokenSecret =
      tokenType == "authToken" ? process.env.JWT_AUTH_TOKEN_SECRET : process.env.JWT_REFRESH_TOKEN_SECRET

    jwt.verify(token, tokenSecret || "", (err, decoded) => {
      if (!err && decoded && typeof decoded !== "string") {
        req.user = { _id: decoded._id, email: decoded.email }
        return resolve({ isValid: true })
      }

      if (err as VerifyErrors) {
        reject({ isValid: false, error: err })
      }
      return reject({ isValid: false, error: "not found" })
    })
  })
}
