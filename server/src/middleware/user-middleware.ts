import { NextFunction, Request, Response } from "express"
import { TOKENEXPIRED, TOKENNOTFOUND } from "../constants/constants"
import { verifyJwtTokenHandler } from "../util/jwt"

export const checkisLogedInMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { authToken, refreshToken } = req.cookies || {}
    if (!authToken || !refreshToken) return res.status(400).json({ isLogedin: false, errorType: TOKENNOTFOUND })
    const isCutomAuth = authToken?.length < 500

    if (authToken && isCutomAuth) {
      await verifyJwtTokenHandler({ req, token: authToken, tokenType: "authToken" })
    } else {
      console.log("not cutom auth")
    }
    next()
  } catch (error) {
    return res.status(400).json({ isLogedin: false, errorType: TOKENEXPIRED })
  }
}
