"use client"

import { PeerVideoRefContext } from "@/provider/peer-js-video-provider.tsx/peer-js-video-provider"
import Image from "next/image"
import { FC, useContext } from "react"

const Recent = () => {
  const videoContext = useContext(PeerVideoRefContext)

  return (
    <div className="relative w-[100%]  flex flex-col ">
      <div className="text-slate-950 font-extrabold text-lg md:text-xl xl:text-2xl dark:text-slate-50">Recent</div>
      <div className="text-slate-800 font-normal text-sm md:text-base dark:text-slate-200">Chat from your freinds</div>
      <div className="mt-5 gap-2 flex overflow-x-auto no-scrollbar md:gap-3">
        <RecentCard imageSrc="/Asset/avatar.jpg" name="imran" status="ofline" />
        <RecentCard imageSrc="/Asset/avatar.jpg" name="kaleel" status="online" />
        <RecentCard imageSrc="/Asset/avatar.jpg" name="zuhair" status="ofline" />
        <RecentCard imageSrc="/Asset/avatar.jpg" name="irfan" status="online" />
        <RecentCard imageSrc="/Asset/avatar.jpg" name="irfan" status="online" />
        <RecentCard imageSrc="/Asset/avatar.jpg" name="irfan" status="online" />
      </div>
    </div>
  )
}

export default Recent

interface RecentCardProps {
  imageSrc: string
  name: string
  status: "online" | "ofline"
}
const RecentCard: FC<RecentCardProps> = ({ imageSrc, name, status }) => {
  return (
    <div className="recentcard relative  flex-[0_0_30%]   overflow-hidden  aspect-[16/11]  rounded-sm  bg-black md:aspect-square md:flex-[0_0_35%] ">
      <Image src={imageSrc} fill alt="image" className="opacity-[0.45] rounded-xl" />
      <div className="absolute bottom-0 px-3 py-[0.5]  flex justify-between items-center w-full z-10 md:py-2">
        <div className="text-sm text-slate-50">{name}</div>
        <div
          className={"block w-2 aspect-square rounded-full " + (status == "online" ? "bg-green-500" : "bg-red-600")}
        ></div>
      </div>
    </div>
  )
}
