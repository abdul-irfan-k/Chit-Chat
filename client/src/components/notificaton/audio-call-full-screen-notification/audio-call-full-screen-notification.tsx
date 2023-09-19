"use client"

import { CallEndIcon, CallIcon, ChatIcon } from "@/constants/icon-contant"
import Image from "next/image"

const AudioCallFullScreenNotification = () => {
  return (
    <div
      className="fixed py-10 px-14  top-[50%] left-[50%] flex flex-col items-center w-[100%] translate-y-[-50%]  translate-x-[-50%] bg-neutral-900 bg-opacity-80 bg-clip-padding rounded-md aspect-[3/4]  md:w-[80%] lg:w-[40%] xl:w-[30%] "
      style={{ backdropFilter: "blur(10px)" }}
    >
      <div className="font-medium text-xl md:text-2xl xl:text-4xl">Irfan K</div>
      <div className=" relative mt-5  mx-auto w-[70%] border-4 border-slate-50 aspect-square rounded-full self-start">
        <Image alt="image" src={"/Asset/avatar.jpg"} fill className="rounded-full" />
      </div>

      <div className="mt-10 w-full flex justify-between items-center text-sm fill-slate-950 dark:fill-slate-100">
        <div className="gap-1 flex flex-col items-center ">
          <div className="relative w-14  flex justify-center items-center aspect-square rounded-full md:w-14 xl:w-16">
            <CallEndIcon className="aspect-square w-8 xl:w-10" width="" height="" />
          </div>
          <div>remind</div>
        </div>
        <div className="gap-1 ">
          <div className="relative w-14 flex justify-center items-center aspect-square rounded-full md:w-14 xl:w-16">
            <ChatIcon className="aspect-square w-8 xl:w-10" width="" height="" />
          </div>
          <div>Message</div>
        </div>
      </div>

      <div className="mt-10 w-full flex justify-between items-center text-sm fill-slate-950 dark:fill-slate-100">
        <div className="gap-1 flex flex-col items-center ">
          <div className="relative w-14 bg-red-500 flex justify-center items-center aspect-square rounded-full md:w-14 xl:w-16">
            <CallEndIcon className="aspect-square w-8 xl:w-10" width="" height="" />
          </div>
          <div>Decline</div>
        </div>
        <div className="gap-1 flex flex-col items-center ">
          <div className="w-14 bg-green-500 flex justify-center items-center aspect-square rounded-full md:w-14 xl:w-16">
            <CallIcon className="aspect-square w-8 xl:w-10" width="" height="" />
          </div>
          <div className="">Accept</div>
        </div>
      </div>
    </div>
  )
}

export default AudioCallFullScreenNotification
