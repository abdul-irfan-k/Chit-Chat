import Image from "next/image"
import { FC } from "react"

const SideMenu = () => {
  return (
    <div className="fixed  py-20 h-[90vh] top-[50%] w-16 translate-y-[-50%] flex flex-col justify-between items-center">
      <div className="w-10 relative overflow-hidden flex items-center justify-center aspect-square rounded-full">
        <Image alt="profile-image" src={"/Asset/avatar.jpg"} fill />
      </div>

      <SideMenuIcon src={"/Asset/Icon/star.svg"} />
      <SideMenuIcon src={"/Asset/Icon/file.svg"} />
      <SideMenuIcon src={"/Asset/Icon/id-badge.svg"} />
      <SideMenuIcon src={"/Asset/Icon/bell.svg"} />
      <SideMenuIcon src={"/Asset/Icon/gear.svg"} />
      <SideMenuIcon src={"/Asset/signout.png"} />
      <SideMenuIcon src={"/Asset/Icon/moon.svg"} />
    </div>
  )
}

export default SideMenu

interface SideMenuIconInterface {
  src: string
}

const SideMenuIcon: FC<SideMenuIconInterface> = ({ src }) => {
  return (
    <div className="w-10 relative overflow-hidden flex items-center justify-center aspect-square rounded-full bg-slate-300">
      <Image alt="profile-image" src={src} fill className="p-2" />
    </div>
  )
}
