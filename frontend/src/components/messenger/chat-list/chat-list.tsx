"use client"
import { updateCurrentChaterHandler, updateCurrentChatingGroupHandler } from "@/redux/actions/chat-action/chat-action"
import { chatUserAndGroupReducerState } from "@/redux/reducers/chat-user-reducer/chat-user-reducer"
import { useAppDispatch } from "@/store"
import { useState } from "react"
import { useSelector } from "react-redux"
import MobileChatContainer from "../chat/mobile-chat-container/mobile-chat-container"
import useMediaQuery from "@/hooks/user-media-query/use-media-query"
import { messengerSortState } from "@/redux/reducers/messenger-sort-reducer/messenger-sort-reducer"
import ChatListBox from "./chat-list-box/chat-list-box"
import { AnimatePresence, motion } from "framer-motion"
import { useRouter } from "next/navigation"

const ChatList = () => {
  const dispatch = useAppDispatch()

  const router = useRouter()

  const isMobile = useMediaQuery(768)

  const { usersDeatail, groupDetail } = useSelector(
    (state: { chatUserAndGroupList: chatUserAndGroupReducerState }) => state.chatUserAndGroupList,
  )
  const { messengerSortType, subSelectionType } = useSelector(
    (state: { messengerSort: messengerSortState }) => state.messengerSort,
  )
  const [isSelectedUser, setIsSelectedUser] = useState<boolean>(false)

  const mobileBackButtonHandler = () => {
    setIsSelectedUser(false)
  }

  return (
    <div className="flex flex-col  mt-10 gap-5    w-full   ">
      <AnimatePresence>
        {messengerSortType == "chat" &&
          subSelectionType == "direct" &&
          usersDeatail.map((userDetail, index) => {
            return (
              // <Link href={`/messenger/${userDetail.userId}`} key={index}>
              <motion.div
                key={userDetail._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                layout
              >
                <ChatListBox
                  onClickHandler={async () => {
                    await router.push(`/messenger/chat/${userDetail._id}`)
                    await dispatch(updateCurrentChaterHandler({ userDetail, isChanged: true }))
                    setIsSelectedUser(true)
                  }}
                  communicatorName={userDetail.name}
                  imageSrc={userDetail.profileImageUrl != undefined ? userDetail.profileImageUrl : "/Asset/avatar.jpg"}
                  lastMessageTime={new Date()}
                  onlineStatus={userDetail.status?.onlineStatus == "online" ? true : false}
                  currentStatus={{ isSendingMessage: false }}
                  newMessage={
                    userDetail.notification?.isAvailableNewNotification
                      ? {
                          latestMessage: "hi from new account",
                          totalNewMessageCount: userDetail.notification.totalNotificationCount,
                        }
                      : undefined
                  }
                />
              </motion.div>
              // </Link>
            )
          })}
      </AnimatePresence>
      {subSelectionType == "group" &&
        groupDetail.map((groupDetail, index) => {
          return (
            // <Link href={`/messenger/${groupDetail.userId}`} key={index}>
            <ChatListBox
              key={index}
              onClickHandler={async () => {
                dispatch(updateCurrentChatingGroupHandler({ groupDetail: groupDetail, isChanged: true }))
                setIsSelectedUser(true)
                await router.push(`/messenger/group/${groupDetail._id}`)
              }}
              communicatorName={groupDetail.name}
              imageSrc={groupDetail.groupImage}
              lastMessageTime={new Date()}
              currentStatus={{ isSendingMessage: false }}
              newMessage={
                groupDetail.notification?.isAvailableNewNotification
                  ? {
                      latestMessage: "hi from new account",
                      totalNewMessageCount: groupDetail.notification.totalNotificationCount,
                    }
                  : undefined
              }
            />
            // </Link>
          )
        })}
      {isMobile && isSelectedUser && <MobileChatContainer backButtonHandler={mobileBackButtonHandler} />}
    </div>
  )
}

export default ChatList
