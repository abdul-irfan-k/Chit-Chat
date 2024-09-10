import { Button } from "@/components/ui/button"
import useDebounce from "@/hooks/use-debounce/use-debounce"
import { searchUserHandler } from "@/redux/actions/user-action/user-action"
import { X } from "lucide-react"
import Image from "next/image"
import React, { FC, useRef, useState } from "react"
import { motion } from "framer-motion"
import { sendedFreindRequestHandler } from "@/redux/actions/chat-action/chat-action"
import useOutsideClick from "@/hooks/use-outside-click/use-outside-click"

interface AddMembersFormProps {
  handleOutsideClick(): void
}

const AddMembersForm: React.FC<AddMembersFormProps> = ({ handleOutsideClick }) => {
  const addMemberContainr = useRef<HTMLDivElement>(null)

  const [input, setInput] = useState("")
  const [debounceInput, setDebounceInput] = useState("")
  const [users, setUsers] = useState([])
  const [selectedUser, setSelectedUser] = useState(undefined)

  const handleRequestButtonClick = async () => {
    if (selectedUser == undefined) return
    try {
      const data = await sendedFreindRequestHandler({ friendRequestorId: selectedUser._id })
    } catch (error) {}
  }

  useDebounce(
    async () => {
      try {
        if (input.trim() === "") return
        if (input === debounceInput) return
        setDebounceInput(input)
        const { users } = await searchUserHandler({ query: input })
        if (users == undefined) return
        setUsers(users)
      } catch (error) {}
    },
    200,
    [input],
  )

  useOutsideClick(addMemberContainr, () => handleOutsideClick())
  return (
    <div className="fixed left-0 top-0 w-screen h-screen z-[200]" style={{ background: "rgba(0,0,0,0.9 )" }}>
      <div
        className="absolute  py-5 w-[35%]  left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] flex flex-col rounded-lg  z-50 dark:bg-background-primary"
        ref={addMemberContainr}
      >
        <div className="px-10 mt-0 flex-1 border-b-[3px] border-neutral-800">
          <input
            type="text"
            placeholder="Enter the username"
            className="px-4 py-2  rounded-md  outline-none w-full text-base border-none bg-background-secondary   dark:text-slate-50"
            onChange={(e) => setInput(e.target.value)}
          />
        </div>

        <div className="mt-5 px-10 gap-5 flex flex-col h-[40vh] overflow-x-hidden overflow-y-scroll">
          {users.map((user: any, index) => {
            return (
              <motion.div
                key={user._id}
                variants={{
                  initial: {
                    x: "10%",
                    opacity: 0,
                  },
                  active(custom) {
                    return {
                      x: 0,
                      opacity: 1,
                      transition: {
                        delay: custom * 0.05,
                      },
                    }
                  },
                }}
                custom={index}
                initial="initial"
                animate="active"
              >
                <UserCard
                  name={user.name}
                  _id={user._id}
                  userId={user.userId}
                  profileImageSrc={user.profileImageUrl}
                  handleCardClick={() => setSelectedUser({ ...user })}
                  isSelected={selectedUser?._id === user._id}
                />
              </motion.div>
            )
          })}
        </div>

        <div className="px-10 mt-10 gap-10 flex ">
          <Button
            className="px-5 py-2 flex flex-1 items-center justify-center rounded-full text-lg  "
            onClick={handleRequestButtonClick}
          >
            add members
          </Button>
        </div>
      </div>
    </div>
  )
}

export default AddMembersForm

interface UserCardProps {
  name: string
  _id: string
  userId: string
  profileImageSrc: string
  isSelected?: boolean
  handleCardClick(): void
}
const UserCard: FC<UserCardProps> = ({ _id, handleCardClick, name, profileImageSrc, isSelected, userId }) => {
  return (
    <div
      className={"gap-3 relative flex  items-center rounded-md " + (isSelected ? "dark:bg-background-secondary" : "")}
      onClick={handleCardClick}
    >
      <div className="relative  w-10 aspect-square md:w-[10%] ">
        <Image src={profileImageSrc} alt="user-image" fill className="rounded-3xl" />
      </div>

      <div className="gap-1 flex flex-col  justify-center ">
        <div className="font-medium text-base ">{name}</div>
        <span>{userId}</span>
      </div>
    </div>
  )
}
