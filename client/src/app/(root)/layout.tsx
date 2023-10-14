import Notification from "@/components/notificaton/notification"
import SocketIoIntialise from "@/components/socket-io-intialise/socket-io-intialise"
import ReduxProvider from "@/provider/redux-provider/redux-provider"
import SocketIoChatUserEventProvider from "@/provider/socket-io-event-provider/socket-io-chat-user-event-provider"
import UserAuthProvider from "@/provider/user-auth-provider/user-auth-provider"


interface RootLayoutProps {
  children: React.ReactNode
}
export default function RootLayout({ children }: RootLayoutProps) {
  
 
  return (
    <div className="relative">
      <ReduxProvider>
        <UserAuthProvider>
          <SocketIoIntialise />
          <SocketIoChatUserEventProvider />
          <Notification />
          {children}
        </UserAuthProvider>
      </ReduxProvider>
    </div>
  )
}
