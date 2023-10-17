"use client"
import React, { useState } from "react"

export const VideoCallMyVideoRefContext = React.createContext({})
export const VideoCallCommunicatorsVideoRefContext = React.createContext({})


const PeerVideoProvider = ({children}:{children: React.ReactNode}) => {
    const [videoStream,setVideoStream] = useState()

    return <>
    <VideoCallMyVideoRefContext.Provider  value={{videoStream,setVideoStream}} >
{children}
    </VideoCallMyVideoRefContext.Provider>
    </>

}