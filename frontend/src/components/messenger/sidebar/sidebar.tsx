"use client"
import { sidebarSortReducerState } from "@/redux/reducers/sidebar-sort-reducer/sidebar-sort-reducer"
import React from "react"
import { useSelector } from "react-redux"
import MessengerSidebar from "./messenger-sidebar/messenger-sidebar"
import SettingContainer from "@/components/setting/setting-container"
import SideBarNotificationContainer from "@/components/notificaton/sidebar-notification/sidebar-notification-container"

const SideBar = () => {
  const { currentSideBarSortOption, isInitialRender } = useSelector(
    (state: { sidebarSort: sidebarSortReducerState }) => state.sidebarSort,
  )
  return (
    <div className="relative flex flex-col    h-[100vh]  bg-slate-200 dark:bg-background-primary overflow-hidden px-3  pt-2 sm:px-5 md:px-5 md:pt-4">
      {currentSideBarSortOption == "messenger" && <MessengerSidebar isInitialRender={isInitialRender} />}
      {currentSideBarSortOption == "settting" && <SettingContainer />}
      {currentSideBarSortOption == "notification" && <SideBarNotificationContainer />}
    </div>
  )
}

export default SideBar
