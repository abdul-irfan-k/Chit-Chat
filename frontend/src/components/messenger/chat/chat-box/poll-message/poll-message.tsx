import { CorrectIcon } from "@/constants/icon-constant"
import useDebounce from "@/hooks/use-debounce/use-debounce"
import { useSocketIoContext } from "@/provider/socket-io-provider/socket-io-provider"
import { pollMessage } from "@/redux/reducers/message-reducer/message-reducer"
import { userDetailState } from "@/redux/reducers/user-redicer/user-reducer"
import Image from "next/image"
import React, { FC, useState } from "react"
import { useSelector } from "react-redux"

interface PollMessageProps extends pollMessage {
  messegeChannelType: "incomingMessage" | "outgoingMessage"
  userAndChaterDetails?: PollMessageUpdateSocketArgument
  userName: string
  userImageSrc: string
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
  postedByUser,
  reactions,
  userAndChaterDetails,
  messegeChannelType,
  messageSendedTime,
  userImageSrc,
  userName,
}) => {
  const [selectedOption, setSelectedOption] = useState<number | undefined>(undefined)
  const { socket } = useSocketIoContext()

  const { userDetail } = useSelector((state: { userDetail: userDetailState }) => state.userDetail)

  useDebounce(
    () => {
      if (selectedOption == undefined || userAndChaterDetails == undefined) return

      socket.emit("groupMessage:pollMessageVoteUpdate", {
        ...userAndChaterDetails,
        message: { _id, selectedOption: { _id: options[selectedOption]._id } },
      })
    },
    2000,
    [selectedOption],
  )
  return (
    <div className={"gap-5  flex items-start" + (messegeChannelType == "incomingMessage" ? " " : "  flex-row-reverse")}>
      <div className="relative aspect-square w-14">
        <Image alt="user-image" src={userImageSrc} fill className="aspect-square rounded-2xl" />
      </div>
      <div className="gap-1 flex flex-col">
        <div className={"flex gap-1 items-center " + (messegeChannelType == "incomingMessage" ? "" : " ml-auto")}>
          <div className="font-medium text-base text-slate-950 dark:text-slate-50 ">{userName}</div>
          <div className="font-light text-xs text-slate-800 dark:text-slate-200">{new Date().toDateString()}</div>
        </div>

        <div
          className={
            "relative mt-5 px-4 py-4 w-[30vw] ml-auto " +
            (messegeChannelType == "incomingMessage"
              ? " bg-[#3a62b8] text-slate-50 rounded-[5px] rounded-tl-none "
              : " bg-[#191b1f] text-slate-50 rounded-[5px]")
          }
        >
          <div className="text-xl font-medium">{title}</div>
          <div className="gap-4 mt-3 flex flex-col">
            {options.map((option, index) => {
              const isSelectedOption: boolean = selectedOption == index
              const isVotedForOption = option.votedMembers.some((member) => member.userId == userDetail?._id)
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
                          {option.votedMembers.map((votedMember) => {
                            return (
                              <div
                                className="relative w-10 h-10 border-2 border-white rounded-full dark:border-gray-800 overflow-hidden"
                                key={votedMember.userId}
                              >
                                <Image src="/Asset/avatar.jpg" alt="image" fill />
                              </div>
                            )
                          })}

                          <span className="flex items-center justify-center w-10 h-10 text-xs font-medium text-white bg-gray-700 border-2 border-white rounded-full hover:bg-gray-600 dark:border-gray-800">
                            {option.votedMembers.length}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-2 w-full h-2 rounded-full block dark:bg-neutral-800">
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
