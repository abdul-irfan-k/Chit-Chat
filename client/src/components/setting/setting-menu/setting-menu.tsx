import { ArrowForwardIcon, BellIcon, DatabaseIcon, DevicesIcon, FolderIcon, GearIcon, LockIcon } from "@/constants/icon-constant"
import React, { FC } from "react"
import { settingMenuType } from "../setting-container"

interface SettingMenuProps {
  settingMenuClickHandler(currentMenuType: settingMenuType): void
}
const SettingMenu: FC<SettingMenuProps> = ({ settingMenuClickHandler }) => {
  return (
    <div className="gap-5 mt-10 flex flex-col ">
      <SettingMenuItems
        title="Notification and Sounds"
        onClickHandler={() => settingMenuClickHandler("notificationAndSound")}
      >
        <BellIcon width="" height="" className="w-6 aspect-square" />
      </SettingMenuItems>
      <SettingMenuItems title="Data and Storage" onClickHandler={() => settingMenuClickHandler("dataAndStorage")}>
        <DatabaseIcon width="" height="" className="w-6 aspect-square" />
      </SettingMenuItems>
      <SettingMenuItems
        title="Privacy And Security"
        onClickHandler={() => settingMenuClickHandler("privacyAndSecurity")}
      >
        <LockIcon width="" height="" className="w-6 aspect-square" />
      </SettingMenuItems>
      <SettingMenuItems title="General Setting" onClickHandler={() => settingMenuClickHandler("generalSetting")}>
        <GearIcon width="" height="" className="w-6 aspect-square" />
      </SettingMenuItems>
      <SettingMenuItems title="Chat Folders" onClickHandler={() => settingMenuClickHandler("chatFolders")}>
        <FolderIcon width="" height="" className="w-6 aspect-square" />
      </SettingMenuItems>
      <SettingMenuItems title="Stickers And Emoji" onClickHandler={() => settingMenuClickHandler("strickersAndEmoji")}>
        <BellIcon width="" height="" className="w-6 aspect-square" />
      </SettingMenuItems>
      <SettingMenuItems title="Devices" onClickHandler={() => settingMenuClickHandler("devices")}>
        <DevicesIcon width="" height="" className="w-6 aspect-square" />
      </SettingMenuItems>
      <SettingMenuItems title="Language" onClickHandler={() => settingMenuClickHandler("language")}>
        <BellIcon width="" height="" className="w-6 aspect-square" />
      </SettingMenuItems>
    </div>
  )
}

export default SettingMenu

interface SettingMenuItemsProps {
  children: React.ReactNode
  onClickHandler(): void
  title: string
}
const SettingMenuItems: FC<SettingMenuItemsProps> = ({ children, onClickHandler, title }) => {
  return (
    <div className="gap-3 flex items-center" onClick={onClickHandler}>
      <div className="relative ">{children}</div>
      <span>{title}</span>
      {/* <div className="relative  ml-auto flex items-center justify-center w-6 aspect-square rounded-full dark:bg-neutral-700">
        <ArrowForwardIcon width="" height="" className="w-5 aspect-square" />
      </div> */}
    </div>
  )
}
