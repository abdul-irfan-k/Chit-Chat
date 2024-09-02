import { Button } from "@/components/ui/button"
import { X } from "lucide-react"
import Image from "next/image"
import React, { FC, useState } from "react"

interface FreindRequestFormProps {
  handleCloseButtonClick(): void
}

const FreindRequestForm: React.FC<FreindRequestFormProps> = ({ handleCloseButtonClick }) => {
  const [input, setInput] = useState("")

  const handleRequestButtonClick = () => {}
  return (
    <div className="fixed left-0 top-0 w-screen h-screen z-[200]" style={{ background: "rgba(0,0,0,0.9 )" }}>
      <div className="absolute  py-5 w-[35%]  left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] flex flex-col rounded-lg  z-50 dark:bg-background-primary">
        <div className="px-10  py-5 flex justify-between bg-background-secondary">
          <span className="text-2xl font-medium">Create New Message</span>

          <Button onClick={handleCloseButtonClick} rounded size={"icon"}>
            <X className="relative w-5 aspect-square" />
          </Button>
        </div>

        <div className="px-10 mt-10 flex-1 border-b-[3px] border-neutral-800">
          <input
            type="text"
            placeholder="Search"
            className="px-4 py-2  rounded-md  outline-none w-full text-base border-none bg-background-secondary   dark:text-slate-50"
            onChange={(e) => setInput(e.target.value)}
          />
        </div>

        <div className="mt-5 px-10 gap-5 flex flex-col h-[40vh] overflow-y-scroll">
          <UserCard
            name="John Doe"
            _id="1"
            profileImageSrc="/Asset/avatar.jpg"
            isSelected={true}
            handleCardSelect={() => {}}
          />
          <UserCard
            name="John Doe"
            _id="1"
            profileImageSrc="/Asset/avatar.jpg"
            isSelected={true}
            handleCardSelect={() => {}}
          />
          <UserCard
            name="John Doe"
            _id="1"
            profileImageSrc="/Asset/avatar.jpg"
            isSelected={true}
            handleCardSelect={() => {}}
          />
          <UserCard
            name="John Doe"
            _id="1"
            profileImageSrc="/Asset/avatar.jpg"
            isSelected={true}
            handleCardSelect={() => {}}
          />
          <UserCard
            name="John Doe"
            _id="1"
            profileImageSrc="/Asset/avatar.jpg"
            isSelected={true}
            handleCardSelect={() => {}}
          />
          <UserCard
            name="John Doe"
            _id="1"
            profileImageSrc="/Asset/avatar.jpg"
            isSelected={true}
            handleCardSelect={() => {}}
          />
        </div>

        <div className="px-10 mt-10 gap-10 flex ">
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
  profileImageSrc: string
  isSelected?: boolean
  handleCardSelect(): void
}
const UserCard: FC<UserCardProps> = ({ _id, handleCardSelect, name, profileImageSrc, isSelected }) => {
  return (
    <div className="gap-3 relative flex  items-center" onClick={handleCardSelect}>
      <div className="relative  w-10 aspect-square md:w-[10%] ">
        <Image src={profileImageSrc} alt="user-image" fill className="rounded-3xl" />
      </div>

      <div className="gap-1 flex flex-col  justify-center ">
        <div className="font-medium text-base ">{name}</div>
        <span>asdf</span>
      </div>
    </div>
  )
}
