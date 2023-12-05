import { CorrectIcon } from "@/constants/icon-constant"
import useDebounce from "@/hooks/use-debounce/use-debounce"
import { useSocketIoContext } from "@/provider/socket-io-provider/socket-io-provider"
import Image from "next/image"
import React, { FC, useState } from "react"

interface option {
  title: string
  _id: string
  votedMembers: {
    userId: string
  }[]
}
interface PollMessageProps {
  _id: string
  title: string
  options: option[]
  messegeChannelType: "incomingMessage" | "outgoingMessage"
  time: Date
  userName: string
  userImageSrc: string
  isContinuingConverstion?: Boolean

  userAndChaterDetails?: PollMessageUpdateSocketArgument
}

interface PollMessageUpdateSocketArgument {
  senderId: string
  chatRoomId: string
  groupDetail?: {
    _id: string
  }
}

const PollMessage: FC<PollMessageProps> = ({
  _id,
  options,
  title,
  messegeChannelType,
  time,
  userImageSrc,
  userName,
  isContinuingConverstion,
  userAndChaterDetails,
}) => {
  const [selectedOption, setSelectedOption] = useState<number | undefined>(undefined)
  const { socket } = useSocketIoContext()

  useDebounce(
    () => {
      if (selectedOption == undefined || userAndChaterDetails == undefined) return
      console.log("debounce", options[selectedOption])

      socket.emit("groupMessage:pollMessageVoteUpdate", {
        ...userAndChaterDetails,
        message: { _id, selectedOption: { _id: options[selectedOption]._id } },
      })
    },
    2000,
    [selectedOption],
  )
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
            "px-5 py-5 w-[30vw] rounded-xl" +
            (messegeChannelType == "incomingMessage" ? " bg-neutral-800 text-slate-50" : " bg-neutral-800 text-slate-50")
          }
        >
          <div className="text-xl font-medium">{title}</div>
          <div className="gap-4 mt-3 flex flex-col">
            {options.map((option, index) => {
              const isSelectedOption: boolean = selectedOption == index
              const isVotedForOption =
                option.votedMembers.filter((member) => member.userId == userAndChaterDetails?.senderId).length > 0
              const isVotedForCurrentOption = selectedOption == undefined ? isVotedForOption : isSelectedOption

              return (
                <div key={index}>
                  <div className="relative gap-2 flex items-center">
                    <div
                      className="relative w-6 flex justify-center items-center aspect-square rounded-full border-2 block"
                      onClick={() => setSelectedOption(index)}
                    >
                      {isVotedForCurrentOption && <CorrectIcon className="w-5 aspect-square" width="" height="" />}
                    </div>
                    <div className="gap-1 flex w-full items-center">
                      <div className="">{option.title}</div>
                      <div className="w-full  flex justify-end">
                        <div className=" flex -space-x-3 rtl:space-x-reverse">
                          <div className="relative w-10 h-10 border-2 border-white rounded-full dark:border-gray-800 overflow-hidden">
                            <Image src="/Asset/avatar.jpg" alt="image" fill />
                          </div>
                          <div className="relative w-10 h-10 border-2 border-white rounded-full dark:border-gray-800 overflow-hidden">
                            <Image src="/Asset/avatar.jpg" alt="image" fill />
                          </div>
                          <span className="flex items-center justify-center w-10 h-10 text-xs font-medium text-white bg-gray-700 border-2 border-white rounded-full hover:bg-gray-600 dark:border-gray-800">
                            {option.votedMembers.length}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-2 w-full h-3 rounded-full block dark:bg-neutral-900">
                    <div className="w-[50%] h-3 rounded-full block bg-blue-500"></div>
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
