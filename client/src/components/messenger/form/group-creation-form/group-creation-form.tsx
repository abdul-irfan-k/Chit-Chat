"use client"
import React, { useState } from "react"
import AddMembersFrom from "../add-members-form/add-members-form"
import { useAppDispatch } from "@/store"
import { createGroupHandler } from "@/redux/actions/chat-action/chat-action"

const GroupCreationForm = () => {
  const dispatch = useAppDispatch()
  const [groupName, setGroupName] = useState<string>("")
  const [groupMembers, setGroupMembers] = useState<Array<{ userId: string; _id: string }>>([])
  const [isPopUpedAddMemberFrom, setIsPopUpedAddMemberFrom] = useState<boolean>(false)

  const onMemberSelectHandler = () => {}
  const closePopUpedMemberFormHandler = () => setIsPopUpedAddMemberFrom(false)
  const createGroupButtonHandler = () => {
    const members = groupMembers.map((member) => {
      return { userId: member._id }
    })
    console.log("members",members)
    dispatch(createGroupHandler({ groupName, groupMembers: members }))
  }

  return (
    <>
      {!isPopUpedAddMemberFrom && (
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
              {groupMembers.map((member, index) => {
                return (
                  <div className="mt-3 px-4 py-2 rounded-full bg-slate-300 dark:bg-neutral-800" key={index}>
                    {member.userId}
                  </div>
                )
              })}
              <div className="mt-3 px-4 py-2 rounded-full bg-blue-500" onClick={() => setIsPopUpedAddMemberFrom(true)}>
                add members
              </div>
            </div>

            <div className="mt-10 gap-10 flex ">
              <div className="px-5 py-2 flex flex-1 items-center justify-center rounded-full text-lg border-2 border-red-500 text-red-500">
                Cancel
              </div>
              <div
                className="px-5 py-2 flex flex-1 items-center justify-center rounded-full text-lg bg-blue-500"
                onClick={createGroupButtonHandler}
              >
                Create Group
              </div>
            </div>
          </div>
        </div>
      )}

      {isPopUpedAddMemberFrom && (
        <AddMembersFrom
          selectedGroupMembers={groupMembers}
          setGroupMembers={setGroupMembers}
          onCloseHandler={closePopUpedMemberFormHandler}
        />
      )}
    </>
  )
}

export default GroupCreationForm
