import Image from "next/image"
import React, { FC } from "react"

const SearchUserList = () => {
  return <div>
    <div className="mt-3 gap-3 flex flex-col">
        <SearchUserCard profileImageSrc="/Asset/avatar.jpg" userId="irfan" userName="irfan" isHovered />
        <SearchUserCard profileImageSrc="/Asset/avatar.jpg" userId="irfan" userName="irfan" />
        <SearchUserCard profileImageSrc="/Asset/avatar.jpg" userId="irfan" userName="irfan" />
        <SearchUserCard profileImageSrc="/Asset/avatar.jpg" userId="irfan" userName="irfan" />
        <SearchUserCard profileImageSrc="/Asset/avatar.jpg" userId="irfan" userName="irfan" />
    </div>
  </div>
}

export default SearchUserList

interface SearchUserCardProps {
  userName: string
  userId: string
  profileImageSrc: string
  isHovered?:boolean
}
const SearchUserCard: FC<SearchUserCardProps> = ({ profileImageSrc, userId, userName,isHovered }) => {
  return (
    <div className="gap-2 py-1 flex items-center  rounded-full"
    style={{background:isHovered?"rgb(23 23 23 / var(--tw-bg-opacity))":""}}
    >
      <div className="relative w-10 aspect-square rounded-md overflow-hidden">
        <Image alt="profile image" src={profileImageSrc} fill />
      </div>
      <span className="font-medium">{userId}</span>

      <div className="ml-auto bg-blue-500 px-3 py-2 rounded-full">add freindlist</div>
    </div>
  )
}
