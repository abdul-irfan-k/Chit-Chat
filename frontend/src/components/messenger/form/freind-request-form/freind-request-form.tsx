import { Button } from "@/components/ui/button"
import React, { useState } from "react"

interface FreindRequestFormProps {
  handleCloseButtonClick(): void
}

const FreindRequestForm: React.FC<FreindRequestFormProps> = ({ handleCloseButtonClick }) => {
  const [input, setInput] = useState("")
  return (
    <div className="fixed left-0 top-0 w-screen h-screen z-[200]" style={{ background: "rgba(0,0,0,0.9 )" }}>
      <div className="absolute  py-5 w-[50%]  left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] flex flex-col rounded-lg  z-50 dark:bg-background-primary">
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
            className="px-4 py-2 border-none rounded-md  outline-none w-full text-base border-none bg-background-secondary   dark:text-slate-50"
            onChange={(e) => setGroupName(e.target.value)}
          />
        </div>

        <div className="flex flex-col"></div>

        <div className="px-10 mt-10 gap-10 flex ">
          <Button
            className="px-5 py-2 flex flex-1 items-center justify-center rounded-full text-lg  "
            onClick={handleCreateButtonClick}
          >
            Send Request
          </Button>
        </div>
      </div>
    </div>
  )
}

export default FreindRequestForm
