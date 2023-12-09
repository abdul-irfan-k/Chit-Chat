import React, { useState } from "react"
import SettingTopBar from "./setting-top-bar/sertting-top-bar"
import SettingProfile from "./setting-profile/sertting-profile"
import { useSelector } from "react-redux"
import { userDetailState } from "@/redux/reducers/user-redicer/user-reducer"
import SettingMenu from "./setting-menu/setting-menu"
import SettingNotificationControll from "./setting-notification-control/setting-notification-control"
import { motion, AnimatePresence } from "framer-motion"

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
    <div className="relative  overflow-hidden w-full h-full">
      {userDetail != null && (
        <>
          <AnimatePresence>
            
            {settingSelectedMenu == undefined && (
              <motion.div
                key={settingSelectedMenu}
                initial={{ translateX: "-100%" }}
                animate={{ translateX: "0%" }}
                exit={{ translateX: "-100%" }}
                transition={{ duration: 0.4 }}
                className="absolute w-full"
              >
                <SettingTopBar backButtonClickHandler={() => {}} editButtonClickHandler={() => {}} />
                <SettingProfile
                  {...userDetail}
                  phoneNumber=""
                  profileImageSrc={
                    userDetail.profileImageUrl == undefined ? "/Asset/avatar.jpg" : userDetail.profileImageUrl
                  }
                />
                <SettingMenu settingMenuClickHandler={settingMenuListClickHandler} />
              </motion.div>
            )}


            {settingSelectedMenu == "notificationAndSound" && (
              <motion.div
                key={settingSelectedMenu}
                initial={{ translateX: "100%" }}
                animate={{ translateX: "0%" }}
                exit={{ translateX: "100%" }}
                transition={{ duration: 0.4 }}
                className="absolute w-full"
              >
                <SettingNotificationControll backButtonHandler={() => setSettingSelectedMenu(undefined)} />
              </motion.div>
            )}
          </AnimatePresence>
        </>
      )}
    </div>
  )
}

export default SettingContainer
