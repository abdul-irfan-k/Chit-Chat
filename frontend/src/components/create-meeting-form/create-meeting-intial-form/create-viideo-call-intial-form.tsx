import { GroupIcon, PersonIcon, SchoolIcon } from "@/constants/icon-constant"
import { useSocketIoContext } from "@/provider/socket-io-provider/socket-io-provider"
import { userDetailState } from "@/redux/reducers/user-redicer/user-reducer"
import React, { FC, useState } from "react"
import { useSelector } from "react-redux"

interface CreateGroupMeetingFormProps {
  setMeetingFormType: React.Dispatch<
    React.SetStateAction<"freindMeeting" | "groupMeeting" | "classRoomMeeting" | undefined>
  >
}
const CreateMeetingInitialForm: FC<CreateGroupMeetingFormProps> = ({ setMeetingFormType }) => {
  const [meetingCode, setMeetingCode] = useState<string>("")

  const {socket} = useSocketIoContext()
  const { userDetail } = useSelector((state: { userDetail: userDetailState }) => state.userDetail)

  const joinButtonHandler = () => {
    if (userDetail == null) return
    socket.emit("groupCall:joinRequest", {
      userId: userDetail?._id,
      referenceId: meetingCode,
      userName: userDetail.name,
    })
  }

  return (
    <div className="px-10 py-10   h-full w-full  rounded-2xl md:bg-slate-200 md:dark:bg-neutral-950 md:w-[80%] md:h-[90%]">
      <div className=" md:w-[50%]">
        <div className="text-4xl font-bold ">Meeting</div>
        <div className="my-5 text-2xl font-medium">premimum video meeting now free for everyone</div>

        <div className="my-5 text-sm text-slate-800 dark:text-slate-100">
          We are engineered the service that we built for secure business meetings, to makte it free and available
          service
        </div>

        <div className="flex  items-center">
          <div className="flex-1">
            <input
              type="text"
              className="w-full px-4 py-2 rounded-full border-none text-base font-medium bg-slate-300  dark:bg-neutral-900"
              placeholder="enter the code"
              onChange={(e) => setMeetingCode(e.target.value)}
            />
          </div>
          <div
            className="ml-3  px-4 py-2 select-auto text-base  rounded-full bg-blue-500 md:px-8"
            onClick={joinButtonHandler}
          >
            join
          </div>
        </div>

        <div className="my-10 text-2xl font-medium">Create New Meeting</div>
        <div className="gap-3 my-5 flex justify-between md:gap-6">
          <div
            className=" p-2  w-[35%]    aspect-square rounded-md bg-slate-300 fill-slate-950 dark:fill-slate-50 dark:bg-neutral-900 md:flex-1 md:w-[45%] "
            onClick={() => setMeetingFormType("freindMeeting")}
          >
            <div className="h-[50%] flex items-center justify-center">
              <PersonIcon className="w-10 aspect-square" height="" width="" />
            </div>
            <div className="text-center text-sm ">meeting with freind</div>
          </div>
          <div
            className=" p-2  w-[35%]    aspect-square rounded-md bg-slate-300 fill-slate-950 dark:fill-slate-50 dark:bg-neutral-900 md:flex-1 md:w-[45%] "
            onClick={() => setMeetingFormType("groupMeeting")}
          >
            <div className="h-[50%] flex items-center justify-center">
              <GroupIcon className="w-10 aspect-square" height="" width="" />
            </div>
            <div className="text-center text-sm ">group meeting</div>
          </div>
          <div
            className=" p-2  w-[35%]    aspect-square rounded-md bg-slate-300 fill-slate-950 dark:fill-slate-50 dark:bg-neutral-900 md:flex-1 md:w-[45%] "
            onClick={() => setMeetingFormType("classRoomMeeting")}
          >
            <div className="h-[50%] flex items-center justify-center">
              <SchoolIcon className="w-10 aspect-square" height="" width="" />
            </div>
            <div className="text-center text-sm ">class room meeting</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CreateMeetingInitialForm
