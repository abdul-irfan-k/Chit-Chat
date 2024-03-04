"use client"
import { useSelector } from "react-redux"
import TextMessage from "./text-message/text-message"
import { chatRoomMessagesReducerSlate } from "@/redux/reducers/message-reducer/message-reducer"
import { useEffect } from "react"
import VoiceMessage from "./voice-message/voice-message"
import { chatUsersListReducerState } from "@/redux/reducers/chat-user-reducer/chat-user-reducer"
import { userDetailState } from "@/redux/reducers/user-redicer/user-reducer"
import ImageMessage from "./image-message/image-message"
import PollMessage from "./poll-message/poll-message"
import VideoMessage from "./video-message/video-message"
import MessageInfiniteScroll from "@/components/shared/infinite-scroll/infinite-scroll"
const ChatBox = () => {
  const { currentChaterMessage } = useSelector(
    (state: { chatRoomsMessageReducer: chatRoomMessagesReducerSlate }) => state.chatRoomsMessageReducer,
  )
  const { currentChaterDetail } = useSelector(
    (state: { chatUsersList: chatUsersListReducerState }) => state.chatUsersList,
  )
  const { userDetail } = useSelector((state: { userDetail: userDetailState }) => state.userDetail)

  return (
    <div className="relative px-10 h-full   md:h-[70vh] ">
      {userDetail != null && currentChaterDetail != null && (
        <MessageInfiniteScroll
          currentChaterDetail={currentChaterDetail}
          userDetail={userDetail}
          totalFetchedMessages={currentChaterMessage?.totalFetchedMessages}
          totatMessages={currentChaterMessage?.totatMessages}
        >
          {currentChaterMessage?.messages.map((message) => {
            return (
              <>
                <div>
                  {message.messageData.messageType == "textMessage" && (
                    <>
                      <TextMessage
                        messageContent={message.messageData.message}
                        messegeChannelType={message.messegeChannelType}
                        time={message.messageData.messageSendedTime}
                        userImageSrc={
                          message.messegeChannelType == "incomingMessage"
                            ? currentChaterDetail.currentChaterType == "user" && currentChaterDetail.profileImageUrl
                              ? currentChaterDetail.profileImageUrl
                              : "/Asset/avatar.jpg"
                            : userDetail.profileImageUrl
                        }
                        userName={
                          message.messegeChannelType == "incomingMessage" ? currentChaterDetail.name : userDetail?.name
                        }
                        _id={message.messageData._id}
                        reactions={message.messageData.reactions}
                      />
                    </>
                  )}

                  {message.messageData.messageType == "voiceMessage" && (
                    <VoiceMessage
                      _id={message.messageData._id}
                      messageChannelType={message.messegeChannelType}
                      AudioSrc={message.messageData.voiceMessageSrc}
                      time={new Date()}
                      userImageSrc={
                        message.messegeChannelType == "incomingMessage"
                          ? currentChaterDetail.currentChaterType == "user" && currentChaterDetail.profileImageUrl
                            ? currentChaterDetail.profileImageUrl
                            : "/Asset/avatar.jpg"
                          : userDetail.profileImageUrl
                      }
                      userName={
                        message.messegeChannelType == "incomingMessage" ? currentChaterDetail?.name : userDetail?.name
                      }
                    />
                  )}

                  {message.messageData.messageType == "imageMessage" && (
                    <ImageMessage
                      _id={message.messageData._id}
                      messageImageSrc={message.messageData.imageMessageSrc}
                      messegeChannelType={message.messegeChannelType}
                      time={new Date()}
                      userImageSrc={
                        message.messegeChannelType == "incomingMessage"
                          ? currentChaterDetail.currentChaterType == "user" && currentChaterDetail.profileImageUrl
                            ? currentChaterDetail.profileImageUrl
                            : "/Asset/avatar.jpg"
                          : userDetail.profileImageUrl
                      }
                      userName={
                        message.messegeChannelType == "incomingMessage" ? currentChaterDetail?.name : userDetail?.name
                      }
                    />
                  )}

                  {message.messageData.messageType == "pollMessage" && (
                    <PollMessage
                      messegeChannelType={message.messegeChannelType}
                      options={message.messageData.options}
                      title={message.messageData.title}
                      time={new Date()}
                      userImageSrc={
                        message.messegeChannelType == "incomingMessage"
                          ? currentChaterDetail.currentChaterType == "user" && currentChaterDetail.profileImageUrl
                            ? currentChaterDetail.profileImageUrl
                            : "/Asset/avatar.jpg"
                          : userDetail.profileImageUrl
                      }
                      userName={
                        message.messegeChannelType == "incomingMessage" ? currentChaterDetail?.name : userDetail?.name
                      }
                      _id={message.messageData._id}
                      userAndChaterDetails={{
                        chatRoomId:
                          currentChaterDetail.currentChaterType == "user"
                            ? currentChaterDetail.chatRoom?.chatRoomId
                            : currentChaterDetail.chatRoomId,
                        senderId: userDetail._id,
                      }}
                    />
                  )}

                  {message.messageData.messageType == "videoMessage" && (
                    <VideoMessage
                      _id={message.messageData._id}
                      messageVideoSrc={message.messageData.videoMessageSrc}
                      messegeChannelType={message.messegeChannelType}
                      time={new Date()}
                      userImageSrc={
                        message.messegeChannelType == "incomingMessage"
                          ? currentChaterDetail.currentChaterType == "user" && currentChaterDetail.profileImageUrl
                            ? currentChaterDetail.profileImageUrl
                            : "/Asset/avatar.jpg"
                          : userDetail.profileImageUrl
                      }
                      userName={
                        message.messegeChannelType == "incomingMessage" ? currentChaterDetail?.name : userDetail?.name
                      }
                    />
                  )}
                </div>
              </>
            )
          })}
        </MessageInfiniteScroll>
      )}
    </div>
  )
}

export default ChatBox
