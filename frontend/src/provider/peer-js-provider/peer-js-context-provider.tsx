"use client"
import {Peer} from "peerjs"
import React, { createContext, useEffect, useState } from "react"
import PeerVideoProvider from "../peer-js-video-provider.tsx/peer-js-video-provider"
import PeerJsStreamMethodProvider from "../peer-js-stream-method-provider/peer-js-stream-method-provider"

interface IPeerContext {
  createPeer: (id: string, peerOptions?: Peer.peerOptions) => void
  connectPeer: (id: string, peerOption?: Peer.PeerConnectOption) => void
  diconnectPeer: () => void
  isConnectedPeer: boolean
  isAvailablePeer: boolean
  peer: Peer
}

export const PeerContext = createContext<IPeerContext>(undefined)

const PeerContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [peer, setPeer] = useState<Peer | undefined>()
  const [isConnectedPeer, setIsConnnectedPeer] = useState<boolean>(false)
  const [isAvailablePeer, setIsAvilablePeer] = useState<boolean>(false)

  const createPeer = async (id: string, peerOptions) => {
    import("peerjs").then(({default:Peer}) => {
      
      setPeer(new Peer(id,peerOptions))
      setIsAvilablePeer(true) 
    })
  }
  const connectPeer = (id: string, peerOption?: Peer.PeerConnectOption) => {
    console.log("peer",peer)
    if (peer === undefined) return
   const connectedData =  peer.connect(id, peerOption)
  }

  const diconnectPeer = () => {
    if (peer === undefined) return
    peer.disconnect()
    peer.destroy()
    setPeer(undefined)
  }

  useEffect(() => {
    const peerConnectionEventHandler = () => {
      console.log('peer connection')
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
      <PeerContext.Provider value={{createPeer,connectPeer,diconnectPeer,isConnectedPeer,peer,isAvailablePeer}}>
        <PeerVideoProvider>
          <PeerJsStreamMethodProvider />
          <>{children}</>
        </PeerVideoProvider>
      </PeerContext.Provider>
    </>
  )
}

export default PeerContextProvider
