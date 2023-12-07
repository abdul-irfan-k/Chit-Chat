import { CallIcon } from "@/constants/icon-constant"
import React, { FC } from "react"

interface SettingProfileProps {
  profileImageSrc: string
  name: string
  phoneNumber: string
  email: string
}
const SettingProfile: FC<SettingProfileProps> = ({ email, name, phoneNumber, profileImageSrc }) => {
  return (
    <div>
      <div className="gap-1 flex flex-col">
        <div className="gap-5 flex items-center">
          <div className="relative  w-6 aspect-square ">
            <CallIcon />
          </div>
          <div className="gap-1 flex flex-col">
            <span className="text-xl">{phoneNumber}</span>
            <span className="text-base dark:text-slate-200 ">phone</span>
          </div>
        </div>
        <div className="gap-5 flex items-center">
          <div className="relative  w-6 aspect-square ">
            <CallIcon />
          </div>
          <div className="gap-1 flex flex-col">
            <span className="text-xl">{email}</span>
            <span className="text-base dark:text-slate-200 ">email</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SettingProfile
