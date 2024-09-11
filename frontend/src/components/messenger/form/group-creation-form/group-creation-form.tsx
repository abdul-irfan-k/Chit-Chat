"use client"
import React, { FC, useRef, useState } from "react"
import AddMembersFrom from "../add-members-form/add-members-form"
import { useAppDispatch } from "@/store"
import { createGroupHandler } from "@/redux/actions/chat-action/chat-action"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"
import Image from "next/image"
import { AddIcon } from "@/constants/icon-constant"

interface GroupCreationFormProps {
  handleOutsideClick(): void
  handleCloseButtonClick(): void
}
const GroupCreationForm: FC<GroupCreationFormProps> = ({ handleCloseButtonClick }) => {
  const dispatch = useAppDispatch()

  const inputRef = useRef<HTMLInputElement>(null)
  const groupCreationFormRef = useRef<HTMLDivElement>(null)

  const [selectedImage, setSelectedImage] = useState<FormData | undefined>(undefined)
  const [name, setName] = useState<string>("")
  const [members, setMembers] = useState<Array<{ name: string; _id: string; profileImageUrl: string }>>([])
  const [isPopUpedAddMemberForm, setIsPopUpedAddMemberForm] = useState<boolean>(false)
  const [selectedimageUrl, setSelectedImageUrl] = useState<string | undefined>(undefined)

  const handleCreateButtonClick = (event: React.MouseEvent) => {
    //@ts-ignore
    const membersUpdatedData = members.map((member) => {
      return { userId: member._id }
    })
    dispatch(createGroupHandler({ name, members: membersUpdatedData, formData: selectedImage }))
  }

  const addImageButtonHandler = () => {
    if (inputRef == null || inputRef.current == null) return
    inputRef.current.click()
  }

  const handleInputFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files[0]) return
    const url = URL.createObjectURL(event.target.files[0])
    setSelectedImageUrl(url)

    //@ts-ignore
    const formData = new FormData()
    formData.append("image", event.target.files[0])

    setSelectedImage(formData)
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

            <div
              className="relative ml-10 mt-10 w-[20%] aspect-square rounded-full overflow-hidden "
              style={{ background: "rgba(255,255,255,0.1)" }}
              onClick={addImageButtonHandler}
            >
              {selectedimageUrl != undefined && <Image src={selectedimageUrl} alt="profile image" fill />}
              <div className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] ">
                <div className="relative ">
                  <AddIcon width="" height="" className="w-10 aspect-square" />
                </div>
              </div>

              <div className="absolute">
                <input type="file" style={{ display: "none" }} ref={inputRef} onChange={handleInputFileChange} />
              </div>
            </div>

            <div className="px-10 mt-10 flex-1 border-b-[3px] border-neutral-800">
              <span className="text-lg">Group Name</span>
              <input
                type="text"
                placeholder="Enter Group Name"
                className="px-4 py-2 border-none rounded-md  outline-none w-full text-base border-none bg-background-secondary   dark:text-slate-50"
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="mt-10 gap-1 px-10 flex flex-col">
              <span className="text-lg">Members</span>
              <div className=" py-4 gap-2   flex flex-wrap border-[1px] rounded-xl">
                {members.map((member, index) => {
                  return (
                    <div
                      className="mt-3 px-4 py-2 gap-1 flex  rounded-full bg-slate-300 dark:bg-background-secondary"
                      key={index}
                    >
                      <div className="relative w-8 aspect-square rounded-full overflow-hidden">
                        <Image src={member.profileImageUrl} alt="profile image" fill />
                      </div>
                      {member.name}
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
          members={members}
          setMembers={setMembers}
          handleOutsideClick={() => setIsPopUpedAddMemberForm(false)}
        />
      )}
    </>
  )
}

export default GroupCreationForm
