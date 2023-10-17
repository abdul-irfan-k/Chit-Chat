import Peer from "peerjs"
import React, { createContext, useEffect, useState } from "react"

interface IPeerContext {
  createPeer: (id: string, peerOptions?: Peer.peerOptions) => void
  connectPeer: (id: string, peerOption?: Peer.PeerConnectOption) => void
  diconnectPeer: () => void
  isConnectedPeer: boolean
}

export const PeerContext = createContext<IPeerContext | undefined>(undefined)

const PeerContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [peer, setPeer] = useState<Peer | undefined>()
  const [isConnectedPeer, setIsConnnectedPeer] = useState<boolean>(false)

  const createPeer = (id: string, peerOptions?: Peer.peerOptions) => {
    setPeer(new Peer(id, peerOptions))
  }
  const connectPeer = (id: string, peerOption?: Peer.PeerConnectOption) => {
    if (peer === undefined) return
    peer.connect(id, peerOption)
  }

  const diconnectPeer = () => {
    if (peer === undefined) return
    peer.disconnect()
    peer.destroy()
    setPeer(undefined)
  }

  useEffect(() => {
    const peerConnectionEventHandler = () => {
      setIsConnnectedPeer(true)
    }
    const peerDisconnectionEventHandler = () => {
      setIsConnnectedPeer(false)
    }

    peer?.on("connection", peerConnectionEventHandler)
    peer?.on("disconnected", peerDisconnectionEventHandler)

    return () => {
      peer?.on("connection", peerConnectionEventHandler)
      peer?.on("disconnected", peerDisconnectionEventHandler)
    }
  }, [peer])

  
  return (
    <>
      <PeerContext.Provider value={{ connectPeer, createPeer, diconnectPeer, isConnectedPeer }}>
        {children}
      </PeerContext.Provider>
    </>
  )
}

export default PeerContextProvider
