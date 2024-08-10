import { Button } from "@/components/ui/button"
import { CallIcon, MailIcon } from "@/constants/icon-constant"
import { FilePenLine } from "lucide-react"
import Image from "next/image"
import React, { FC } from "react"

interface SettingProfileProps {
  profileImageSrc: string
  name: string
  phoneNumber: string
  email: string
  handleCloseButtonClick(): void
}
const SettingProfile: FC<SettingProfileProps> = ({
  email,
  name,
  phoneNumber,
  profileImageSrc,
  handleCloseButtonClick,
}) => {
  return (
    <div className="relative mt-5 flex ">
      <div className="relative w-[20%] bg-red-300 aspect-square rounded-[20%] overflow-hidden">
        <Image src={profileImageSrc} fill alt="profile-image" />
      </div>

      <div className="ml-5 my-auto gap-1 flex flex-col text-teal-50">
        <span className="text-lg font-medium">{name}</span>
        <span className="">{phoneNumber}</span>
      </div>

      <Button className="ml-auto relative w-10 bg-[#303237]" rounded onClick={handleCloseButtonClick} size={"icon"}>
        <FilePenLine className="w-5 aspect-square" />
      </Button>
    </div>
  )
}

export default SettingProfile
