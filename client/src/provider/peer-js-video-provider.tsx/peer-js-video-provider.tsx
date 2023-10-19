"use client"
import React, { useState } from "react"

export const PeerMyVideoRefContext = React.createContext(undefined)
export const VideoCallCommunicatorsVideoRefContext = React.createContext(undefined)

interface communicatorVideoState {
  id: string
  videoSrc: MediaStream
}

const PeerVideoProvider = ({ children }: { children: React.ReactNode }) => {
  const [videoStream, setVideoStream] = useState<MediaStream>()
  const [communicatorsVideoStream, setCommunicatorsVideoStream] = useState<Array<communicatorVideoState>>([])

  return (
    <>
      <PeerMyVideoRefContext.Provider value={{ videoStream, setVideoStream,communicatorsVideoStream,setCommunicatorsVideoStream }}>
        {children}
      </PeerMyVideoRefContext.Provider>
    </>
  )
}

export default PeerVideoProvider
