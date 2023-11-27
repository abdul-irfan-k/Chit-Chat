"use client"
import BreakPoint from "@/components/responsive-utilities/breakpoint/breakpoint"
import { getChatRoomMessageHandler, updateCurrentChaterHandler, updateCurrentChatingGroupHandler } from "@/redux/actions/chat-action/chat-action"
import { chatUsersListReducerState } from "@/redux/reducers/chat-user-reducer/chat-user-reducer"
import { useAppDispatch } from "@/store"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { FC, useEffect, useState } from "react"
import { useSelector } from "react-redux"
import MobileChatContainer from "../chat/mobile-chat-container/mobile-chat-container"
import MobileBreakPoint from "@/components/responsive-utilities/breakpoint/mobile-breakpoint/mobile-breakpoint"
import useMediaQuery from "@/hooks/user-media-query/use-media-query"
import { messengerSortState } from "@/redux/reducers/messenger-sort-reducer/messenger-sort-reducer"
import ChatListBox from "./chat-list-box/chat-list-box"

const ChatList = () => {
  const { usersDeatail,groupDetail} = useSelector(
    (state: { chatUsersList: chatUsersListReducerState }) => state.chatUsersList,
  )
  const { messengerSortType, subSelectionType } = useSelector(
    (state: { messengerSort: messengerSortState }) => state.messengerSort,
  )
  const [isSelectedUser, setIsSelectedUser] = useState<boolean>(false)
  const dispatch = useAppDispatch()


  const isMobile = useMediaQuery(768)
  const mobileBackButtonHandler = () => {
    setIsSelectedUser(false)
  }

  return (
    <div className="flex flex-col  mt-10 gap-5    w-full   ">
      {messengerSortType == "chat" && subSelectionType == "direct" && usersDeatail.map((userDetail, index) => {
        return (
          // <Link href={`/messenger/${userDetail.userId}`} key={index}>
          <ChatListBox
            key={index}
            onClickHandler={() => {
              dispatch(updateCurrentChaterHandler({ userDetail, isChanged: true }))
              setIsSelectedUser(true)
            }}
            communicatorName={userDetail.name}
            imageSrc="/Asset/avatar.jpg"
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
          // </Link>
        )
      })}
      {messengerSortType == "chat" && subSelectionType == "group" && groupDetail.map((groupDetail, index) => {
        return (
          // <Link href={`/messenger/${groupDetail.userId}`} key={index}>
          <ChatListBox
            key={index}
            onClickHandler={() => {
              console.log('current chating group detaail',groupDetail)
              
              dispatch(updateCurrentChatingGroupHandler({ groupDetail:groupDetail, isChanged: true }))

              setIsSelectedUser(true)
            }}
            communicatorName={groupDetail.name}
            imageSrc="/Asset/avatar.jpg"
            lastMessageTime={new Date()}
            onlineStatus={groupDetail.status?.onlineStatus == "online" ? true : false}
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
