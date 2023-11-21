"use client"

import { SessionProvider, useSession } from "next-auth/react"
import { useEffect } from "react"

export default function SessionProviders({
  children,
  session,
}: {
  children: React.ReactNode
  session: any
}): React.ReactNode {

  useEffect(() => {
    console.log("session",session)
  }, [session])
  return <SessionProvider session={session}>{children}</SessionProvider>
}
