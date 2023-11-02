"use client"
import { createGroupMeetingHandler } from "@/redux/actions/call-action/call-action"
import { useAppDispatch } from "@/store"
import React, { useState } from "react"
import { useRouter } from "next/navigation"
import { userDetailState } from "@/redux/reducers/user-redicer/user-reducer"
import { useSelector } from "react-redux"

const CreateGroupMeetingForm = () => {
  const dispatch = useAppDispatch()
  const [meetingName, setMeetingName] = useState<string>("")
  const router = useRouter()
  const { userDetail } = useSelector((state: { userDetail: userDetailState }) => state.userDetail)


  const createMeetingButtonHandler = () => {
    dispatch(createGroupMeetingHandler({ meetingName ,userId:userDetail._id}, router))
  }
  return (
    <div className="px-10 py-10  h-[90%] w-full  rounded-2xl md:bg-slate-200 md:dark:bg-neutral-950 md:w-[80%]">
      <div className="md:w-[40%]">
        <div className="text-4xl font-bold ">Meeting</div>
        <div className="my-5 text-2xl font-medium">Group Meeting</div>

        <div className="mt-10 text-sm ">Meeting name</div>
        <div className="mt-1 w-full">
          <input
            type="text"
            className="px-4 py-2 w-full rounded-full border-none text-base font-medium bg-slate-300  dark:bg-neutral-900"
            placeholder="enter the meeting name "
            onChange={(e) => {
              setMeetingName(e.target.value)
            }}
          />
        </div>
        <div
          className="py-2 mt-10 w-full rounded-full flex  items-center justify-center bg-blue-500 "
          onClick={createMeetingButtonHandler}
        >
          Create Meeting
        </div>
      </div>
    </div>
  )
}

export default CreateGroupMeetingForm
