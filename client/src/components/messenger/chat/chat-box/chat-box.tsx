"use client"
import TextMessage from "./text-message/text-message"

const ChatBox = () => {

  return (
    <div className="px-10 h-[65vh]  overflow-y-scroll">
      <TextMessage
        messageContent="Hey, what's up?"
        messageType="incomingMessage"
        time={new Date()}
        userImageSrc="/Asset/avatar.jpg"
        userName="kaleel"
      />
      <TextMessage
        messageContent="Not much, just working on this project. How about you?"
        messageType="outgoingMessage"
        time={new Date()}
        userImageSrc="/Asset/avatar.jpg"
        userName="irfan"
      />

      <TextMessage
        messageContent=" I'm just about to start working on mine. I'm feeling a little bit anxious about it."
        messageType="incomingMessage"
        time={new Date()}
        userImageSrc="/Asset/avatar.jpg"
        userName="kaleel"
      />
      <TextMessage
        messageContent="Don't worry, you'll do great. Just take it one step at a time."
        messageType="outgoingMessage"
        time={new Date()}
        userImageSrc="/Asset/avatar.jpg"
        userName="irfan"
      />

      <TextMessage
        messageContent="Thanks, I appreciate that."
        messageType="incomingMessage"
        time={new Date()}
        userImageSrc="/Asset/avatar.jpg"
        userName="kaleel"
      />
      <TextMessage
        messageContent="So, what's your project about?"
        messageType="outgoingMessage"
        time={new Date()}
        userImageSrc="/Asset/avatar.jpg"
        userName="irfan"
      />

      <TextMessage
        messageContent="It's a research paper on the impact of artificial intelligence on the workplace."
        messageType="incomingMessage"
        time={new Date()}
        userImageSrc="/Asset/avatar.jpg"
        userName="kaleel"
      />
      <TextMessage
        messageContent="That sounds really interesting. I'm actually taking a class on AI right now."
        messageType="outgoingMessage"
        time={new Date()}
        userImageSrc="/Asset/avatar.jpg"
        userName="irfan"
      />
      <TextMessage
        messageContent="That sounds really interesting. I'm actually taking a class on AI right now."
        messageType="outgoingMessage"
        time={new Date()}
        userImageSrc="/Asset/avatar.jpg"
        userName="irfan"
      />
    </div>
  )
}

export default ChatBox
