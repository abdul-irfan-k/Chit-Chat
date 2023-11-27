import { BellIcon } from "@/constants/icon-constant"
import React, { FC } from "react"

const FullScreenNotification = () => {
  return (
    <div
      className="top-[50%]  left-20 translate-y-[-50%] fixed flex items-center    h-full w-[100vw]   z-[100]"
      style={{ background: "rgba(0,0,0,0.45 )" }}
    >
      <div className="ml-4 px-10 py-10 h-[90vh] w-[70%] flex flex-col bg-slate-200 dark:bg-neutral-950 ">
        <div className="gap-2 flex items-center relative text-4xl font-bold ">
          Notification <BellIcon className="w-8 aspect-square" />
        </div>
        <div className="w-[70%] mt-5 gap-4 flex flex-col">
          <NotificationCard notificationTime={new Date()} />
          <NotificationCard notificationTime={new Date()} />
          <NotificationCard notificationTime={new Date()} />
        </div>
      </div>
    </div>
  )
}

export default FullScreenNotification

interface NotificationCardProps {
  notificationTime: Date
  onClickHandler?(): void
}
const NotificationCard: FC<NotificationCardProps> = ({ onClickHandler, notificationTime }) => {
  return (
    <div className="px-8 py-4 rounded-3xl flex items-center  bg-slate-300 dark:bg-neutral-900 ">
      <div>
        <div className="text-base">arif liked your post </div>
        <span className="text-sm">{notificationTime.toDateString()}</span>
      </div>
      <div className="ml-auto text-blue-500">visit</div>
    </div>
  )
}
