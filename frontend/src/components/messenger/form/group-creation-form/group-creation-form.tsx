"use client"
import React, { FC, useRef, useState } from "react"
import AddMembersFrom from "../add-members-form/add-members-form"
import { useAppDispatch } from "@/store"
import { createGroupHandler } from "@/redux/actions/chat-action/chat-action"
import useOutsideClick from "@/hooks/use-outside-click/use-outside-click"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"

interface GroupCreationFormProps {
  handleOutsideClick(): void
}
const GroupCreationForm: FC<GroupCreationFormProps> = ({ handleOutsideClick }) => {
  const dispatch = useAppDispatch()
  const [groupName, setGroupName] = useState<string>("")
  const [groupMembers, setGroupMembers] = useState<Array<{ userId: string; _id: string }>>([])
  const [isPopUpedAddMemberForm, setIsPopUpedAddMemberForm] = useState<boolean>(false)

  const groupCreationFormRef = useRef<HTMLDivElement>(null)

  const onMemberSelectHandler = () => {}
  const closeAddMemberForm = () => {
    setIsPopUpedAddMemberForm(false)
  }
  const handleCreateButtonClick = (event: React.MouseEvent) => {
    event.stopPropagation()
    const members = groupMembers.map((member) => {
      return { userId: member._id }
    })
    console.log("members", members)
    dispatch(createGroupHandler({ groupName, groupMembers: members }))
  }

  const handleCloseButtonClick = () => {
    handleOutsideClick()
  }

  return (
    <>
      {!isPopUpedAddMemberForm && (
        <div className="fixed left-0 top-0 w-screen h-screen z-[200]" style={{ background: "rgba(0,0,0,0.9 )" }}>
          <div
            className="absolute  py-5 w-[50%]  left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] flex flex-col rounded-lg  z-50 dark:bg-background-primary"
            ref={groupCreationFormRef}
          >
            <div className="px-10  py-5 flex justify-between bg-background-secondary">
              <span className="text-2xl font-medium">Create Group</span>

              <Button onClick={handleCloseButtonClick} rounded size={"icon"}>
                <X className="relative w-5 aspect-square" />
              </Button>
            </div>

            <div className="px-10 mt-10 flex-1 border-b-[3px] border-neutral-800">
              <span className="text-lg">Group Name</span>
              <input
                type="text"
                placeholder="Enter Group Name"
                className="px-4 py-2 border-none rounded-md  outline-none w-full text-base border-none bg-background-secondary   dark:text-slate-50"
                onChange={(e) => setGroupName(e.target.value)}
              />
            </div>

            <div className="mt-10 gap-1 px-10 flex flex-col">
              <span className="text-lg">Members</span>
              <div className=" py-4 gap-2   flex flex-wrap border-[1px] rounded-xl">
                {groupMembers.map((member, index) => {
                  return (
                    <div className="mt-3 px-4 py-2 rounded-full bg-slate-300 dark:bg-neutral-800" key={index}>
                      {member.userId}
                    </div>
                  )
                })}
                <div
                  className="mt-3 px-4 py-2 rounded-full bg-blue-500"
                  onClick={(e) => {
                    e.stopPropagation()
                    setIsPopUpedAddMemberForm(true)
                  }}
                >
                  add members
                </div>
              </div>
            </div>

            <div className="px-10 mt-10 gap-10 flex ">
              <Button
                className="px-5 py-2 flex flex-1 items-center justify-center rounded-full text-lg  "
                onClick={handleCreateButtonClick}
              >
                Create Group
              </Button>
            </div>
          </div>
        </div>
      )}

      {isPopUpedAddMemberForm && (
        <AddMembersFrom
          selectedGroupMembers={groupMembers}
          setGroupMembers={setGroupMembers}
          onCloseHandler={closeAddMemberForm}
        />
      )}
    </>
  )
}

export default GroupCreationForm
