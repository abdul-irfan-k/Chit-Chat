"use client"
import { Button } from "@/components/ui/button"
import { ArrowLeftIcon, PersonIcon } from "@/constants/icon-constant"
import { useSocketIoContext } from "@/provider/socket-io-provider/socket-io-provider"
import { sendGroupPollMessageHandler } from "@/redux/actions/chat-action/chat-action"
import { chatUsersListReducerState } from "@/redux/reducers/chat-user-reducer/chat-user-reducer"
import { userDetailState } from "@/redux/reducers/user-redicer/user-reducer"
import { useAppDispatch } from "@/store"
import { Vote, X } from "lucide-react"
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
  const [isPollCreationFormVisible, setPollCreationFormVisibility] = useState<boolean>(false)
  const [currentOptionIndex, setCurrentOptionIndex] = useState<number>(0)

  const { userDetail } = useSelector((state: { userDetail: userDetailState }) => state.userDetail)
  const { currentChaterDetail } = useSelector(
    (state: { chatUserAndGroupList: chatUsersListReducerState }) => state.chatUserAndGroupList,
  )

  const { socket } = useSocketIoContext()
  const handleSendButtonClick = () => {
    if (userDetail == null || currentChaterDetail == null || currentChaterDetail.currentChaterType == "group") return
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
      <div className="gap-1 py-2 flex items-center" onClick={() => setPollCreationFormVisibility(true)}>
        <div className="relative w-5 aspect-square">
          <Vote className="w-5 aspect-square" />
        </div>
        <span className="text-base ">Poll</span>
      </div>
      {isPollCreationFormVisible && (
        <div className="fixed top-0 left-0 w-screen h-screen bg-[rgba(0,0,0,.5)] ">
          <div className="  w-[45%] max-h-[95vh] overflow-y-scroll absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] dark:bg-background-primary">
            <div className="px-10  py-5 flex justify-between bg-background-secondary">
              <span className="text-2xl font-medium">Poll</span>

              <Button onClick={() => setPollCreationFormVisibility(false)} rounded size={"icon"}>
                <X className="relative w-5 aspect-square" />
              </Button>
            </div>

            <div className="px-10 mt-5 gap-1 flex flex-col">
              <span className="text-lg">Question</span>
              <input
                type="text"
                placeholder="Question"
                className="px-4 py-2 border-none rounded-md  outline-none w-full text-base border-none bg-background-secondary   dark:text-slate-50"
                onChange={(e) => setQuestion(e.target.value)}
              />
            </div>
            <div className="px-10 mt-5 gap-1 flex flex-col">
              <span className="text-lg">options</span>
              <div className="gap-2  flex flex-col">
                {options.map((option, index) => {
                  const isLastValNotEmpty = index == 0 ? true : options[index - 1].title.length > 0 ? true : false

                  return (
                    <div key={index}>
                      {isLastValNotEmpty && (
                        <div>
                          <input
                            type="text"
                            placeholder="+ Add"
                            className="px-4 py-2 border-none rounded-md  outline-none w-full text-base border-none bg-background-secondary   dark:text-slate-50"
                            name="firstname"
                            onChange={(e) => {
                              setCurrentOptionIndex(index)
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
            <div className="px-10 pb-10 mt-10 flex ">
              <Button className="w-full">Create Poll</Button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default PollCreationBox
