import { ArrowLeftIcon, PhoneIcon, VideoIcon } from "@/constants/icon-constant"
import Image from "next/image"
import React, { FC } from "react"

interface MobileChatProfileInstance {
  name: string
  profileImageSrc: string
  currentStatus: "online" | "ofline"
  backButtonHandler(): void
}
const MobileChatProfile: FC<MobileChatProfileInstance> = ({
  currentStatus,
  name,
  profileImageSrc,
  backButtonHandler,
}) => {
  return (
    <div className="w-full py-4 px-4 rounded-md flex items-center bg-slate-200 fill-slate-950 dark:bg-neutral-950 dark:fill-slate-50">
      <div
        className=" relative flex items-center justify-center w-10 aspect-square bg-slate-300 rounded-full dark:bg-slate-800"
        onClick={backButtonHandler}
      >
        <ArrowLeftIcon className="aspect-square w-7" width="" height="" />
      </div>
      <div className="ml-2 relative w-[10%]  aspect-square ">
        <Image src={profileImageSrc} alt="user-image" fill className="rounded-3xl" />
        <div
          className={
            "absolute right-0 top-0 w-4  aspect-square rounded-full border-[3px] border-slate-200 dark:border-neutral-950" +
            " bg-yellow-300"
          }
        ></div>
      </div>
      <div className="ml-3 text-lg font-medium text-slate-950 dark:text-slate-50">{name}</div>

      <div className="ml-auto relative flex items-center justify-center w-10 aspect-square bg-slate-300 rounded-full dark:bg-slate-800">
        <PhoneIcon className="aspect-square p-3" />
      </div>
      <div className="relative flex items-center justify-center w-10 aspect-square bg-slate-300 rounded-full dark:bg-slate-800">
        <VideoIcon className="aspect-square p-3" />
      </div>
    </div>
  )
}

export default MobileChatProfile
