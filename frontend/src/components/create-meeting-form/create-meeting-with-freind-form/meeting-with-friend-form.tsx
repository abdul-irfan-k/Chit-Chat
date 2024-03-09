import React from "react"

const CreateMeetingWithFriendForm = () => {
  return (
    <div className="px-10 py-10  h-[90%] w-[80%]  rounded-2xl md:bg-slate-200 md:dark:bg-neutral-950">
      <div className="md:w-[40%]">
        <div className="text-4xl font-bold ">Meeting</div>
        <div className="my-5 text-2xl font-medium">meeting with freind</div>
        <div className="flex  items-center">
          <div>
            <input
              type="text"
              className="px-4 py-2 rounded-full border-none text-base font-medium bg-slate-300  dark:bg-neutral-900"
              placeholder="enter the username"
            />
          </div>
          <div className="ml-3 px-8 py-2 select-auto text-base  rounded-full bg-blue-500">search</div>
        </div>
      </div>
    </div>
  )
}

export default CreateMeetingWithFriendForm
