import { FacebookIcon, GithubIcon, GoogleIcon, PersonIcon, SearchIcon } from "@/constants/icon-constant"
import Image from "next/image"
import React, { FC } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"

interface CurrentChaterFullScreenProfileProps {
  name: string
  chaterType: "single" | "group"
  currentStatus: "online" | "ofline"
  profileImageSrc: string
  description?: string
  isAdmin?: boolean
  closeButtonHanlder(): void
}
// interface GroupSetting{

// }

const CurrentChaterFullScreenProfile: FC<CurrentChaterFullScreenProfileProps> = ({
  chaterType,
  currentStatus,
  name,
  profileImageSrc,
  description,
  isAdmin,
  closeButtonHanlder,
}) => {
  return (
    <motion.div
      key={"chaterProfile"}
      className="fixed   top-0 h-screen w-screen  overflow-y-scroll    bg-slate-200 dark:bg-background-primary z-[70] no-scrollbar md:max-w-[380px] md:right-0"
      initial={{ translateX: "100%" }}
      animate={{ translateX: "0%" }}
      exit={{ translateX: "100%" }}
    >
      <div className="mt-5 px-5 flex justify-between">
        <div className="gap-1 flex flex-col">
          <span className="font-medium text-2xl">Profile</span>
          <span className=" dark:text-slate-300">Personal Information</span>
        </div>

        <Button
          className="relative w-10 dark:bg-white dark:text-black"
          onClick={closeButtonHanlder}
          rounded
          size={"icon"}
        >
          <X className="relative w-5 aspect-square" />
        </Button>
      </div>

      <div className="relative mt-10 mx-auto w-[35%] aspect-square overflow-hidden rounded-[20%]">
        <Image src={profileImageSrc} fill alt="profile image" />
      </div>
      <div className="mt-5 flex flex-col items-center">
        <span className="text-xl font-bold capitalize">{name}</span>
        {/* {!isChatingWithGroup && (
          <span className={"mt-1 text-base " + (currentStatus == "online" ? "text-green-500" : "text-red-500")}>
            {currentStatus == "online" ? "online" : "ofline"}
          </span>
        )} */}

        <div className="mt-2 gap-2 flex justify-center">
          <Button className="relative w-10 bg-[#2c67ce]" rounded size={"icon"}>
            <GoogleIcon className="relative w-5 aspect-square" />
          </Button>
          <Button className="relative w-10 bg-[#ff4e2b] fill-white" rounded size={"icon"}>
            <FacebookIcon className="relative w-5 aspect-square" />
          </Button>
          <Button className="relative w-10 bg-black" rounded size={"icon"}>
            <GithubIcon className="relative w-5 aspect-square" />
          </Button>
        </div>
      </div>

      <div className="mt-10">
        <div className="px-5 flex justify-between">
          <span>Customize Chat</span>
          <label className="relative inline-flex items-center mb-5 cursor-pointer">
            <input type="checkbox" value="" className="sr-only peer" />
            <div className="w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
          </label>
        </div>
        <div className="mt-3 px-5 flex justify-between">
          <span>Media File Links</span>
          <label className="relative inline-flex items-center mb-5 cursor-pointer">
            <input type="checkbox" value="" className="sr-only peer" />
            <div className="w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
          </label>
        </div>
        <div className="mt-3 px-5 flex justify-between">
          <span>Disappear Message</span>
          <label className="relative inline-flex items-center mb-5 cursor-pointer">
            <input type="checkbox" value="" className="sr-only peer" />
            <div className="w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
          </label>
        </div>
      </div>

      <div className="mt-5 gap-2 px-5 flex items-center">
        <div className="px-4 py-2 text-base rounded-full bg-sky-200 text-blue-500">Media</div>
        <div className="px-4 py-2 text-base rounded-full">Files</div>
        <div className="px-4 py-2 text-base rounded-full">Linkes</div>
      </div>

      <div className="gap-1 gap-y-3 mt-5 px-5  flex flex-wrap justify-between">
        <div className="relative w-[32%] aspect-square rounded-md overflow-hidden">
          <Image src={"/Asset/nature.jpg"} alt="image" fill />
        </div>
        <div className="relative w-[32%] aspect-square rounded-md overflow-hidden">
          <Image src={"/Asset/nature.jpg"} alt="image" fill />
        </div>
        <div className="relative w-[32%] aspect-square rounded-md overflow-hidden">
          <Image src={"/Asset/nature.jpg"} alt="image" fill />
        </div>
        <div className="relative w-[32%] aspect-square rounded-md overflow-hidden">
          <Image src={"/Asset/nature.jpg"} alt="image" fill />
        </div>
        <div className="relative w-[32%] aspect-square rounded-md overflow-hidden">
          <Image src={"/Asset/nature.jpg"} alt="image" fill />
        </div>
        <div className="relative w-[32%] aspect-square rounded-md overflow-hidden">
          <Image src={"/Asset/nature.jpg"} alt="image" fill />
        </div>
        <div className="relative w-[32%] aspect-square rounded-md overflow-hidden">
          <Image src={"/Asset/nature.jpg"} alt="image" fill />
        </div>
        <div className="relative w-[32%] aspect-square rounded-md overflow-hidden">
          <Image src={"/Asset/nature.jpg"} alt="image" fill />
        </div>
        <div className="relative w-[32%] aspect-square rounded-md overflow-hidden">
          <Image src={"/Asset/nature.jpg"} alt="image" fill />
        </div>
      </div>
    </motion.div>
  )
}

export default CurrentChaterFullScreenProfile
