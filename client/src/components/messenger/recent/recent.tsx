"use client"

import Image from "next/image"
import { FC } from "react"

const Recent = () => {
  return (
    <div className="relative w-[100%]  flex flex-col ">
      <div className="text-slate-950 font-extrabold text-lg md:text-xl xl:text-2xl dark:text-slate-50">Recent</div>
      <div className="text-slate-800 font-normal text-sm md:text-base dark:text-slate-200">Chat from your freinds</div>
      <div className="mt-5 gap-3 flex overflow-x-auto no-scrollbar" >
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
    <div className="recentcard relative w-52 flex-[0_0_30%]   overflow-hidden  aspect-square rounded-sm  bg-black">
      <Image src={imageSrc} fill alt="image" className="opacity-[0.45] rounded-xl" />
      <div className="absolute bottom-0 px-3 py-2  flex justify-between items-center w-full z-10">
        <div className="text-sm text-slate-50">{name}</div>
        <div
          className={"block w-2 aspect-square rounded-full " + (status == "online" ? "bg-green-500" : "bg-red-600")}
        ></div>
      </div>
    </div>
  )
}
