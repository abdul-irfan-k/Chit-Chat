"use client"
import React, { useState } from "react"

interface PeerVideoRefContext {
  videoStream: MediaStream | undefined
  setVideoStream: React.Dispatch<React.SetStateAction<MediaStream | undefined>>
  communicatorsVideoStream: communicatorVideoState[]
  setCommunicatorsVideoStream: React.Dispatch<React.SetStateAction<communicatorVideoState[]>>
}
export const PeerVideoRefContext = React.createContext<PeerVideoRefContext>(undefined)

interface communicatorVideoState {
  id: string
  videoSrc: MediaStream
  screenVideoSrc?:MediaStream
}

const PeerVideoProvider = ({ children }: { children: React.ReactNode }) => {
  const [videoStream, setVideoStream] = useState<MediaStream>()
  const [communicatorsVideoStream, setCommunicatorsVideoStream] = useState<Array<communicatorVideoState>>([])
  
  return (
    <>
      <PeerVideoRefContext.Provider
        value={{ videoStream, setVideoStream, communicatorsVideoStream, setCommunicatorsVideoStream }}
      >
        {children}
      </PeerVideoRefContext.Provider>
    </>
  )
}

export default PeerVideoProvider
