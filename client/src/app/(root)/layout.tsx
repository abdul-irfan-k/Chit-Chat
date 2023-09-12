import SocketIoIntialise from "@/components/socket-io-intialise/socket-io-intialise"
import ReduxProvider from "@/provider/redux-provider/redux-provider"
import React from "react"

interface RootLayoutProps {
  children: React.ReactNode
}
export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <div>
      <ReduxProvider>
        <SocketIoIntialise />
        {children}
      </ReduxProvider>
    </div>
  )
}
