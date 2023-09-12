"use client"

import { initialiseSocket } from "@/reducers/socket-reducers/socket-reducers"
import { Socket } from "@/socket-io-client/socket"
import { useEffect } from "react"
import { useDispatch } from "react-redux"

const SocketIoIntialise = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initialiseSocket(Socket))
  }, [])
  return <></>
}

export default SocketIoIntialise
