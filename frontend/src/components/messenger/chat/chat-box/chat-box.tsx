"use client"
import { useSelector } from "react-redux"
import TextMessage from "./text-message/text-message"
import { chatRoomMessagesReducerSlate } from "@/redux/reducers/message-reducer/message-reducer"
import { useEffect } from "react"
import VoiceMessage from "./voice-message/voice-message"
import { chatUserAndGroupReducerState } from "@/redux/reducers/chat-user-reducer/chat-user-reducer"
import { userDetailState } from "@/redux/reducers/user-redicer/user-reducer"
import ImageMessage from "./image-message/image-message"
import PollMessage from "./poll-message/poll-message"
import VideoMessage from "./video-message/video-message"
import MessageInfiniteScroll from "@/components/shared/infinite-scroll/infinite-scroll"
import { AnimatePresence, motion } from "framer-motion"

const ChatBox = ({ height }: { height?: string | number }) => {
  const { currentChatRoomMessages } = useSelector(
    (state: { messageReducer: chatRoomMessagesReducerSlate }) => state.messageReducer,
  )
  const { currentChaterDetail } = useSelector(
    (state: { chatUserAndGroupList: chatUserAndGroupReducerState }) => state.chatUserAndGroupList,
  )
  const { userDetail } = useSelector((state: { userDetail: userDetailState }) => state.userDetail)

  return (
    <div className="relative  h-full   md:h-[height] px-2 sm:px-3 md:px-10 ">
      {userDetail != null && currentChaterDetail != null && (
        <MessageInfiniteScroll
          currentChaterDetail={currentChaterDetail}
          userDetail={userDetail}
          totalFetchedMessages={currentChatRoomMessages?.totalFetchedMessages}
          totatMessages={currentChatRoomMessages?.totatMessages}
          height={height}
        >
          <AnimatePresence mode="popLayout">
            {currentChatRoomMessages?.messages.map((message, index) => {
              return (
                <motion.div
                  key={message.messageData._id}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  layout
                  transition={{
                    opacity: { duration: 0.2 },
                    layout: {
                      type: "spring",
                      bounce: 0.4,
                      duration: (index + 1) * 0.15 + 0.5,
                    },
                  }}
                  className={
                    "mb-3  clear-both  flex items-start" +
                    (message.messegeChannelType == "incomingMessage" ? " float-lef" : " float-right flex-row-reverse")
                  }
                  style={{ originX: message.messegeChannelType == "outgoingMessage" ? 0 : 1 }}
                >
                  {message.messageData.messageType == "textMessage" && (
                    <TextMessage
                      messageContent={message.messageData.content}
                      messegeChannelType={message.messegeChannelType}
                      time={message.messageData.messageSendedTime}
                      userImageSrc={
                        message.messegeChannelType == "incomingMessage"
                          ? currentChaterDetail.currentChaterType == "user" && currentChaterDetail.profileImageUrl
                            ? currentChaterDetail.profileImageUrl
                            : message.messageData.postedByUser?.profileImageUrl
                          : userDetail.profileImageUrl
                      }
                      userName={
                        message.messegeChannelType == "incomingMessage"
                          ? currentChaterDetail.currentChaterType == "user"
                            ? currentChaterDetail.name
                            : message.messageData.postedByUser?.name
                          : userDetail?.name
                      }
                      _id={message.messageData._id}
                      reactions={message.messageData.reactions}
                    />
                  )}

                  {message.messageData.messageType == "imageMessage" && (
                    <ImageMessage
                      _id={message.messageData._id}
                      messageImageSrc={message.messageData.imageSrc}
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
                  {message.messageData.messageType == "voiceMessage" && (
                    <VoiceMessage
                      _id={message.messageData._id}
                      messageChannelType={message.messegeChannelType}
                      AudioSrc={message.messageData.audioSrc}
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

                  {message.messageData.messageType == "videoMessage" && (
                    <VideoMessage
                      _id={message.messageData._id}
                      messageVideoSrc={message.messageData.videoSrc}
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
                      time={new Date()}
                      userImageSrc={
                        message.messegeChannelType == "incomingMessage"
                          ? currentChaterDetail.currentChaterType == "user" && currentChaterDetail.profileImageUrl
                            ? currentChaterDetail.profileImageUrl
                            : message.messageData.postedByUser?.profileImageUrl
                          : userDetail.profileImageUrl
                      }
                      userName={
                        message.messegeChannelType == "incomingMessage"
                          ? currentChaterDetail.currentChaterType == "user"
                            ? currentChaterDetail.name
                            : message.messageData.postedByUser?.name
                          : userDetail?.name
                      }
                      {...message.messageData}
                      userAndChaterDetails={{
                        chatRoomId:
                          currentChaterDetail.currentChaterType == "user"
                            ? currentChaterDetail.chatRoom?.chatRoomId
                            : currentChaterDetail.chatRoomId,
                        senderId: userDetail._id,
                      }}
                    />
                  )}
                </motion.div>
              )
            })}
          </AnimatePresence>
        </MessageInfiniteScroll>
      )}
    </div>
  )
}

export default ChatBox
