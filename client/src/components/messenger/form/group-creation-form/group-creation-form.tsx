"use client"
import React, { useState } from "react"

const GroupCreationForm = () => {
  const [groupName, setGroupName] = useState<string>("")
  const [groupMember, setGroupMember] = useState<Array<{ userId: string; userName: string; _id: string }>>([])
  return (
    <div className="fixed left-0 top-0 w-screen h-screen z-30" style={{ background: "rgba(0,0,0,0.9 )" }}>
      <div className="absolute px-5 py-5 w-[50%]  left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] flex flex-col rounded-lg  z-50 dark:bg-neutral-950">
        <h1 className="font-semibold text-4xl">Group</h1>

        <div className="mt-10 flex-1 border-b-[3px] border-neutral-800">
          <input
            type="text"
            placeholder="Enter Group Name"
            className="px-4 py-2 border-none rounded-md  w-full text-base   dark:bg-neutral-950  dark:text-slate-50"
            name="firstname"
            onChange={(e) => setGroupName(e.target.value)}
          />
        </div>

        <div className="px-4 py-4 gap-2  mt-10 flex flex-wrap border-[1px] rounded-xl">
            <div className="mt-3 px-4 py-2 rounded-full bg-slate-300 dark:bg-neutral-800">irfan</div>
            <div className="mt-3 px-4 py-2 rounded-full bg-slate-300 dark:bg-neutral-800">kaleel</div>
            <div className="mt-3 px-4 py-2 rounded-full bg-slate-300 dark:bg-neutral-800">arif</div>
            <div className="mt-3 px-4 py-2 rounded-full bg-slate-300 dark:bg-neutral-800">mohammad imran ajmeer</div>
            <div className="mt-3 px-4 py-2 rounded-full bg-slate-300 dark:bg-neutral-800">irfan</div>
            <div className="mt-3 px-4 py-2 rounded-full bg-slate-300 dark:bg-neutral-800">kaleel</div>
            <div className="mt-3 px-4 py-2 rounded-full bg-slate-300 dark:bg-neutral-800">arif</div>
            <div className="mt-3 px-4 py-2 rounded-full bg-slate-300 dark:bg-neutral-800">mohammad imran ajmeer</div>
            <div className="mt-3 px-4 py-2 rounded-full bg-slate-300 dark:bg-neutral-800">irfan</div>
            <div className="mt-3 px-4 py-2 rounded-full bg-slate-300 dark:bg-neutral-800">kaleel</div>
            <div className="mt-3 px-4 py-2 rounded-full bg-slate-300 dark:bg-neutral-800">arif</div>
            <div className="mt-3 px-4 py-2 rounded-full bg-slate-300 dark:bg-neutral-800">mohammad imran ajmeer</div>
            <div className="mt-3 px-4 py-2 rounded-full bg-blue-500">add members</div>
        </div>

        <div className="mt-10 gap-10 flex ">
          <div className="px-5 py-2 flex flex-1 items-center justify-center rounded-full text-lg border-2 border-red-500 text-red-500">Cancel</div>
          <div className="px-5 py-2 flex flex-1 items-center justify-center rounded-full text-lg bg-blue-500">Create Group</div>
        </div>
      </div>
    </div>
  )
}

export default GroupCreationForm
