import { ArrowBackIcon, ArrowLeftIcon } from "@/constants/icon-constant"
import React, { FC } from "react"

interface SettingNotificationControllProps {
  backButtonHandler(): void
}
const SettingNotificationControll: FC<SettingNotificationControllProps> = ({ backButtonHandler }) => {
  return (
    <div className="overflow-y-scroll h-screen no-scrollbar ">
      <div className="fixed gap-3 py-2 flex items-center bg-neutral-950 z-[20] w-full">
        <div className="w-6 aspect-square" onClick={backButtonHandler}>
          <ArrowBackIcon className="w-6 aspect-square" />
        </div>
        <span className="font-semibold text-xl">Notifications</span>
      </div>

      <div className="py-5 block"></div>
      <div className="gap-1 mt-5 flex flex-col  ">
        <span className="font-semibold text-lg">Private chats</span>
        <SettingNotificationControllItem title={"Notification for private chat"} />
        <SettingNotificationControllItem title={"Message preview"} />
      </div>
      <div className="gap-1 mt-5 flex flex-col">
        <span className="font-semibold text-lg">Grpups</span>
        <SettingNotificationControllItem title={"Notification for private chat"} />
        <SettingNotificationControllItem title={"Message preview"} />
      </div>
      <div className="gap-1 mt-5 flex flex-col">
        <span className="font-semibold text-lg">Other</span>
        <SettingNotificationControllItem title={"Notification for private chat"} />
        <SettingNotificationControllItem title={"Message preview"} />
      </div>
      <div className="gap-1 mt-5 flex flex-col">
        <span className="font-semibold text-lg">Other</span>
        <SettingNotificationControllItem title={"Notification for private chat"} />
        <SettingNotificationControllItem title={"Message preview"} />
      </div>
      <div className="gap-1 mt-5 flex flex-col">
        <span className="font-semibold text-lg">Other</span>
        <SettingNotificationControllItem title={"Notification for private chat"} />
        <SettingNotificationControllItem title={"Message preview"} />
      </div>
      <div className="gap-1 mt-5 flex flex-col">
        <span className="font-semibold text-lg">Other</span>
        <SettingNotificationControllItem title={"Notification for private chat"} />
        <SettingNotificationControllItem title={"Message preview"} />
      </div>
    </div>
  )
}

export default SettingNotificationControll

interface SettingNotificationControllItemProps {
  title: string
}
const SettingNotificationControllItem: FC<SettingNotificationControllItemProps> = ({ title }) => {
  return (
    <div className="px-1 py-1 flex justify-between">
      <span>{title}</span>
      <label className="relative inline-flex items-center mb-5 cursor-pointer">
        <input type="checkbox" value="" className="sr-only peer" />
        <div className="w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
      </label>
    </div>
  )
}
