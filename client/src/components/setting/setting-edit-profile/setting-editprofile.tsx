import { CallIcon } from "@/constants/icon-constant"
import Image from "next/image"
import React, { FC } from "react"

interface SettingEditProfileProps {
  profileImageUrl?: string
}
const SettingEditProfile: FC<SettingEditProfileProps> = ({ profileImageUrl }) => {
  const addImageButtonHandler = () => {}
  return (
    <div>
      <div className="relative  flex items-center py-10">
        <div className="relative w-[20%] aspect-square rounded-full overflow-hidden">
          {profileImageUrl != undefined && <Image src={profileImageUrl} alt="profile image" fill />}
          {profileImageUrl == undefined && <div></div>}
          <div className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] ">
            <div className="relative ">
              <CallIcon width="" height="" className="w-6 aspect-square" />
            </div>
          </div>
        </div>
      </div>

      <div className="gap-3 flex flex-col">
        <div className="flex-1 px-2 py-2 border-[0.5px] border-neutral-300">
          <input type="text" className="bg-transparent outline-none  w-full text-slate-50   hover:border-none" />
          <label>
            <span>name</span>
          </label>
        </div>
        <div className="flex-1 px-2 py-2 border-[0.5px] border-neutral-300">
          <input type="text" className="bg-transparent outline-none  w-full text-slate-50   hover:border-none" />
          <label>
            <span>last Name</span>
          </label>
        </div>
      </div>

      <div className="absolute"></div>
    </div>
  )
}

export default SettingEditProfile
