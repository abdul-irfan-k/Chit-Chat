"use client"
import { useSelector } from "react-redux"
import TextMessage from "./text-message/text-message"
import { chatRoomMessagesReducerSlate } from "@/redux/reducers/message-reducer/message-reducer"
import { useEffect } from "react"

const ChatBox = () => {
  const {currentChaterMessage} = useSelector((state:{chatRoomsMessageReducer:chatRoomMessagesReducerSlate}) => state.chatRoomsMessageReducer)

 useEffect(() => {
console.log('current message ',currentChaterMessage)
 },[])
  return (
    <div className="px-10 h-[65vh]  overflow-y-scroll">

      {currentChaterMessage?.messages.map((message) => {
        return <>
        {message.messageData.messageType == "textMessage" && <>
        <TextMessage
        
        messageContent={message.messageData.message}
        messegeChannelType={message.messegeChannelType}
        time={message.messageData.messageSendedTime}
        userImageSrc="/Asset/avatar.jpg"
        userName="kaleel"
      />
        </>}
        </>
      })}
      {/* <TextMessage
        messageContent="Hey, what's up?"
        messegeChannelType="incomingMessage"
        time={new Date()}
        userImageSrc="/Asset/avatar.jpg"
        userName="kaleel"
      /> */}
    
    </div>
  )
}

export default ChatBox
