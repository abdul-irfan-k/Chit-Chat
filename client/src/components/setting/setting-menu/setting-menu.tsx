import { BellIcon } from "@/constants/icon-constant"
import React, { FC } from "react"
import { settingMenuType } from "../setting-container"

interface SettingMenuProps {
  settingMenuClickHandler(currentMenuType: settingMenuType): void
}
const SettingMenu: FC<SettingMenuProps> = ({ settingMenuClickHandler }) => {
  return (
    <div className="flex flex-col gap-3">
      <SettingMenuItems
        title="Notification and Sounds"
        onClickHandler={() => settingMenuClickHandler("notificationAndSound")}
      >
        <BellIcon width="" height="" className="w-6 aspect-square" />
      </SettingMenuItems>
      <SettingMenuItems title="Data and Storage" onClickHandler={() => settingMenuClickHandler("dataAndStorage")}>
        <BellIcon width="" height="" className="w-6 aspect-square" />
      </SettingMenuItems>
      <SettingMenuItems
        title="Privacy And Security"
        onClickHandler={() => settingMenuClickHandler("privacyAndSecurity")}
      >
        <BellIcon width="" height="" className="w-6 aspect-square" />
      </SettingMenuItems>
      <SettingMenuItems title="General Setting" onClickHandler={() => settingMenuClickHandler("generalSetting")}>
        <BellIcon width="" height="" className="w-6 aspect-square" />
      </SettingMenuItems>
      <SettingMenuItems title="Chat Folders" onClickHandler={() => settingMenuClickHandler("chatFolders")}>
        <BellIcon width="" height="" className="w-6 aspect-square" />
      </SettingMenuItems>
      <SettingMenuItems title="Stickers And Emoji" onClickHandler={() => settingMenuClickHandler("strickersAndEmoji")}>
        <BellIcon width="" height="" className="w-6 aspect-square" />
      </SettingMenuItems>
      <SettingMenuItems title="Devices" onClickHandler={() => settingMenuClickHandler("devices")}>
        <BellIcon width="" height="" className="w-6 aspect-square" />
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
    <div className="flex items-center" onClick={onClickHandler}>
      <div className="relative ">{children}</div>
      <span>{title}</span>
      <div className="relative  ml-auto">
        <BellIcon width="" height="" className="w-6 aspect-square" />
      </div>
    </div>
  )
}
