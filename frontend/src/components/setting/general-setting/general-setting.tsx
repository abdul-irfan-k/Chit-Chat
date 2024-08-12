import { Button } from "@/components/ui/button"
import Switch from "@/components/ui/switch"
import { ChevronLeft } from "lucide-react"
import React from "react"

interface GeneralSettingProps {
  handleBackButtonClick: () => void
}

const GeneralSetting: React.FC<GeneralSettingProps> = ({ handleBackButtonClick }) => {
  return (
    <div>
      <div className="flex justify-between ">
        <div className=" flex flex-col">
          <span className="font-bold text-text text-2xl">General Setting</span>
        </div>
        <Button className="relative w-10 bg-[#383a42]" rounded onClick={handleBackButtonClick} size={"icon"}>
          <ChevronLeft className="w-5 aspect-square" />
        </Button>
      </div>

      <div className="mt-5 py-5 border-t-[2px]  dark:border-slate-500">
        <span className=" text-lg font-medium">Chat backup</span>
        <div className="mt-5 gap-0 flex flex-col dark:text-neutral-300">
          <span className="gap-2 flex items-start">
            <Switch enabled variant={"green"} />
            Auto backup
          </span>
          <span className="gap-2 flex items-start">
            <Switch enabled variant={"green"} />
            Include document
          </span>
          <span className="gap-2 flex items-start">
            <Switch enabled variant={"green"} />
            Include videos
          </span>
        </div>
      </div>

      <div className="mt-5 py-5 border-t-[2px]  dark:border-slate-500">
        <span className=" text-lg font-medium">Chat walpaper</span>

        <div className="gap-2 mt-5 flex ">
          <div className="relative w-10 aspect-square rounded-md bg-white block"></div>
          <div className="relative w-10 aspect-square rounded-md bg-white block"></div>
          <div className="relative w-10 aspect-square rounded-md bg-white block"></div>
          <div className="relative w-10 aspect-square rounded-md bg-white block"></div>
          <div className="relative w-10 aspect-square rounded-md bg-white block"></div>
          <div className="relative w-10 aspect-square rounded-md bg-white block"></div>
        </div>
      </div>
      <div className="mt-5 py-5 gap-2 border-t-[2px] flex flex-col  dark:border-slate-500">
        <span className=" text-lg font-medium">Arhive all chat</span>
        <span className=" text-lg font-medium">Clear all chat</span>
        <span className="text-red-500  text-lg font-medium">Delete all chat</span>
      </div>
    </div>
  )
}

export default GeneralSetting
