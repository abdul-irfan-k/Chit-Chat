import { BellIcon, FileIcon, GearIcon, IdBadgeIcon, LogoutIcon, MoonIcon, StarIcon } from "@/constants/icon-constant"
import Image from "next/image"
import { FC } from "react"

const SideMenu = () => {
  return (
    <div className="  py-20 h-[90vh]  w-16  flex flex-col justify-between items-center">
      <div className="w-10 relative overflow-hidden flex items-center justify-center aspect-square rounded-full">
        <Image alt="profile-image" src={"/Asset/avatar.jpg"} fill />
      </div>

      <SideMenuIcon >
        <StarIcon className="w-6 aspect-square" />
      </SideMenuIcon>
      <SideMenuIcon>
        <FileIcon className="w-6 aspect-square" />
      </SideMenuIcon>
      <SideMenuIcon>
        <IdBadgeIcon className="w-6 aspect-square" />
      </SideMenuIcon>
      <SideMenuIcon>
        <BellIcon className="w-6 aspect-square" />
      </SideMenuIcon>
      <SideMenuIcon>
        <GearIcon className="w-6 aspect-square" />
      </SideMenuIcon>
      <SideMenuIcon>
        <LogoutIcon className="w-6 aspect-square" />
      </SideMenuIcon>
      <SideMenuIcon>
        <MoonIcon className="w-6 aspect-square" />
      </SideMenuIcon>
    </div>
  )
}

export default SideMenu

interface SideMenuIconInterface {
  children: React.ReactNode
}
const SideMenuIcon: FC<SideMenuIconInterface> = ({ children }) => {
  return (
    <div className="w-10 relative overflow-hidden flex items-center justify-center aspect-square rounded-full bg-slate-300 fill-slate-950 dark:fill-slate-50 dark:bg-neutral-900">
      {children}
    </div>
  )
}
