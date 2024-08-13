import { Button } from "@/components/ui/button"
import { ChevronDown, ChevronLeft } from "lucide-react"
import React from "react"

interface AccountSettngProps {
  handleBackButtonClick: () => void
}

const AccountSettng: React.FC<AccountSettngProps> = ({ handleBackButtonClick }) => {
  return (
    <div>
      <div className="flex justify-between ">
        <div className=" flex flex-col">
          <span className="font-bold text-text text-2xl">Account</span>
        </div>
        <Button className="relative w-10 bg-[#383a42]" rounded onClick={handleBackButtonClick} size={"icon"}>
          <ChevronLeft className="w-5 aspect-square" />
        </Button>
      </div>

      <div className="mt-5 gap-3 py-5 border-t-[2px] flex flex-col  dark:border-slate-500">
        <div className="gap-2 px-2 py-2 rounded-full flex items-center bg-background-secondary">
          <Button className="relative w-8 h-8 bg-[#4564ba]" rounded onClick={handleBackButtonClick} size={"icon"}>
            <ChevronDown className="w-5 aspect-square" />
          </Button>
          <span className="text-[#4564ba]">Security</span>
        </div>
        <div className="gap-2 px-2 py-2 rounded-full flex items-center bg-background-secondary">
          <Button className="relative w-8 h-8 bg-[#4564ba]" rounded onClick={handleBackButtonClick} size={"icon"}>
            <ChevronDown className="w-5 aspect-square" />
          </Button>
          <span className="text-[#4564ba]">Privacy</span>
        </div>
        <div className="gap-2 px-2 py-2 rounded-full flex items-center bg-background-secondary">
          <Button className="relative w-8 h-8 bg-[#4564ba]" rounded onClick={handleBackButtonClick} size={"icon"}>
            <ChevronDown className="w-5 aspect-square" />
          </Button>
          <span className="text-[#4564ba]">Two Step Verification</span>
        </div>
        <div className="gap-2 px-2 py-2 rounded-full flex items-center bg-background-secondary">
          <Button className="relative w-8 h-8 bg-[#4564ba]" rounded onClick={handleBackButtonClick} size={"icon"}>
            <ChevronDown className="w-5 aspect-square" />
          </Button>
          <span className="text-[#4564ba]">Change Number</span>
        </div>
        <div className="gap-2 px-2 py-2 rounded-full flex items-center bg-background-secondary">
          <Button className="relative w-8 h-8 bg-[#4564ba]" rounded onClick={handleBackButtonClick} size={"icon"}>
            <ChevronDown className="w-5 aspect-square" />
          </Button>
          <span className="text-[#4564ba]">Delete My Account</span>
        </div>
      </div>
    </div>
  )
}

export default AccountSettng
