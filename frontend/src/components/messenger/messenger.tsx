import ChatContainer from "./chat/chat-container"
import CallLogContainer from "./call/call-log-container"
import ContactContainer from "./contact/contact-container"
import { useState } from "react"

const Messenger = () => {
  const [showChatToggleProfile, setShowChatToggleProfile] = useState<boolean>(false)
  return (
    <div className=" md:w-full md:block">
      <ChatContainer />
      {/* <CallLogContainer />
      <ContactContainer /> */}
    </div>
  )
}

export default Messenger
