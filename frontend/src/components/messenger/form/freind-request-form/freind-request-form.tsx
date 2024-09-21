import { Button } from "@/components/ui/button"
import useDebounce from "@/hooks/use-debounce/use-debounce"
import { searchUserHandler } from "@/redux/actions/user-action/user-action"
import { X } from "lucide-react"
import Image from "next/image"
import React, { FC, useState } from "react"
import { motion } from "framer-motion"
import { sendedFreindRequestHandler } from "@/redux/actions/chat-action/chat-action"

interface FreindRequestFormProps {
  handleCloseButtonClick(): void
}

const FreindRequestForm: React.FC<FreindRequestFormProps> = ({ handleCloseButtonClick }) => {
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
  return (
    <div className="fixed left-0 top-0 w-screen h-screen z-[200]" style={{ background: "rgba(0,0,0,0.9 )" }}>
      <div className="absolute w-[90%] max-w-[500px] py-5   left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] flex flex-col rounded-lg  z-50 dark:bg-background-primary ">
        <div className="px-4  py-2 flex justify-between bg-background-secondary md:px-10 md:py-5">
          <span className="text-xl font-medium md:text-2xl ">Create New Message</span>

          <Button onClick={handleCloseButtonClick} rounded size={"icon"}>
            <X className="relative w-5 aspect-square" />
          </Button>
        </div>

        <div className="px-4  mt-5 flex-1 border-b-[3px] border-neutral-800 md:px-10  md:mt-5">
          <input
            type="text"
            placeholder="Search"
            className="px-4 py-2  rounded-md  outline-none w-full text-base border-none bg-background-secondary   dark:text-slate-50"
            onChange={(e) => setInput(e.target.value)}
          />
        </div>

        <div className="mt-5 px-4  gap-5 flex flex-col h-[40vh] overflow-x-hidden overflow-y-scroll md:px-10 ">
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

        <div className="px-4  mt-5 gap-10 flex  md:px-10  md:mt-5">
          <Button
            className="px-5 py-2 flex flex-1 items-center justify-center rounded-full text-lg  "
            onClick={handleRequestButtonClick}
          >
            Send Request
          </Button>
        </div>
      </div>
    </div>
  )
}

export default FreindRequestForm

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
