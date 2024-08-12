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
import { Button } from "@/components/ui/button"
import { ChevronRight } from "lucide-react"

interface SettingMenuProps {
  handleSettingMenuClick(currentMenuType: settingMenuType): void
}
const SettingMenu: FC<SettingMenuProps> = ({ handleSettingMenuClick }) => {
  return (
    <div className="gap-1 mt-10 flex flex-col bg-background-secondary ">
      <SettingMenuItems
        message="Update your account Details"
        onClickHandler={() => handleSettingMenuClick("profileEdit")}
        title="Account"
      />
      <SettingMenuItems
        message="Control you chat backgroup"
        onClickHandler={() => handleSettingMenuClick("generalSetting")}
        title="Chat"
      />
      <SettingMenuItems
        message="Change the general setting"
        onClickHandler={() => handleSettingMenuClick("profileEdit")}
        title="General"
      />
      <SettingMenuItems
        message="Change the language"
        onClickHandler={() => handleSettingMenuClick("profileEdit")}
        title="Language"
      />
      <SettingMenuItems message="help" onClickHandler={() => handleSettingMenuClick("profileEdit")} title="Help" />
    </div>
  )
}

export default SettingMenu

interface SettingMenuItemsProps {
  title: string
  message: string
  onClickHandler(): void
}
const SettingMenuItems: FC<SettingMenuItemsProps> = ({ onClickHandler, title, message }) => {
  return (
    <div className="py-7 flex justify-between text-text  bg-background-primary" onClick={onClickHandler}>
      <div className="flex flex-col">
        <span className="text-lg font-semibold">{title}</span>
        <span>{message}</span>
      </div>

      <Button className=" relative w-6 aspect-square bg-[#303237]" rounded size={"icon"}>
        <ChevronRight className="w-5 aspect-square" />
      </Button>
    </div>
  )
}
