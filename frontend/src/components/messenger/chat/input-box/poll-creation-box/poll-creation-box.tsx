"use client"
import { ArrowLeftIcon, PersonIcon } from "@/constants/icon-constant"
import { useSocketIoContext } from "@/provider/socket-io-provider/socket-io-provider"
import { sendGroupPollMessageHandler } from "@/redux/actions/chat-action/chat-action"
import { chatUsersListReducerState } from "@/redux/reducers/chat-user-reducer/chat-user-reducer"
import { userDetailState } from "@/redux/reducers/user-redicer/user-reducer"
import { useAppDispatch } from "@/store"
import { Vote } from "lucide-react"
import React, { useState } from "react"
import { useSelector } from "react-redux"

const PollCreationBox = () => {
  const dispatch = useAppDispatch()
  const [question, setQuestion] = useState<string>("")
  const [options, setOptions] = useState<Array<{ title: string }>>([
    { title: "" },
    { title: "" },
    { title: "" },
    { title: "" },
    { title: "" },
    { title: "" },
  ])
  const [showPollCreationForm, setShowPollCreationForm] = useState<boolean>(false)
  const [currentUpdatingOption, setCurrentUpdatingOption] = useState<number>(0)

  const { userDetail } = useSelector((state: { userDetail: userDetailState }) => state.userDetail)
  const { currentChaterDetail } = useSelector(
    (state: { chatUsersList: chatUsersListReducerState }) => state.chatUsersList,
  )

  const { socket } = useSocketIoContext()
  const sendButtonHandler = () => {
    if (userDetail == null || currentChaterDetail == null || currentChaterDetail.currentChaterType == "user") return
    const filteredOptions = options.filter((option) => option.title.length > 0)

    dispatch(
      sendGroupPollMessageHandler(
        {
          chatRoomId: currentChaterDetail.chatRoomId,
          groupDetail: { _id: currentChaterDetail._id },
          message: { options: filteredOptions, title: question },
          postedByUser: userDetail.name,
          senderId: userDetail._id,
        },
        socket,
      ),
    )
  }

  return (
    <>
      <div className="gap-1 py-2 flex items-center" onClick={() => setShowPollCreationForm(true)}>
        <div className="relative w-5 aspect-square">
          <Vote className="w-5 aspect-square" />
        </div>
        <span className="text-base">Poll</span>
      </div>
      {showPollCreationForm && (
        <div className="fixed top-0 left-0 w-screen h-screen ">
          <div className="px-10 py-10 w-[40%] absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] dark:bg-neutral-950">
            <div className="gap-2 flex items-center">
              <div
                className="relative "
                onClick={(e) => {
                  e.stopPropagation()
                  setShowPollCreationForm(false)
                }}
              >
                <ArrowLeftIcon className="w-6 aspect-square" width="" height="" />
              </div>
              <h1 className="text-lg ">Create Poll</h1>
            </div>

            <div className="mt-5 gap-1 flex flex-col">
              <span className="text-blue-500">Question</span>
              <div className="flex-1 border-b-[3px] border-neutral-800">
                <input
                  type="text"
                  placeholder="Enter Group Name"
                  className="px-4 pt-2 border-none rounded-md  w-full text-base border-b-[1px] border-slate-400 hover:border-blue-500    dark:bg-neutral-950  dark:text-slate-50"
                  name="firstname"
                  onChange={(e) => setQuestion(e.target.value)}
                />
              </div>
            </div>
            <div className="mt-5 gap-1 flex flex-col">
              <span className="">options</span>
              <div className="gap-2 pl-5 flex flex-col">
                {options.map((option, index) => {
                  const isLastValNotEmpty = index == 0 ? true : options[index - 1].title.length > 0 ? true : false
                  const isCurrentUpdating = currentUpdatingOption == index

                  return (
                    <div key={index}>
                      {isLastValNotEmpty && (
                        <div
                          className="border-b-[1px] border-slate-400 "
                          style={{
                            borderColor: isCurrentUpdating
                              ? "rgb(59 130 246 / var(--tw-bg-opacity))"
                              : "rgb(148 163 184 / var(--tw-border-opacity))",
                          }}
                        >
                          <input
                            type="text"
                            placeholder="+ Add"
                            className="px-4 pt-2 border-none rounded-md  w-full text-base  outline-none hover:outline-none hover:border-none    dark:bg-neutral-950  dark:text-slate-50 "
                            name="firstname"
                            onChange={(e) => {
                              setCurrentUpdatingOption(index)
                              if (e.target.value.length < 1) {
                                const updatedOptions = options.filter((option, i) => i != index)
                                updatedOptions.push({ title: "" })
                                setOptions(updatedOptions)
                              } else {
                                const updatedOptions = options.map((option, i) => {
                                  if (i == index) return { title: e.target.value }
                                  else return option
                                })
                                setOptions(updatedOptions)
                              }
                            }}
                          />
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>
            <div
              className="mt-5 px-4 py-2 rounded-full bg-blue-500 flex items-center justify-center"
              onClick={sendButtonHandler}
            >
              send
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default PollCreationBox
