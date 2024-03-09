import SideMenu from "@/components/messenger/side-menu/side-menu"
import Notification from "@/components/notificaton/notification"
import CallRequestMenuCotainer from "@/components/shared/call/call-request-menu/call-request-menu-cotainer"
import SocketIoIntialise from "@/components/socket-io-intialise/socket-io-intialise"
import PeerContextProvider from "@/provider/peer-js-provider/peer-js-context-provider"
import ReduxProvider from "@/provider/redux-provider/redux-provider"
import SocketIoChatUserEventProvider from "@/provider/socket-io-event-provider/socket-io-chat-user-event-provider"
import UserAuthProvider from "@/provider/user-auth-provider/user-auth-provider"
import CommunicatorProvider from "./messenger/[communicator]/communicator-provider"
import SocketIoProvider from "@/provider/socket-io-provider/socket-io-provider"
import ContextMenuProvider from "@/provider/context-menu-provider/context-menu-provider"

interface RootLayoutProps {
  children: React.ReactNode
}
export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <div className="relative">
      <ReduxProvider>
        <SocketIoProvider>
          <UserAuthProvider>
            <PeerContextProvider>
              <ContextMenuProvider>
                <SocketIoIntialise />
                <SocketIoChatUserEventProvider />
                <Notification />
                <CallRequestMenuCotainer />
                <CommunicatorProvider />
                <div className="flex w-screen overflow-hidden">
                  {/* <div className="relative w-14 h-screen flex items-center"> */}
                  <SideMenu />
                  {/* </div> */}
                  <div className="relative flex w-full ">{children}</div>
                </div>
                {/* <PeerContextProvider /> */}
              </ContextMenuProvider>
            </PeerContextProvider>
          </UserAuthProvider>
        </SocketIoProvider>
      </ReduxProvider>
    </div>
  )
}
