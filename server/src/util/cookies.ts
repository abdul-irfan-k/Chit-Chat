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
      ? new Date(Date.now() + 1000 * 60 * 60 * 24)
      : new Date(Date.now() + 1000 * 60 * 60)

  res.cookie(tokenName, token, {
    httpOnly: true,
    expires: expire,
  })
}
