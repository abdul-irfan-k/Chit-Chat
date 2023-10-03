import Notification from "@/components/notificaton/notification"
import SocketIoIntialise from "@/components/socket-io-intialise/socket-io-intialise"
import ReduxProvider from "@/provider/redux-provider/redux-provider"
import UserAuthProvider from "@/provider/user-auth-provider/user-auth-provider"
import React from "react"

interface RootLayoutProps {
  children: React.ReactNode
}
export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <div className="relative">
      <ReduxProvider>
        <UserAuthProvider>
          <SocketIoIntialise />
          <Notification />
          {children}
        </UserAuthProvider>
      </ReduxProvider>
    </div>
  )
}
