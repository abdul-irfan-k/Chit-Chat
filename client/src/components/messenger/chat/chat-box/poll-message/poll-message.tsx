import Image from "next/image"
import React, { FC } from "react"

interface option {
  title: string
  _id: string
  votedMembers: {
    userId: string
  }[]
}
interface PollMessageProps {
  title: string
  options: option[]
  messegeChannelType: "incomingMessage" | "outgoingMessage"
  time: Date
  userName: string
  userImageSrc: string
  isContinuingConverstion?: Boolean
}

const PollMessage: FC<PollMessageProps> = ({
  options,
  title,
  messegeChannelType,
  time,
  userImageSrc,
  userName,
  isContinuingConverstion,
}) => {
  return (
    <div
      className={
        "gap-3 mb-5  clear-both  flex items-start" +
        (messegeChannelType == "incomingMessage" ? " float-lef" : " float-right flex-row-reverse")
      }
    >
      <div className="relative aspect-square w-14">
        <Image alt="user-image" src={userImageSrc} fill className="aspect-square rounded-2xl" />
      </div>
      <div className="gap-1 flex flex-col">
        <div className={"flex gap-1 items-center " + (messegeChannelType == "incomingMessage" ? "" : " ml-auto")}>
          <div className="font-medium text-base text-slate-950 dark:text-slate-50 ">{userName}</div>
          <div className="font-light text-xs text-slate-800 dark:text-slate-200">{time.toDateString()}</div>
        </div>

        <div
          className={
            "px-4 py-2 rounded-full" +
            (messegeChannelType == "incomingMessage" ? " bg-blue-500 text-slate-50" : " bg-slate-300 text-slate-950")
          }
        >
          <div>{title}</div>
          <div className="gap-2 mt-3 flex flex-col">
            {options.map((option, index) => {
              return (
                <div className="gap-2 flex " key={index}>
                  <div className="relative w-4 aspect-square rounded-full border-2 block"></div>
                  <div className="gap-1 flex flex-col">
                    <span>{option.title}</span>
                    <div className="flex -space-x-4 rtl:space-x-reverse">
                      <div className="relative w-10 h-10 border-2 border-white rounded-full dark:border-gray-800">
                        <Image src="/Asset/avatar.jpg" alt="image" fill />
                      </div>
                      <div className="relative w-10 h-10 border-2 border-white rounded-full dark:border-gray-800">
                        <Image src="/Asset/avatar.jpg" alt="image" fill />
                      </div>
                      <span className="flex items-center justify-center w-10 h-10 text-xs font-medium text-white bg-gray-700 border-2 border-white rounded-full hover:bg-gray-600 dark:border-gray-800">
                        +99
                      </span>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

export default PollMessage
