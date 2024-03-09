"use client"
import { SocketClient } from "@/socket-io-client/socket"
import { useAppDispatch } from "@/store"
import { ClientToServerEvents, ServerToClientEvents } from "chit-chat-events"
import React, { FC, useEffect, useState } from "react"
import { Socket } from "socket.io-client"

interface SocketIoProviderProps {
  children: React.ReactNode
}

const socketClientObj = new SocketClient()
export const socketContext = React.createContext<{
  socket: SocketClient | Socket<ServerToClientEvents, ClientToServerEvents>
}>({ socket: socketClientObj })
export const useSocketIoContext = () => React.useContext(socketContext)

const SocketIoProvider: FC<SocketIoProviderProps> = ({ children }) => {
  const dispatch = useAppDispatch()
  const [socket, setSocket] = useState<SocketClient | Socket<DefaultEventsMap, DefaultEventsMap>>(socketClientObj)
  useEffect(() => {
    ;(async () => {
      try {
        const { socket: connectedSocket } = await socketClientObj.connect()
        setSocket(connectedSocket)
      } catch (error) {}
    })()
  }, [])
  return (
    <>
      <socketContext.Provider value={{ socket }}>{children}</socketContext.Provider>
    </>
  )
}

export default SocketIoProvider
