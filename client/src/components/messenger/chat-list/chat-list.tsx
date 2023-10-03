"use client"
import { updateCurrentChaterHandler } from "@/redux/actions/chat-action/chat-action"
import { chatUsersListReducerState } from "@/redux/reducers/chat-reducer/chat-reducer"
import { useAppDispatch } from "@/store"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { FC, useEffect } from "react"
import { useSelector } from "react-redux"

const ChatList = () => {
  const { usersDeatail ,isChanged} = useSelector((state: { chatUsersList: chatUsersListReducerState }) => state.chatUsersList)
  const dispatch = useAppDispatch()
  const router = useRouter()


  useEffect(() => {
console.log('detai',usersDeatail)
  },[isChanged])
  return (
    <div className="flex flex-col  mt-10 gap-5    w-full   ">
      {usersDeatail.map((userDetail, index) => {
        return (
          // <Link href={`/messenger/${userDetail.userId}`} key={index}>
          <ChatListBox
            key={index}
            onClickHandler={() => {
              dispatch(updateCurrentChaterHandler({ userDetail, isChanged: true }))
              router.push(`/messenger/${userDetail.userId}`)
            }}
            communicatorName={userDetail.name}
            imageSrc="/Asset/avatar.jpg"
            lastMessageTime={new Date()}
            onlineStatus={true}
            currentStatus={{ isSendingMessage: false }}
            newMessage={{
              latestMessage: "hi from new account",
              totalNewMessageCount: 1,
            }}
          />
          // </Link>
        )
      })}
    </div>
  )
}

export default ChatList

interface ChatListBoxInterface {
  imageSrc: string
  communicatorName: string
  lastMessageTime: Date
  lastConversation?: {
    lastMessage: string
  }
  newMessage?: {
    latestMessage: string
    totalNewMessageCount: number
  }
  onlineStatus: Boolean
  currentStatus?: {
    isSendingMessage: Boolean
    sendingMessageType?: "textMessage" | "voiceMessage"
  }
  onClickHandler(): void
}

const ChatListBox: FC<ChatListBoxInterface> = ({
  imageSrc,
  communicatorName,
  lastMessageTime,
  lastConversation,
  newMessage,
  onlineStatus,
  currentStatus,
  onClickHandler,
}) => {
  return (
    <div className="gap-3 relative flex  items-center" onClick={onClickHandler}>
      <div className="relative w-[20%]  aspect-square ">
        <Image src={imageSrc} alt="user-image" fill className="rounded-3xl" />
        <div
          className={
            "absolute right-0 top-0 w-4  aspect-square rounded-full border-[3px] border-slate-200 dark:border-neutral-950" +
            " bg-yellow-300"
          }
        ></div>
      </div>

      <div className="gap-1 flex flex-col  justify-center ">
        <div className="font-medium text-base ">{communicatorName}</div>
        {!currentStatus?.isSendingMessage && (
          <div className="text-sm text-slate-800 dark:text-slate-200">
            {lastConversation != undefined && lastConversation.lastMessage}
          </div>
        )}

        {newMessage != undefined && <div className="text-sm text-blue-500">{newMessage.latestMessage}</div>}

        {currentStatus?.isSendingMessage && (
          <div className="text-sm text-slate-800 dark:text-slate-200">
            {currentStatus.sendingMessageType == "textMessage" && "typing..."}
            {currentStatus.sendingMessageType == "voiceMessage" && "recording..."}
          </div>
        )}
      </div>

      <div className="gap-1 ml-auto flex flex-col  justify-center items-end">
        <div className="text-xs text-slate-800 dark:text-slate-200">{lastMessageTime.toLocaleDateString()}</div>
        <div className="text-base">
          {newMessage != undefined && (
            <div className="p-2  w-8 text-sm aspect-square flex items-center justify-center  bg-blue-500 rounded-full">
              {newMessage.totalNewMessageCount}
            </div>
          )}

          {newMessage == undefined && currentStatus?.isSendingMessage == undefined && (
            <div className="text-green-500">seen</div>
          )}
        </div>
      </div>
    </div>
  )
}
