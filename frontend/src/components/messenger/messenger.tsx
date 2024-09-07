import ChatContainer from "./chat/chat-container"
import CallLogContainer from "./call/call-log-container"
import ContactContainer from "./contact/contact-container"

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
