import { CallIcon, ChatIcon, VideoCamIcon } from "@/constants/icon-constant"
import Image from "next/image"
import { FC } from "react"

interface ContactUserProfileProps {
  name: string
  profileImageSrc: string
}

const ContactUserProfile: FC<ContactUserProfileProps> = ({ name, profileImageSrc }) => {
  return (
    <div className=" gap-2 w-full  p-8 flex flex-col items-center bg-slate-200 fill-slate-950 dark:bg-neutral-950 dark:fill-slate-50">
      <div className="relative w-[50%] aspect-square">
        <Image src={profileImageSrc} alt="user-image" fill className="rounded-full" />
      </div>
      <div className="font-medium text-lg text-slate-950 dark:text-slate-50">{name}</div>
      <div className="gap-3 w-full flex justify-between items-center ">
        <div className="flex flex-col gap-2 items-center">
          <div className="w-10 aspect-square flex items-center justify-center">
            <ChatIcon className="w-8 aspect-square" />
          </div>
          <div className="font-medium text-base">Message</div>
        </div>
        <div className="flex flex-col gap-2 items-center">
          <div className="w-10 aspect-square flex items-center justify-center">
            <CallIcon className="w-8 aspect-square" />
          </div>
          <div className="font-medium text-base">Voice Call</div>
        </div>
        <div className="flex flex-col gap-2 items-center">
          <div className="w-10 aspect-square flex items-center justify-center">
            <VideoCamIcon className="w-8 aspect-square" />
          </div>
          <div className="font-medium text-base">Video Call</div>
        </div>
      </div>
    </div>
  )
}

export default ContactUserProfile
