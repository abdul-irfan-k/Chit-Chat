import { NextRequest, NextResponse } from "next/server"
import configuration from "@/config/config"

export async function middleware(request: NextRequest) {
  try {
    const result = await fetch(`${configuration.apiUrl}/user/verifyUserIsLogedIn`, {
      method: "POST",
      headers: {
        Cookie: request.cookies.toString(),
      },
    })
    const data = await result.json()

    if (!result.ok) return NextResponse.redirect(new URL("/login", request.url))
    return NextResponse.next()
  } catch (error) {
    return NextResponse.redirect(new URL("/login", request.url))
  }
}

export const config = {
  matcher: ["/", "/messenger", "/messenger/:path*", "/create-video-call"],
}
