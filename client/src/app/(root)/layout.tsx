import Notification from "@/components/notificaton/notification"
import CallRequestMenuCotainer from "@/components/shared/call/call-request-menu/call-request-menu-cotainer"
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
          <CallRequestMenuCotainer />
          {children}
        </UserAuthProvider>
      </ReduxProvider>
    </div>
  )
}
