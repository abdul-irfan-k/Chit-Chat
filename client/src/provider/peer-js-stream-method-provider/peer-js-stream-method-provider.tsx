"use client"
import React, { useContext, useEffect, useState } from "react"
import { PeerContext } from "../peer-js-provider/peer-js-context-provider"
import { PeerVideoRefContext } from "../peer-js-video-provider.tsx/peer-js-video-provider"
import Peer, { MediaConnection } from "peerjs"
import { useSelector } from "react-redux"
import { callReducerSlate } from "@/redux/reducers/call-reducer/call-reducer"

import { useAppDispatch } from "@/store"
import { addAvailableMediaDevices } from "@/redux/actions/call-action/call-action"

const PeerJsStreamMethodProvider = () => {
  const peerContext = useContext(PeerContext)
  const videoContext = useContext(PeerVideoRefContext)

  const dispatch = useAppDispatch()

  const { isAvailableCallRoom, callDetail, callSetting, connectionRequiredPeers } = useSelector(
    (state: { callRedcuer: callReducerSlate }) => state.callRedcuer,
  )

  const [peerConnection, setPeerConnection] = useState<MediaConnection | undefined>()

  useEffect(() => {
    if (!isAvailableCallRoom) return
    if (peerContext.isAvailablePeer) {
      setNavigatorStream()
    }
  }, [peerContext?.isAvailablePeer, isAvailableCallRoom])

  useEffect(() => {
    if (!isAvailableCallRoom) return
    peerContext.createPeer(callDetail?.myDetail.peerId)
  }, [isAvailableCallRoom])

  useEffect(() => {
    if (!peerContext.isAvailablePeer) return
    setPeerListeners()
  }, [peerContext.isAvailablePeer])

  useEffect(() => {
    getAvailableMediaDevices()
  }, [])

  useEffect(() => {
    if (callSetting?.isAllowedScreenShare) return getDisplayMediaStream()
  }, [callSetting?.isAllowedScreenShare])

  useEffect(() => {
    if (!callSetting?.isAllowedCamara) {
      stopVideoStream()
    }
  }, [callSetting?.isAllowedCamara])

  useEffect(() => {
    if (!callSetting?.isAllowedMicrophone) {
      stopAudioStream()
    }
  }, [callSetting?.isAllowedMicrophone])




  useEffect(() => {
    if (connectionRequiredPeers?.isInitialPeer) {
      connectToNewUser({ peerId: connectionRequiredPeers.latestPeer?.peerId }, videoContext.videoStream)
    }
  }, [connectionRequiredPeers?.latestPeer])




  const getAudioVideoStream = (): Promise<MediaStream> => {
    return new Promise((resolve, reject) => {
      navigator.mediaDevices
        .getUserMedia({
          video: { aspectRatio: { ideal: 16 / 9 } },
          audio: false,
        })
        .then((stream) => {
          return resolve(stream)
        })
        .catch((err) => {
          return reject()
        })
    })
  }

  const stopAudioStream = () => {
    console.log("stop video stream")
    videoContext.videoStream?.getAudioTracks()[0].stop()
  }

  const stopVideoStream = () => {
    videoContext.videoStream?.getVideoTracks()[0].stop()
  }

  const getDisplayMediaStream = (): Promise<MediaStream> => {
    return new Promise((resolve, reject) => {
      navigator.mediaDevices
        .getDisplayMedia({ video: true })
        .then((stream) => {
          resolve(stream)
          videoContext.setVideoStream(stream)
          // connectToNewUser(callDetail?.communicatorsDetail[0], stream)
          replaceStreamTrack(stream)
        })
        .catch((err) => reject())
    })
  }

  const getAvailableMediaDevices = async () => {
    const devices = await navigator.mediaDevices.enumerateDevices()
    const audioDevices: Array<{ deviceId: string; deviceName: string }> = []
    const videoDevices: Array<{ deviceId: string; deviceName: string }> = []

    devices.forEach((mediaDeviceInfo) => {
      const label = mediaDeviceInfo.label.split(" ")
      const deviceName = label[0] + " " + (label.length > 1 ? label[1] : "")
      if (mediaDeviceInfo.kind == "videoinput") videoDevices.push({ deviceId: mediaDeviceInfo.deviceId, deviceName })
      if (mediaDeviceInfo.kind == "audioinput") audioDevices.push({ deviceId: mediaDeviceInfo.deviceId, deviceName })
    })

    dispatch(addAvailableMediaDevices({ audioDevices, videoDevices }))
  }

  const setNavigatorStream = () => {
    getAudioVideoStream().then((stream) => {
      addVideoStream(callDetail?.myDetail.peerId, stream)
      setPeerListeners(stream)

      if (callDetail?.callChannelType == "single") {
        connectToNewUser(callDetail?.communicatorsDetail[0], stream)
      }
      if (callDetail?.callChannelType == "group") {
        callDetail.communicatorsDetail.map((userDetail) => {
          connectToNewUser({ peerId: userDetail.peerId }, stream)
        })
      }
    })
  }

  const addVideoStream = (peerId: string, stream: MediaStream) => {
    const isMyVideoStream = callDetail?.myDetail.peerId == peerId
    if (isMyVideoStream) {
      videoContext.setVideoStream(stream)
    } else {
      const isAlreadyAvailableStream = videoContext.communicatorsVideoStream.some(
        (videoStream) => videoStream.id == peerId,
      )
      if (!isAlreadyAvailableStream)
        videoContext.setCommunicatorsVideoStream([
          ...videoContext.communicatorsVideoStream,
          { id: peerId, videoSrc: stream },
        ])
    }
  }

  const setPeerListeners = (stream) => {
    peerContext.peer.on("connection", () => {
      console.log("peer connection event ")
    })
    peerContext.peer.on("call", (call) => {
      console.log("call event call ", call)
      setPeerConnection(call)
      call.answer(stream)
      call.on("stream", (userVideoStream) => {
        console.log("stream", userVideoStream)
        addVideoStream(call.peer, userVideoStream)
      })

      call.on("error", () => {
        console.log("peer event error ")
      })
    })
  }

  const connectToNewUser = (userData, stream) => {
    const { peerId } = userData
    const call = peerContext?.peer.call(peerId, stream, { metadata: { id: callDetail?.myDetail.peerId } })
    setPeerConnection(call)
    call?.on("stream", (userVideoStream) => {
      console.log("user video stream", userVideoStream)
      addVideoStream(call.peer, userVideoStream)
    })

    call?.on("close", () => {
      console.log("call close event")
    })

    call?.on("error", () => {
      console.log("call event error")
    })
  }

  const replaceStreamTrack = (mediaStream: MediaStream) => {
    const [videoTrack] = videoContext.videoStream?.getVideoTracks()
    peerConnection?.peerConnection.getSenders().forEach((sender) => {
      console.log("sender ", sender)

      if (sender.track.kind == "video" && videoContext?.videoStream?.getVideoTracks()?.length > 0) {
        console.log("replace track")
        const [track] = mediaStream.getVideoTracks()
        sender.replaceTrack(track)
        // sender.replaceTrack(track,)
      }
    })
  }

  const addStreamTrack = (mediaStream: MediaStream) => {}

  return <></>
}

export default PeerJsStreamMethodProvider
