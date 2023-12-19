import { AddIcon, ArrowBackIcon, CallIcon, CorrectIcon } from "@/constants/icon-constant"
import Image from "next/image"
import React, { FC } from "react"

interface SettingEditProfileProps {
  profileImageUrl?: string
  backButtonHandler(): void
}
const SettingEditProfile: FC<SettingEditProfileProps> = ({ profileImageUrl, backButtonHandler }) => {
  const addImageButtonHandler = () => {}
  return (
    <div className="overflow-y-scroll h-screen no-scrollbar ">
      <div className="fixed gap-3 py-2 flex items-center bg-neutral-950 z-[20] w-full">
        <div className="w-6 aspect-square" onClick={backButtonHandler}>
          <ArrowBackIcon className="w-6 aspect-square" />
        </div>
        <span className="font-semibold text-xl">Edit Profile</span>
      </div>

      <div className="flex flex-col pt-5">
        <div className="relative  flex items-center justify-center py-10">
          <div className="relative w-[33%] aspect-square rounded-full overflow-hidden">
            {profileImageUrl != undefined && <Image src={profileImageUrl} alt="profile image" fill />}
            {profileImageUrl == undefined && <div className="w-full h-full block bg-red-300"></div>}
            <div className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] ">
              <div className="relative ">
                <AddIcon width="" height="" className="w-10 aspect-square" />
              </div>
            </div>
          </div>
        </div>

        <div className="gap-10 flex flex-col text-sm">
          <div className="relative flex-1 px-2 border-[0.5px] border-neutral-300 rounded-md">
            <label className="absolute px-1 top-0 translate-y-[-50%] bg-slate-200 dark:bg-neutral-950  ">
              <span>Name</span>
            </label>
            <input type="text" className="bg-transparent text-lg py-4  outline-none  w-full text-slate-50   hover:border-none" />
          </div>
          <div className="relative flex-1 px-2 border-[0.5px] border-neutral-300 rounded-md">
            <label className="absolute px-1  top-0 translate-y-[-50%] bg-slate-200 dark:bg-neutral-950  ">
              <span>Last Name</span>
            </label>
            <input type="text" className="bg-transparent text-lg py-4  outline-none  w-full text-slate-50   hover:border-none" />
          </div>
    
        </div>
 
        <div className="fixed w-14 aspect-square bg-blue-500 flex items-center justify-center rounded-full bottom-10 right-0">
          <CorrectIcon className="w-8 aspect-square" width="" height="" />
        </div>
      </div>
    </div>
  )
}

export default SettingEditProfile
