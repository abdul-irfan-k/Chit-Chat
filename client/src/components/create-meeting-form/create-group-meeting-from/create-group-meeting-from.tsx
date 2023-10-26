import React from "react"

const CreateGroupMeetingForm = () => {
  return (
    <div className="px-10 py-10 bg-slate-200 h-[90%] w-[80%]  rounded-2xl dark:bg-neutral-950">
      <div className="w-[40%]">
        <div className="text-4xl font-bold ">Meeting</div>
        <div className="my-5 text-2xl font-medium">Group Meeting</div>

        <div className="mt-10 text-sm ">Meeting name</div>
        <div className="mt-1 w-full">
          <input
            type="text"
            className="px-4 py-2 w-full rounded-sm border-none text-base font-medium bg-slate-300  dark:bg-neutral-900"
            placeholder="enter the meeting name "
          />
        </div>
        <div className="py-2 mt-10 w-full rounded-full flex  items-center justify-center bg-blue-500 ">Create Meeting</div>
      </div>
    </div>
  )
}

export default CreateGroupMeetingForm
