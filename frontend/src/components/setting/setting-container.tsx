import React, { useState } from "react"
import SettingTopBar from "./setting-top-bar/sertting-top-bar"
import SettingProfile from "./setting-profile/sertting-profile"
import { useSelector } from "react-redux"
import { userDetailState } from "@/redux/reducers/user-redicer/user-reducer"
import SettingMenu from "./setting-menu/setting-menu"
import SettingNotificationControll from "./setting-notification-control/setting-notification-control"
import { motion, AnimatePresence } from "framer-motion"
import GeneralSetting from "./general-setting/general-setting"
import SettingEditProfile from "./setting-edit-profile/setting-editprofile"
import { useAppDispatch } from "@/store"
import { sidebarReducerAction } from "@/redux/reducers/sidebar-sort-reducer/sidebar-sort-reducer"
import AccountSettng from "./account-setting/account-settng"

export type settingMenuType =
  | "notificationAndSound"
  | "dataAndStorage"
  | "privacyAndSecurity"
  | "generalSetting"
  | "chatFolders"
  | "strickersAndEmoji"
  | "devices"
  | "language"
  | "profileEdit"
  | "acountSetting"
  | undefined

const SettingContainer = () => {
  const dispatch = useAppDispatch()
  const [selectedSettingMenu, setSelectedSettingMenu] = useState<settingMenuType>()

  const handleSettingMenuClick = (selectedMenuType: settingMenuType) => {
    setSelectedSettingMenu(selectedMenuType)
  }

  const { userDetail } = useSelector((state: { userDetail: userDetailState }) => state.userDetail)
  const handleBackButtonClick = () => setSelectedSettingMenu(undefined)

  return (
    <div className="relative  overflow-hidden w-full h-full">
      {userDetail && (
        <>
          <AnimatePresence>
            {selectedSettingMenu == undefined && (
              <motion.div
                key={selectedSettingMenu}
                initial={{ translateX: "-100%" }}
                animate={{ translateX: "0%" }}
                exit={{ translateX: "-100%" }}
                transition={{ duration: 0.4 }}
                className="absolute w-full"
              >
                <SettingTopBar
                  handleCloseButtonClick={() => {
                    dispatch(sidebarReducerAction.changeSideBarSortOption({ currentSideBarSortOption: "messenger" }))
                  }}
                />
                <SettingProfile
                  {...userDetail}
                  phoneNumber=""
                  profileImageSrc={
                    userDetail.profileImageUrl == undefined ? "/Asset/avatar.jpg" : userDetail.profileImageUrl
                  }
                  handleCloseButtonClick={() => handleSettingMenuClick("profileEdit")}
                />
                <SettingMenu handleSettingMenuClick={handleSettingMenuClick} />
              </motion.div>
            )}

            {selectedSettingMenu == "notificationAndSound" && (
              <motion.div
                key={selectedSettingMenu}
                initial={{ translateX: "100%" }}
                animate={{ translateX: "0%" }}
                exit={{ translateX: "100%" }}
                transition={{ duration: 0.4 }}
                className="absolute w-full"
              >
                <SettingNotificationControll backButtonHandler={handleBackButtonClick} />
              </motion.div>
            )}
            {selectedSettingMenu == "acountSetting" && (
              <motion.div
                key={selectedSettingMenu}
                initial={{ translateX: "100%" }}
                animate={{ translateX: "0%" }}
                exit={{ translateX: "100%" }}
                transition={{ duration: 0.4 }}
                className="absolute w-full"
              >
                <AccountSettng handleBackButtonClick={handleBackButtonClick} />
              </motion.div>
            )}

            {selectedSettingMenu == "generalSetting" && (
              <motion.div
                key={selectedSettingMenu}
                initial={{ translateX: "100%" }}
                animate={{ translateX: "0%" }}
                exit={{ translateX: "100%" }}
                transition={{ duration: 0.4 }}
                className="absolute w-full"
              >
                <GeneralSetting key={selectedSettingMenu} handleBackButtonClick={handleBackButtonClick} />
              </motion.div>
            )}
            {selectedSettingMenu == "profileEdit" && (
              <motion.div
                key={selectedSettingMenu}
                initial={{ translateX: "100%" }}
                animate={{ translateX: "0%" }}
                exit={{ translateX: "100%" }}
                transition={{ duration: 0.4 }}
                className="absolute w-full"
              >
                <SettingEditProfile
                  key={selectedSettingMenu}
                  backButtonHandler={handleBackButtonClick}
                  // profileImageUrl={"/Asset/avatar.jpg"}
                  userDetail={userDetail}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </>
      )}
    </div>
  )
}

export default SettingContainer
