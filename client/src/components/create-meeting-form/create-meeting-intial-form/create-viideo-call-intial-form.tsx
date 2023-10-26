import { GroupIcon, PersonIcon, SchoolIcon } from "@/constants/icon-constant"
import { socketReducerState } from "@/redux/reducers/socket-reducer/socket-reducers"
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

  const { socket } = useSelector((state: { socketClient: socketReducerState }) => state.socketClient)
  const { userDetail } = useSelector((state: { userDetail: userDetailState }) => state.userDetail)

  const joinButtonHandler = () => {
    if (userDetail == null) return
    socket.emit("groupCall:joinRequest", { userId: userDetail?._id, referenceId: meetingCode ,userName:userDetail.name})
  }

  return (
    <div className="px-10 py-10 bg-slate-200 h-[90%] w-[80%]  rounded-2xl dark:bg-neutral-950">
      <div className="w-[40%]">
        <div className="text-4xl font-bold ">Meeting</div>
        <div className="my-5 text-2xl font-medium">premimum video meeting now free for everyone</div>

        <div className="my-5 text-sm text-slate-800 dark:text-slate-100">
          We are engineered the service that we built for secure business meetings, to makte it free and available
          service
        </div>

        <div className="flex  items-center">
          <div>
            <input
              type="text"
              className="px-4 py-2 rounded-full border-none text-base font-medium bg-slate-300  dark:bg-neutral-900"
              placeholder="enter the code"
              onChange={(e) => setMeetingCode(e.target.value)}
            />
          </div>
          <div className="ml-3 px-8 py-2 select-auto text-base  rounded-full bg-blue-500">join</div>
        </div>

        <div className="my-10 text-2xl font-medium">Create New Meeting</div>
        <div className="gap-3 my-5 flex justify-between">
          <div
            className=" p-2  flex-1  aspect-square rounded-md bg-slate-300 fill-slate-950 dark:fill-slate-50 dark:bg-neutral-900"
            onClick={() => setMeetingFormType("freindMeeting")}
          >
            <div className="h-[50%] flex items-center justify-center">
              <PersonIcon className="w-10 aspect-square" height="" width="" />
            </div>
            <div className="text-center text-sm ">meeting with freind</div>
          </div>
          <div
            className=" p-2  flex-1  aspect-square rounded-md bg-slate-300 fill-slate-950 dark:fill-slate-50 dark:bg-neutral-900"
            onClick={() => setMeetingFormType("groupMeeting")}
          >
            <div className="h-[50%] flex items-center justify-center">
              <GroupIcon className="w-10 aspect-square" height="" width="" />
            </div>
            <div className="text-center text-sm ">group meeting</div>
          </div>
          <div
            className=" p-2  flex-1  aspect-square rounded-md bg-slate-300 fill-slate-950 dark:fill-slate-50 dark:bg-neutral-900"
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
