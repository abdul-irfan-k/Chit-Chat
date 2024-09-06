import ChatList from "./chat-list/chat-list"
import MessengerSort from "./messenger-sort/messenger-sort"
import Recent from "./recent/recent"
import SideMenu from "./side-menu/side-menu"
import ChatContainer from "./chat/chat-container"
import CallLogContainer from "./call/call-log-container"
import ContactContainer from "./contact/contact-container"
import AddButton from "./add-button/add-buttton"
import SideBar from "./sidebar/sidebar"

const Messenger = () => {
  return (
    <div className="hidden w-full md:block">
      <ChatContainer />
      <CallLogContainer />
      <ContactContainer />
    </div>
  )
}

export default Messenger
