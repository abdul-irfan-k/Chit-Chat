"use client"
import React, { useContext, useEffect, useState } from "react"
import { PeerContext } from "../peer-js-provider/peer-js-context-provider"
import { PeerMyVideoRefContext } from "../peer-js-video-provider.tsx/peer-js-video-provider"
import Peers from "peerjs"

const PeerJsStreamMethodProvider = () => {
  const peerContext = useContext(PeerContext)
  const myVideoRef = useContext(PeerMyVideoRefContext)
  const [peer, setPeer] = useState<Peer | undefined>()

  useEffect(() => {
    // console.log("is connected peer ", peerContext?.isConnectedPeer)
    // if (!peerContext?.isConnectedPeer) {
    //   getAudioVideoStream()
    //   return peerContext?.createPeer("4545")
    // }
  }, [peerContext?.isConnectedPeer])

  const intialisePeerEvents = () => {

  }


  const getAudioVideoStream = () => {
    navigator.mediaDevices
      .getUserMedia({
        video: { aspectRatio: { ideal: 16 / 9 } },
        audio: false,
      })
      .then((stream) => {
        myVideoRef?.setVideoStream(stream)
      })
  }

  const addStreamVideoRef = () => {}
  const removeVideoRef = () => {

  }

  const setPeerListeners = () => {
    peerContext?.peer.on("call",(call) => {
       call.answer(myVideoRef.videoStream)
       call.on("stream",(userVideoStream) => {
        addStreamVideoRef()
       })

       call.on("error",() => {

       })
    })
  }

  const connectToNewUser = (userData,stream) => {

    const call = peerContext?.peer.call()
    call?.on("stream",(userVideoStream) => {
        addStreamVideoRef()

    })

    call?.on("close",() => {

    })

    call?.on("error",() => {
        
    })
  }



  return <></>
}

export default PeerJsStreamMethodProvider
