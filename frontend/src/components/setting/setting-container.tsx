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
  | undefined


const SettingContainer = () => {
  const dispatch = useAppDispatch()
  const [settingSelectedMenu, setSettingSelectedMenu] = useState<settingMenuType>()

  const settingMenuListClickHandler = (selectedMenuType: settingMenuType) => {
    setSettingSelectedMenu(selectedMenuType)
  }

  const { userDetail } = useSelector((state: { userDetail: userDetailState }) => state.userDetail)
  const settingBackButtonHandler = () => setSettingSelectedMenu(undefined)

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
                <SettingTopBar
                  backButtonClickHandler={() => {
                    dispatch(sidebarReducerAction.changeSideBarSortOption({ currentSideBarSortOption: "messenger" }))
                  }}
                  editButtonClickHandler={() => setSettingSelectedMenu("profileEdit")}
                />
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
                <SettingNotificationControll backButtonHandler={settingBackButtonHandler} />
              </motion.div>
            )}

            {settingSelectedMenu == "generalSetting" && (
              <motion.div
                key={settingSelectedMenu}
                initial={{ translateX: "100%" }}
                animate={{ translateX: "0%" }}
                exit={{ translateX: "100%" }}
                transition={{ duration: 0.4 }}
                className="absolute w-full"
              >
                <GeneralSetting key={settingSelectedMenu} backButtonHandler={settingBackButtonHandler} />
              </motion.div>
            )}
            {settingSelectedMenu == "profileEdit" && (
              <motion.div
                key={settingSelectedMenu}
                initial={{ translateX: "100%" }}
                animate={{ translateX: "0%" }}
                exit={{ translateX: "100%" }}
                transition={{ duration: 0.4 }}
                className="absolute w-full"
              >
                <SettingEditProfile
                  key={settingSelectedMenu}
                  backButtonHandler={settingBackButtonHandler}
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
