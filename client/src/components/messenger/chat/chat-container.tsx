import ChatBox from "./chat-box/chat-box"
import ChatProfile from "./chat-profile/chat-profile"
import InputBox from "./input-box/input-box"

const ChatContainer = () => {
  return (
    <div className="relative mt-10  gap-8 flex flex-col  w-[60%] ">
        <ChatProfile
          currentStatus="ofline"
          profileImageSrc="/Asset/avatar.jpg"
          name="irfan"
        />

        <ChatBox />
        <InputBox />
      </div>
  )
}

export default ChatContainer