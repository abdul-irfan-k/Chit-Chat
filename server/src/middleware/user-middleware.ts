import { NextFunction, Request, Response } from "express"
import { TOKENNOTFOUND } from "../constants/constants"
import { verifyJwtTokenHandler } from "../util/jwt"

export const checkisLogedIn = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { authToken, refreshToken } = req.cookies
    const isCutomAuth = authToken?.length < 500
    if (!authToken || !refreshToken)
      return res.json({ isLogedin: false, errorType: TOKENNOTFOUND })

    if (authToken && isCutomAuth) {
      await verifyJwtTokenHandler({req,token:authToken,tokenType:'authToken'})
    }
    
    else {
      console.log('not cutom auth')
    }

    next()
  } catch (error) {
    console.log(error)
  }
}
