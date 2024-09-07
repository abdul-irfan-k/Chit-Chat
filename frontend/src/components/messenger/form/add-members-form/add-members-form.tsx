import { axiosUserInstance } from "@/constants/axios"
import useDebounce from "@/hooks/use-debounce/use-debounce"
import Image from "next/image"
import React, { FC, useEffect, useState } from "react"

interface AddMembersFormProps {
  selectedGroupMembers: { userId: string; _id: string }[]
  setGroupMembers: React.Dispatch<React.SetStateAction<{ userId: string; _id: string }[]>>
  onCloseHandler(): void
}
const AddMembersFrom: FC<AddMembersFormProps> = ({ selectedGroupMembers, setGroupMembers, onCloseHandler }) => {
  const [searchInput, setSearchInput] = useState<String>("")
  const [searchResult, setSearchResult] = useState<Array<{ name: string; userId: string; _id: string }>>([])

  const onMemberSelectHandler = (userDetail: { userId: string; _id: string }, selected: boolean) => {
    if (selected) {
      const isAlreadyAvailableMember = selectedGroupMembers.some((member) => member._id == userDetail._id)
      if (isAlreadyAvailableMember) return
      setGroupMembers([...selectedGroupMembers, { _id: userDetail._id, userId: userDetail.userId }])
    } else {
      const updatedMembers = selectedGroupMembers.filter((member) => member._id != userDetail._id)
      setGroupMembers(updatedMembers)
    }
  }

  const [isRequiredToUpdate, setIsRequiredToUpdate] = useState<boolean>(false)
  const searchInputOnChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    // console.log('changed')
    setSearchInput(e.target.value)
    setIsRequiredToUpdate(true)
  }

  useDebounce(
    async () => {
      if (!isRequiredToUpdate) return
      const { data } = await axiosUserInstance.post("/getUserDetailByUserId")
      setIsRequiredToUpdate(false)
      setSearchResult([...data])
    },
    500,
    [searchInput],
  )
  return (
    <div className="fixed left-0 top-0 w-screen h-screen z-30" style={{ background: "rgba(0,0,0,0.97 )" }}>
      <div className="h-full w-[50%] mx-auto my-10 flex flex-col">
        <div className="px-3 py-3 rounded-full  bg-neutral-950 border-[1px] border-slate-400">
          <div className="flex-1">
            <input
              type="text"
              className="w-full px-3 bg-transparent border-none outline-none text-slate-50"
              placeholder="search the freinds "
              onChange={searchInputOnChangeHandler}
            />
          </div>
        </div>

        <div className="mt-10 px-6 py-6 rounded-3xl  bg-neutral-950">
          <div className="mt-2">
            {/* <SearchUserList /> */}

            <div className="mt-3 gap-3 flex flex-col h-[50vh] overflow-y-scroll no-scrollbar">
              {searchResult.map((result, index) => {
                return (
                  <div key={index}>
                    <AddMembersFromCard
                      userId={result.userId}
                      _id={result._id}
                      onSelectHandler={onMemberSelectHandler}
                      profileImageSrc="/Asset/avatar.jpg"
                      userName="irfan"
                    />
                  </div>
                )
              })}
            </div>

            <div className="mt-5">selected users</div>
            <div className=" gap-2  mt-2 flex flex-wrap  rounded-xl">
              {selectedGroupMembers.map((member, index) => {
                return (
                  <div className="px-4 py-2 rounded-full bg-slate-300 dark:bg-neutral-800" key={index}>
                    {member.userId}
                  </div>
                )
              })}
            </div>
            <div className="gap-5 mt-5 flex items-center ">
              <div
                className="px-5 py-2 flex  items-center justify-center rounded-full text-lg border-2 border-red-500 text-red-500"
                onClick={() => {
                  setGroupMembers([])
                  onCloseHandler()
                }}
              >
                Cancel
              </div>
              <div
                className="px-5 py-2 flex  items-center justify-center rounded-full text-lg bg-blue-500"
                onClick={onCloseHandler}
              >
                Add
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AddMembersFrom

interface addMembersFromCardProps {
  userName: string
  userId: string
  _id: string
  profileImageSrc: string
  isHovered?: boolean
  onSelectHandler(userDetail: { userId: string; _id: string }, selected: boolean): void
}
const AddMembersFromCard: FC<addMembersFromCardProps> = ({
  userId,
  isHovered,
  profileImageSrc,
  onSelectHandler,
  _id,
}) => {
  const [isChecked, setIsChecked] = useState<boolean>(false)

  return (
    <div
      className="gap-2 py-1 flex items-center  rounded-full"
      style={{ background: isHovered ? "rgb(23 23 23 / var(--tw-bg-opacity))" : "" }}
      onClick={() => {
        onSelectHandler({ _id, userId }, !isChecked)
        setIsChecked(!isChecked)
      }}
    >
      <div className="relative w-10 aspect-square rounded-md overflow-hidden">
        <Image alt="profile image" src={profileImageSrc} fill />
      </div>
      <span className="font-medium">{userId}</span>
      <div className="ml-auto">
        <input
          type="checkbox"
          id="topping"
          name="topping"
          value="Paneer"
          checked={isChecked}
          onChange={(e) => {
            setIsChecked(e.target.checked)
            onSelectHandler({ _id, userId }, e.target.checked)
          }}
          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
        />
      </div>
    </div>
  )
}
