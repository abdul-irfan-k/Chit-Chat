import React, { useState } from "react"
import SettingTopBar from "./setting-top-bar/sertting-top-bar"
import SettingProfile from "./setting-profile/sertting-profile"
import { useSelector } from "react-redux"
import { userDetailState } from "@/redux/reducers/user-redicer/user-reducer"
import SettingMenu from "./setting-menu/setting-menu"

export type settingMenuType =
  | "notificationAndSound"
  | "dataAndStorage"
  | "privacyAndSecurity"
  | "generalSetting"
  | "chatFolders"
  | "strickersAndEmoji"
  | "devices"
  | "language"
  | undefined
const SettingContainer = () => {
  const [settingSelectedMenu, setSettingSelectedMenu] = useState<settingMenuType>()

  const settingMenuListClickHandler = (selectedMenuType: settingMenuType) => {
    setSettingSelectedMenu(selectedMenuType)
  }

  const { userDetail } = useSelector((state: { userDetail: userDetailState }) => state.userDetail)

  return (
    <div>
      {settingSelectedMenu == undefined && userDetail != null && (
        <>
          <div>
            <SettingTopBar />
            <SettingProfile
              {...userDetail}
              phoneNumber=""
              profileImageSrc={
                userDetail.profileImageUrl == undefined ? "/Asset/avatar.jpg" : userDetail.profileImageUrl
              }
            />
            <SettingMenu  />
          </div>
        </>
      )}
    </div>
  )
}

export default SettingContainer
