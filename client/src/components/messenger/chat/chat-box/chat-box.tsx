"use client"
import { useSelector } from "react-redux"
import TextMessage from "./text-message/text-message"
import { chatRoomMessagesReducerSlate } from "@/redux/reducers/message-reducer/message-reducer"
import { useEffect } from "react"
import VoiceMessage from "./voice-message/voice-message"
import { chatUsersListReducerState } from "@/redux/reducers/chat-user-reducer/chat-user-reducer"
import { userDetailState } from "@/redux/reducers/user-redicer/user-reducer"

const ChatBox = () => {
  const { currentChaterMessage } = useSelector(
    (state: { chatRoomsMessageReducer: chatRoomMessagesReducerSlate }) => state.chatRoomsMessageReducer,
  )
  const { currentChaterDetail } = useSelector(
    (state: { chatUsersList: chatUsersListReducerState }) => state.chatUsersList,
  )
  const { userDetail } = useSelector((state: { userDetail: userDetailState }) => state.userDetail)

  useEffect(() => {}, [])
  return (
    <div className="px-10 h-full  overflow-y-scroll md:h-[70vh] ">
      {currentChaterMessage?.messages.map((message) => {
        return (
          <>
            {message.messageData.messageType == "textMessage" && (
              <>
                <TextMessage
                  messageContent={message.messageData.message}
                  messegeChannelType={message.messegeChannelType}
                  time={message.messageData.messageSendedTime}
                  userImageSrc="/Asset/avatar.jpg"
                  userName={
                    message.messegeChannelType == "incomingMessage" ? currentChaterDetail?.name : userDetail?.name
                  }
                />
              </>
            )}

            {message.messageData.messageType == "voiceMessage" && (
              <VoiceMessage
                messageChannelType={message.messegeChannelType}
                AudioSrc={message.messageData.voiceMessageSrc}
                time={new Date()}
                userImageSrc="/Asset/avatar.jpg"
                userName={
                  message.messegeChannelType == "incomingMessage" ? currentChaterDetail?.name : userDetail?.name
                }
              />
            )}
          </>
        )
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
