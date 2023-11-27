import Image from "next/image"
import { FC } from "react"

interface ChatListBoxInterface {
  imageSrc: string
  communicatorName: string
  lastMessageTime: Date
  lastConversation?: {
    lastMessage: string
  }
  newMessage?: {
    latestMessage?: string
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
      <div className="relative  w-14 aspect-square md:w-[20%] ">
        <Image src={imageSrc} alt="user-image" fill className="rounded-3xl" />
        <div
          className={
            "absolute right-0 top-0 w-4  aspect-square rounded-full border-[3px] border-slate-200 dark:border-neutral-950" +
            (onlineStatus ? " bg-green-500" : " bg-red-500")
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


export default ChatListBox