"use client"
import React, { useEffect, useState } from "react"
import AudioCallNotification from "./audio-call-notification/audio-call-notification"
import { useSelector } from "react-redux"
import { callNotificationReducerSlate } from "@/redux/reducers/notification-reducer/notification-reducer"
import { userDetailState } from "@/redux/reducers/user-redicer/user-reducer"
import { useSocketIoContext } from "@/provider/socket-io-provider/socket-io-provider"

const CallNotificationContainer = () => {
  const [isPopUpedNotification, setIsPopUpedNotification] = useState(false)
  const { isAvailableCallNotification, callNotificationData } = useSelector(
    (state: { notificationReducer: callNotificationReducerSlate }) => state.notificationReducer,
  )
  const {socket} = useSocketIoContext()
  const { userDetail } = useSelector((state: { userDetail: userDetailState }) => state.userDetail)

  const outSideClickHandler = () => {
    setIsPopUpedNotification(false)
  }

  useEffect(() => {
    if (isAvailableCallNotification) {
      console.log("available call notifcation ", callNotificationData)
      return setIsPopUpedNotification(true)
    } else setIsPopUpedNotification(false)
  }, [isAvailableCallNotification])

  const callAcceptHandler = () => {
    if ( userDetail == null) return
    socket.emit("privateCall:acceptRequest", { callRoomId: callNotificationData?.callRoomId, userId: userDetail._id })
  }
  const callDeclineHandler = () => {}

  return (
    <div>
      <div className="fixed left-[50%] top-5 translate-x-[-50%] w-[40%] z-40">
        {isAvailableCallNotification && (
          <AudioCallNotification
            userName={callNotificationData?.userDetail?.name}
            outSideClickHandler={outSideClickHandler}
            callAcceptHandler={callAcceptHandler}
            callDeclineHandler={callDeclineHandler}
          />
        )}
      </div>
      {isPopUpedNotification && (
        <div className="fixed left-0 top-0 w-screen h-screen z-30" style={{ background: "rgba(0,0,0,.4)" }}></div>
      )}
    </div>
  )
}

export default CallNotificationContainer
