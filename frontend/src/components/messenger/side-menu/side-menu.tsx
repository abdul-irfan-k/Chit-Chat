"use client"

import Image from "next/image"
import { FC, useState } from "react"
import { useRouter } from "next/navigation"
import { useSelector } from "react-redux"
import { callReducerState } from "@/redux/reducers/call-reducer/call-reducer"
import FullScreenNotification from "@/components/notificaton/full-screen-notification/full-screen-notification"
import { useAppDispatch } from "@/store"
import { sidebarReducerAction } from "@/redux/reducers/sidebar-sort-reducer/sidebar-sort-reducer"
import { userDetailState } from "@/redux/reducers/user-redicer/user-reducer"
import { Button } from "@/components/ui/button"
import { Bell, Contact, MessageCircle, Moon, Power, Settings, Video } from "lucide-react"
import { logoutHandler } from "@/redux/actions/user-action/user-action"

const SideMenu = () => {
  const dispatch = useAppDispatch()
  const router = useRouter()
  const { isAvailableCallRoom } = useSelector((state: { callRedcuer: callReducerState }) => state.callRedcuer)
  const { userDetail } = useSelector((state: { userDetail: userDetailState }) => state.userDetail)
  const [showNotification, setShowNotification] = useState<boolean>(false)

  const videoCallButtonHandler = () => {
    if (isAvailableCallRoom) return router.push("/video-call")
    else return router.push("/create-video-call")
  }

  const settingButtonHandler = () => {
    dispatch(sidebarReducerAction.changeSideBarSortOption({ currentSideBarSortOption: "settting" }))
  }

  const notificationButtonHandler = () => {
    dispatch(sidebarReducerAction.changeSideBarSortOption({ currentSideBarSortOption: "notification" }))
  }

  const handleSignOutButtonClick = async () => {
    await logoutHandler()
    router.push("/login")
  }

  return (
    <div className="  py-10 h-[100vh] bg-background-primary border-r-[1px] dark:border-neutral-600   md:flex   md:flex-col ">
      <div className="relative w-10 mx-auto aspect-square">
        <Image alt="logo" src={"/Asset/logo.png"} fill />
      </div>
      <div className=" gap-5 my-auto  h-fit w-20  flex flex-col justify-between items-center   ">
        <div className="p-[3px]  w-12 bg-primary  overflow-hidden flex items-center justify-center aspect-square rounded-full ">
          <div className="relative w-full h-full  rounded-full overflow-hidden">
            <Image
              alt="profile-image"
              src={userDetail != null && userDetail?.profileImageUrl != undefined ? userDetail?.profileImageUrl : ""}
              fill
            />
          </div>
        </div>

        <SideMenuIcon onClickHandler={() => router.push("/messenger")}>
          <MessageCircle className="w-6 aspect-square" />
        </SideMenuIcon>
        <SideMenuIcon onClickHandler={videoCallButtonHandler}>
          <Video className="w-6 aspect-square" />
        </SideMenuIcon>
        <SideMenuIcon>
          <Contact className="w-6 aspect-square" />
        </SideMenuIcon>
        <SideMenuIcon onClickHandler={notificationButtonHandler}>
          <Bell className="w-6 aspect-square" />
        </SideMenuIcon>
        <SideMenuIcon onClickHandler={settingButtonHandler}>
          <Settings className="w-6 aspect-square" />
        </SideMenuIcon>
        <SideMenuIcon>
          <Moon className="w-6 aspect-square" />
        </SideMenuIcon>
        <SideMenuIcon onClickHandler={handleSignOutButtonClick}>
          <Power className="w-6 aspect-square" />
        </SideMenuIcon>
      </div>
      {showNotification && <FullScreenNotification />}
    </div>
  )
}

export default SideMenu

interface SideMenuIconInterface {
  children: React.ReactNode
  onClickHandler?(): void
}
const SideMenuIcon: FC<SideMenuIconInterface> = ({ children, onClickHandler }) => {
  return (
    <Button
      size={"icon"}
      rounded
      onClick={onClickHandler}
      variant={"ghost"}
      className="hover:bg-primary hover:text-black"
    >
      {children}
    </Button>
  )
}
