"use client"

import { addAudioCallNotification } from "@/redux/actions/notification-action/notification-action"
import { socketConnectHandler } from "@/redux/actions/socket-action/socket-action"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"

const SocketIoIntialise = () => { 
  // const dispatch = useDispatch()
   
  useEffect(() => {
    // dispatch(initialiseSocket(Sockets))
    // dispatch(addAudioCallNotification())

    // dispatch(socketConnectHandler(socket))
  }, [])
  return <></>
}

export default SocketIoIntialise
