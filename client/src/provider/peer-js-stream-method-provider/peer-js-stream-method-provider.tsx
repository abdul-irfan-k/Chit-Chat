"use client"
import React, { useContext, useEffect, useState } from "react"
import { PeerContext } from "../peer-js-provider/peer-js-context-provider"
import { PeerVideoRefContext } from "../peer-js-video-provider.tsx/peer-js-video-provider"
import Peer, { MediaConnection } from "peerjs"
import { useSelector } from "react-redux"
import { callReducerSlate } from "@/redux/reducers/call-reducer/call-reducer"

import { useAppDispatch } from "@/store"
import { addAvailableMediaDevices } from "@/redux/actions/call-action/call-action"
import { socketReducerState } from "@/redux/reducers/socket-reducer/socket-reducers"
import { userDetailState } from "@/redux/reducers/user-redicer/user-reducer"

const PeerJsStreamMethodProvider = () => {
  // const peerContext = useContext(PeerContext)
  // const videoContext = useContext(PeerVideoRefContext)
  // const dispatch = useAppDispatch()

  // const { isAvailableCallRoom, callDetail, callSetting, connectionRequiredPeers } = useSelector(
  //   (state: { callRedcuer: callReducerSlate }) => state.callRedcuer,
  // )

  // const [peerConnection, setPeerConnection] = useState<MediaConnection | undefined>()

  // useEffect(() => {
  //   if (!isAvailableCallRoom) return
  //   if (peerContext.isAvailablePeer) {
  //     setNavigatorStream()
  //   }
  // }, [peerContext?.isAvailablePeer, isAvailableCallRoom])

  // useEffect(() => {
  //   if (!isAvailableCallRoom) return
  //   peerContext.createPeer(callDetail?.myDetail.peerId)
  // }, [isAvailableCallRoom])

  // useEffect(() => {
  //   if (!peerContext.isAvailablePeer) return
  //   setPeerListeners()
  // }, [peerContext.isAvailablePeer])

  // useEffect(() => {
  //   getAvailableMediaDevices()
  // }, [])

  // useEffect(() => {
  //   if (callSetting?.isAllowedScreenShare) return getDisplayMediaStream()
  // }, [callSetting?.isAllowedScreenShare])

  // useEffect(() => {
  //   if (!callSetting?.isAllowedCamara) {
  //     stopVideoStream()
  //   }
  // }, [callSetting?.isAllowedCamara])

  // useEffect(() => {
  //   if (!callSetting?.isAllowedMicrophone) {
  //     stopAudioStream()
  //   }
  // }, [callSetting?.isAllowedMicrophone])

  // useEffect(() => {
  //   // console.log('connect to new user')
  //   // if (connectionRequiredPeers?.isInitialPeer) {
  //   if (connectionRequiredPeers?.latestPeer != undefined) {
  //     setPeerListeners(videoContext.videoStream)
  //     connectToNewUser({ peerId: connectionRequiredPeers.latestPeer?.peerId }, videoContext.videoStream)
  //     setPeerListeners(videoContext.videoStream)
  //   }
  //   // }
  // }, [connectionRequiredPeers?.latestPeer])

  // const getAudioVideoStream = (): Promise<MediaStream> => {
  //   return new Promise((resolve, reject) => {
  //     navigator.mediaDevices
  //       .getUserMedia({
  //         video: { aspectRatio: { ideal: 16 / 9 } },
  //         audio: false,
  //       })
  //       .then((stream) => {
  //         return resolve(stream)
  //       })
  //       .catch((err) => {
  //         return reject()
  //       })
  //   })
  // }

  // const stopAudioStream = () => {
  //   console.log("stop video stream")
  //   videoContext.videoStream?.getAudioTracks()[0].stop()
  // }

  // const stopVideoStream = () => {
  //   videoContext.videoStream?.getVideoTracks()[0].stop()
  // }

  // const getDisplayMediaStream = (): Promise<MediaStream> => {
  //   return new Promise((resolve, reject) => {
  //     navigator.mediaDevices
  //       .getDisplayMedia({ video: true })
  //       .then((stream) => {
  //         resolve(stream)
  //         videoContext.setVideoStream(stream)
  //         // connectToNewUser(callDetail?.communicatorsDetail[0], stream)
  //         replaceStreamTrack(stream)
  //       })
  //       .catch((err) => reject())
  //   })
  // }

  // const getAvailableMediaDevices = async () => {
  //   const devices = await navigator.mediaDevices.enumerateDevices()
  //   const audioDevices: Array<{ deviceId: string; deviceName: string }> = []
  //   const videoDevices: Array<{ deviceId: string; deviceName: string }> = []

  //   devices.forEach((mediaDeviceInfo) => {
  //     const label = mediaDeviceInfo.label.split(" ")
  //     const deviceName = label[0] + " " + (label.length > 1 ? label[1] : "")
  //     if (mediaDeviceInfo.kind == "videoinput") videoDevices.push({ deviceId: mediaDeviceInfo.deviceId, deviceName })
  //     if (mediaDeviceInfo.kind == "audioinput") audioDevices.push({ deviceId: mediaDeviceInfo.deviceId, deviceName })
  //   })

  //   dispatch(addAvailableMediaDevices({ audioDevices, videoDevices }))
  // }

  // const setNavigatorStream = () => {
  //   getAudioVideoStream().then((stream) => {
  //     addVideoStream(callDetail?.myDetail.peerId, stream)
  //     setPeerListeners(stream)

  //     if (callDetail?.callChannelType == "single") {
  //       connectToNewUser(callDetail?.communicatorsDetail[0], stream)
  //     }
  //     if (callDetail?.callChannelType == "group") {
  //       callDetail.communicatorsDetail.map((userDetail) => {
  //         console.log("connect", userDetail)
  //         connectToNewUser({ peerId: userDetail.peerId }, stream)
  //       })
  //     }
  //     setPeerListeners(stream)
  //   })
  // }

  // const addVideoStream = (peerId: string, stream: MediaStream) => {
  //   const isMyVideoStream = callDetail?.myDetail.peerId == peerId
  //   if (isMyVideoStream) {
  //     videoContext.setVideoStream(stream)
  //   } else {
  //     const isAlreadyAvailableStream = videoContext.communicatorsVideoStream.some(
  //       (videoStream) => videoStream.id == peerId,
  //     )
  //     if (!isAlreadyAvailableStream) {
  //       console.log("is already available stream ", stream)
  //       videoContext.setCommunicatorsVideoStream([
  //         ...videoContext.communicatorsVideoStream,
  //         { id: peerId, videoSrc: stream },
  //       ])
  //     }
  //   }
  // }

  // const setPeerListeners = (stream) => {
  //   peerContext.peer.on("connection", () => {
  //     console.log("peer connection event ")
  //   })
  //   peerContext.peer.on("call", (call) => {
  //     console.log("call event call ", call, videoContext.videoStream)
  //     setPeerConnection(call)
  //     call.answer(stream)
  //     call.on("stream", (userVideoStream) => {
  //       console.log("stream", userVideoStream)
  //       addVideoStream(call.peer, userVideoStream)
  //     })

  //     call.on("error", () => {
  //       console.log("peer event error ")
  //     })
  //   })
  // }

  // const connectToNewUser = (userData, stream) => {
  //   const { peerId } = userData
  //   const call = peerContext?.peer.call(peerId, stream, { metadata: { id: callDetail?.myDetail.peerId } })
  //   setPeerConnection(call)
  //   call?.on("stream", (userVideoStream) => {
  //     console.log("user video stream", userVideoStream, call.peer)
  //     addVideoStream(call.peer, userVideoStream)
  //   })

  //   call?.on("close", () => {
  //     console.log("call close event")
  //   })

  //   call?.on("error", () => {
  //     console.log("call event error")
  //   })
  // }

  // const replaceStreamTrack = (mediaStream: MediaStream) => {
  //   const [videoTrack] = videoContext.videoStream?.getVideoTracks()
  //   peerConnection?.peerConnection.getSenders().forEach((sender) => {
  //     console.log("sender ", sender)

  //     if (sender.track.kind == "video" && videoContext?.videoStream?.getVideoTracks()?.length > 0) {
  //       console.log("replace track")
  //       const [track] = mediaStream.getVideoTracks()
  //       sender.replaceTrack(track)
  //       // sender.replaceTrack(track,)
  //     }
  //   })
  // }

  // const addStreamTrack = (mediaStream: MediaStream) => {}

  const { socket, isAvailableSocket } = useSelector((state: { socketClient: socketReducerState }) => state.socketClient)
  const { isAvailableCallRoom, callDetail, callSetting, connectionRequiredPeers } = useSelector(
    (state: { callRedcuer: callReducerSlate }) => state.callRedcuer,
  )

  const { userDetail, isLogedIn } = useSelector((state: { userDetail: userDetailState }) => state.userDetail)

  const videoContext = useContext(PeerVideoRefContext)
  const peerContext = useContext(PeerContext)

  const [peer, setPeer] = useState<Array<{ peerid: string; peerConnection: RTCPeerConnection }>>([])

  useEffect(() => {
    console.log("socket", isAvailableSocket)
    if (!isAvailableSocket || !isLogedIn) return
    socket.on("call:peer:getOfferPeer", ({ receiverId, peerSdp, senderId }) => {
      console.log("offer peer event", peerSdp)

      createPeer(senderId)

      //   const peerConnection =  getPeerConnectionById(senderId)
      //  setRemoteDescription(peerConnection,{type:"offer",sdp:peerSdp})
    })
  }, [isAvailableSocket, isLogedIn])

  useEffect(() => {
    console.log("effect")
    if (!isAvailableCallRoom) return
    console.log("call Intiator", callDetail?.callInitiator, userDetail?._id)
    const isCallInitiator = callDetail?.callInitiator?.userId == userDetail?._id
    if (isCallInitiator && connectionRequiredPeers?.latestPeer != undefined) {
      createPeer(connectionRequiredPeers.latestPeer.userId)
    }
  }, [isAvailableCallRoom, connectionRequiredPeers?.latestPeer])

  useEffect(() => {
    if (!isAvailableCallRoom) return
    if (isAvailableCallRoom) {
      getWebCamStream().then((stream) => {
        addMyVideoStreamToContext(stream)
      })
    }
  }, [isAvailableCallRoom])

  const getWebCamStream = (): Promise<MediaStream> => {
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

  const addUserMediaTracks = (connection: RTCPeerConnection, tracks: MediaStreamTrack[]) => {
    tracks.forEach((track) => {
      connection.addTrack(track)
    })
  }

  const setNavigatorStream = async () => {
    try {
      const mediaStream = await getWebCamStream()
      if (peer.length > 0) {
        addUserMediaTracks(peer[0], mediaStream.getTracks())
      } else {
        console.log("not have peer connection")
      }
    } catch (error) {
      console.log("navigator stream error", error)
    }
  }

  const addMyVideoStreamToContext = (stream: MediaStream) => {
    if (videoContext.videoStream == undefined) videoContext.setVideoStream(stream)
    else console.log("alread added video stream")
  }

  // peer

  const createPeerConnection = (configuration?: RTCConfiguration): RTCPeerConnection => {
    const peerConnection = new RTCPeerConnection(configuration)
    return peerConnection
  }

  const getPeerConnectionById = (id: string): RTCPeerConnection => {
    const peerObj = peer.filter((peer) => peer.peerid == id)[0]
    return peerObj.peerConnection
  }

  const createPeer = async (id: string): Promise<RTCPeerConnection> => {
    console.log("create peer")
    const peerConnection = createPeerConnection()

    setPeer([...peer, { peerConnection, peerid: id }])

    // peerConnection.onicecandidate = (event) => {
    //   handleIceCandidate(event)
    // }
    // peerConnection.ontrack = handleTrack
    // peerConnection.ondatachannel = handleDataChannel
    return RTCPeerConnection
  }

  const handleIceCandidate = (event: RTCPeerConnectionIceEvent) => {
    console.log("handler ice candidate event ", event)
  }

  const handleTrack = (event: RTCTrackEvent) => {
    console.log("on tarck event ", event, event.streams)
  }

  const handleDataChannel = (event: RTCDataChannelEvent) => {
    console.log("handler data channel event", event)
  }

  // data channel
  const createDataChannel = (connection: RTCPeerConnection, label: string) => {
    const dataChannel = connection.createDataChannel(label)
    console.log("data Channel", dataChannel)

    dataChannel.onmessage = (event) => {
      console.log("data Channel on message event")
    }
  }

  // sdp  offer
  const createAndSetOffer = async (connection: RTCPeerConnection): Promise<RTCSessionDescriptionInit> => {
    const offer = await connection.createOffer()
    connection.setLocalDescription(offer)
    return offer
  }

  const createAndSetAnswer = async (connection: RTCPeerConnection): Promise<RTCSessionDescriptionInit> => {
    const answer = await connection.createAnswer()
    connection.setLocalDescription(answer)
    return answer
  }

  const setRemoteDescription = async (connection: RTCPeerConnection, remoteDescription: RTCSessionDescriptionInit) => {
    await connection.setRemoteDescription(remoteDescription)
  }

  const sendRtcSessionOffer = (receiverId: string, sessionDescription: RTCSessionDescriptionInit) => {
    console.log("send rtc session")
    const peerSdp = sessionDescription.sdp
    socket.emit("call:peer:offerPeer", { receiverId, peerSdp, senderId: userDetail?._id })
  }

  // ice candiate
  const setIceCandidate = (connection: RTCPeerConnection, candidate: RTCSessionDescriptionInit[]) => {
    candidate.forEach(async (candidate) => {
      await connection.addIceCandidate(candidate)
    })
  }

  return <></>
}

export default PeerJsStreamMethodProvider
