import { Response } from "express"

interface assignCookiesHandlerArguments {
  res: Response
  token: string
  tokenName: "authToken" | "refreshToken"
  expires: "1h" | "1d" | Date
}
export const assignCookiesHandler = ({ res, token, tokenName, expires }: assignCookiesHandlerArguments): void => {
  const expire =
    typeof expires !== "string"
      ? expires
      : expires == "1d"
        ? new Date(Date.now() + 1000 * 60 * 60 * 24 * 7)
        : new Date(Date.now() + 1000 * 60 * 60 * 24 * 7)

  res.cookie(tokenName, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV != "DEVELOPMENT",
    // secure: true,
    expires: expire,
    // sameSite: "none",
    // domain: ".chit-chat.abdulirfan.me",
  })
}
