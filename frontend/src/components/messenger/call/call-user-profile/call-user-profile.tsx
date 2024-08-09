import { Button } from "@/components/ui/button"
import { CallIcon, ChatIcon, VideoCamIcon } from "@/constants/icon-constant"
import { MessageCircle, Phone, Video } from "lucide-react"
import Image from "next/image"
import { FC } from "react"

interface CallUserProfileProps {
  name: string
  profileImageSrc: string
  phoneNumber: string
}

const CallUserProfile: FC<CallUserProfileProps> = ({ name, profileImageSrc, phoneNumber }) => {
  return (
    <div className=" gap-1 w-full  p-8 flex flex-col items-center rounded-md bg-slate-200 fill-slate-950 dark:bg-background-primary dark:fill-slate-50">
      <div className="relative w-[35%] aspect-square">
        <Image src={profileImageSrc} alt="user-image" fill className="rounded-full" />
      </div>
      <div className="font-medium text-lg text-slate-950 dark:text-slate-50">{name}</div>
      <div className="font-medium  text-slate-700 dark:text-slate-200">{phoneNumber}</div>
      <div className="mt-5 gap-3 w-full flex justify-center  items-center ">
        <div className="flex flex-col gap-1 items-center">
          <Button className="relative w-10 dark:bg-white dark:text-black" rounded size={"icon"}>
            <MessageCircle className="w-5 aspect-square" />
          </Button>
          <span className="font-medium ">Message</span>
        </div>
        <div className="flex flex-col gap-1 items-center">
          <div className="w-10 aspect-square flex items-center justify-center">
            <Phone className="w-5 aspect-square" />
          </div>
          <span className="font-medium ">Voice Call</span>
        </div>
        <div className="flex flex-col gap-1 items-center">
          <div className="w-10 aspect-square flex items-center justify-center">
            <Video className="w-5 aspect-square" />
          </div>
          <span className="font-medium ">Video Call</span>
        </div>
      </div>
    </div>
  )
}

export default CallUserProfile
