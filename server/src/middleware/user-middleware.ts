import { NextFunction, Request, Response } from "express"
import { TOKENNOTFOUND } from "../constants/constants.js"
import { verifyJwtTokenHandler } from "../util/jwt.js"

export const checkisLogedInMiddleware = async (
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
      verifyJwtTokenHandler({ req, token: authToken, tokenType: "authToken" })
        .then(() => next())
        .catch(({ error }) => console.log(error))
    } else {
      console.log("not cutom auth")
    }

    next()
  } catch (error) {
    console.log(error)
  }
}
