"use client"

import { addAudioCallNotification } from "@/redux/actions/notification-action/notification-action"
import { initialiseSocket } from "@/redux/reducers/socket-reducer/socket-reducers"
import { Socket } from "@/socket-io-client/socket"
import { useEffect } from "react"
import { useDispatch } from "react-redux"

const SocketIoIntialise = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    // dispatch(initialiseSocket(Socket))
    // dispatch(addAudioCallNotification())
  }, [])
  return <></>
}

export default SocketIoIntialise
