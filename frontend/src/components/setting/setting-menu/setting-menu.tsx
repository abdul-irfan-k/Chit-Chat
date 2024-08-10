import {
  ArrowForwardIcon,
  BellIcon,
  DatabaseIcon,
  DevicesIcon,
  FolderIcon,
  GearIcon,
  LockIcon,
} from "@/constants/icon-constant"
import React, { FC } from "react"
import { settingMenuType } from "../setting-container"

interface SettingMenuProps {
  handleSettingMenuClick(currentMenuType: settingMenuType): void
}
const SettingMenu: FC<SettingMenuProps> = ({ handleSettingMenuClick }) => {
  return (
    <div className="gap-5 mt-10 flex flex-col ">
      <SettingMenuItems
        title="Notification and Sounds"
        onClickHandler={() => handleSettingMenuClick("notificationAndSound")}
      >
        <BellIcon width="" height="" className="w-6 aspect-square" />
      </SettingMenuItems>
      <SettingMenuItems title="Data and Storage" onClickHandler={() => handleSettingMenuClick("dataAndStorage")}>
        <DatabaseIcon width="" height="" className="w-6 aspect-square" />
      </SettingMenuItems>
      <SettingMenuItems
        title="Privacy And Security"
        onClickHandler={() => handleSettingMenuClick("privacyAndSecurity")}
      >
        <LockIcon width="" height="" className="w-6 aspect-square" />
      </SettingMenuItems>
      <SettingMenuItems title="General Setting" onClickHandler={() => handleSettingMenuClick("generalSetting")}>
        <GearIcon width="" height="" className="w-6 aspect-square" />
      </SettingMenuItems>
      <SettingMenuItems title="Chat Folders" onClickHandler={() => handleSettingMenuClick("chatFolders")}>
        <FolderIcon width="" height="" className="w-6 aspect-square" />
      </SettingMenuItems>
      <SettingMenuItems title="Stickers And Emoji" onClickHandler={() => handleSettingMenuClick("strickersAndEmoji")}>
        <BellIcon width="" height="" className="w-6 aspect-square" />
      </SettingMenuItems>
      <SettingMenuItems title="Devices" onClickHandler={() => handleSettingMenuClick("devices")}>
        <DevicesIcon width="" height="" className="w-6 aspect-square" />
      </SettingMenuItems>
      <SettingMenuItems title="Language" onClickHandler={() => handleSettingMenuClick("language")}>
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
