"use client"
import React, { useEffect, useState } from "react"
import AudioCallNotification from "./audio-call-notification/audio-call-notification"
import { useDispatch, useSelector } from "react-redux"
import { callNotificationReducerSlate } from "@/redux/reducers/notification-reducer/notification-reducer"
import { userDetailState } from "@/redux/reducers/user-redicer/user-reducer"
import { useSocketIoContext } from "@/provider/socket-io-provider/socket-io-provider"
import { callReducerAction, callReducerState } from "@/redux/reducers/call-reducer/call-reducer"
import { useAppDispatch } from "@/store"

const CallNotificationContainer = () => {
  const dispatch = useAppDispatch()

  const [isPopUpedNotification, setIsPopUpedNotification] = useState(false)
  const { callRequestDetail } = useSelector((state: { callRedcuer: callReducerState }) => state.callRedcuer)
  const { socket } = useSocketIoContext()
  const { userDetail } = useSelector((state: { userDetail: userDetailState }) => state.userDetail)

  const outSideClickHandler = () => {
    setIsPopUpedNotification(false)
  }

  useEffect(() => {
    if (callRequestDetail) {
      return setIsPopUpedNotification(true)
    } else setIsPopUpedNotification(false)
  }, [callRequestDetail])

  const callAcceptHandler = () => {
    if (userDetail == null) return
    socket.emit("privateCall:acceptRequest", { callRoomId: callRequestDetail?.callRoomId, userId: userDetail._id })
  }
  const callDeclineHandler = () => {
    if (userDetail == null) return
    socket.emit("privateCall:end", { callRoomId: callRequestDetail?.callRoomId, userId: userDetail._id })
    dispatch(callReducerAction.removeCallRequest())
  }

  return (
    <div>
      <div className="fixed left-[50%] top-5 translate-x-[-50%] w-[40%] z-40">
        {callRequestDetail && callRequestDetail.requestType == "incoming" && (
          <AudioCallNotification
            userName={callRequestDetail.communicatorsDetail.name}
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
