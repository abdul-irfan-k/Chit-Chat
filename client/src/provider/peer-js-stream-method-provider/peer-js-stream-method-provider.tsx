"use client"
import React, { useContext, useEffect, useRef, useState } from "react"
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
  const { socket, isAvailableSocket } = useSelector((state: { socketClient: socketReducerState }) => state.socketClient)
  const { isAvailableCallRoom, callDetail, callSetting, connectionRequiredPeers } = useSelector(
    (state: { callRedcuer: callReducerSlate }) => state.callRedcuer,
  )

  const { userDetail, isLogedIn } = useSelector((state: { userDetail: userDetailState }) => state.userDetail)

  const videoContext = useContext(PeerVideoRefContext)
  const peerContext = useContext(PeerContext)

  const peerRef = useRef<Array<{ peerid: string; peerConnection: RTCPeerConnection }>>([])

  const [isReadyForCall, setIsReadyForCall] = useState<boolean>(false)
  const [isRealoadVideoRef, setIsReloadVideoRef] = useState<boolean>(false)
  const [remoteSessionDescription, setRemoteSessionDescripition] =
    useState<Array<{ sessionDescription: RTCSessionDescriptionInit; userId: string }>>()
  const [remoteIceCandidate, setRemoteIceCandidate] = useState<
    Array<{ userId: string; iceCandidate: RTCIceCandidateInit }>
  >([])
  const [localRemoteVideoStreams, setLocalRemoteVideoStreams] = useState<Array<{ id: string; videoSrc: MediaStream }>>(
    [],
  )

  useEffect(() => {
    if (remoteIceCandidate?.length < 1 || !isReadyForCall) return
    if (isReadyForCall) {
      const peerConnection = getPeerConnectionById(remoteIceCandidate[0].userId)
      setIceCandidate(peerConnection, remoteIceCandidate[0])
      console.log("user video ", videoContext.communicatorsVideoStream)
    }
    setIsReloadVideoRef(true)
  }, [remoteIceCandidate, isReadyForCall])
 
  useEffect(() => {
    if (!isRealoadVideoRef) return
    console.log("remote video steram",localRemoteVideoStreams)
    videoContext.setCommunicatorsVideoStream(localRemoteVideoStreams)
  }, [isRealoadVideoRef])

  useEffect(() => {
    if (!isReadyForCall) return console.log("not ready for call ")
    const remoteSessionOnChangeHandler = async () => {
      remoteSessionDescription?.forEach(async (remoteSession) => {
        try {
          console.log("get web cam stream", peerRef.current, remoteSession)
          // const stream = isReadyForCall == false ? await getWebCamStream() : new MediaStream()
          // console.log("stream is ", stream)

          // if (videoContext.videoStream == undefined) videoContext.setVideoStream(stream)
          const peerObj = await getPeerConnectionById(remoteSession.userId)
          const peerConnection = peerObj

          setRemoteDescription(peerConnection, remoteSession.sessionDescription)

          if (remoteSession.sessionDescription.type == "offer") {
            const locaSessionDescription = await createAndSetAnswer(peerConnection)
            sendRtcSessionCallOfferValue(remoteSession.userId, userDetail?._id, locaSessionDescription)
          }
        } catch (error) {
          console.log("error", error)
        }
      })
    }
    remoteSessionOnChangeHandler()
  }, [remoteSessionDescription, isReadyForCall])

  useEffect(() => {
    if (isReadyForCall) return
    if (connectionRequiredPeers == undefined) return
    const isCallInitiator = callDetail?.callInitiator?.userId == userDetail?._id
    if (isCallInitiator) return
    console.log("get web cam stream ")
    getWebCamStream().then((stream) => {
      videoContext.setVideoStream(stream)
      createPeer(connectionRequiredPeers?.allPeers[0].userId, stream)
      setIsReadyForCall(true)
    })
  }, [connectionRequiredPeers?.allPeers])

  useEffect(() => {
    if (callSetting?.isAllowedCamara == undefined) return
    if (!callSetting?.isAllowedCamara) {
      const videoStream = videoContext.videoStream
      stopStreamTrack(videoStream)
    }

    getWebCamStream().then((stream) => {
      console.log("2")
      const oldStream = videoContext.videoStream
      videoContext.setVideoStream(stream)
      stopStreamTrack(oldStream)
      peerRef.current.forEach((peer) => {
        replaceStreamTrack(peer.peerConnection, stream)
      })
    })
  }, [callSetting?.isAllowedCamara])

  useEffect(() => {
    if (!isAvailableCallRoom) return
    getWebCamStream().then((stream) => {
      videoContext.setVideoStream(stream)
    })
  }, [isAvailableCallRoom])

  useEffect(() => {
    if (callSetting?.isAllowedScreenShare == undefined) return
    if (!callSetting?.isAllowedScreenShare) {
      const videoStream = videoContext.videoStream
      stopStreamTrack(videoStream)
    }

    getDisplayMediaStream().then((stream) => {
      const oldStream = videoContext.videoStream
      videoContext.setVideoStream(stream)
      stopStreamTrack(oldStream)
      peerRef.current.forEach((peer) => {
        replaceStreamTrack(peer.peerConnection, stream)
      })
    })
  }, [callSetting?.isAllowedScreenShare])

  useEffect(() => {
    console.log("socket", isAvailableSocket)
    if (!isAvailableSocket || !isLogedIn) return
    socket.on("call:peer:getOfferPeer", async ({ receiverId, peerSdp, senderId }) => {
      console.log("get offer peer event ", receiverId, senderId, userDetail?._id)
      // const stream = await getDisplayMediaStream()
      // addMyVideoStreamToContext(stream)
      // await createPeer(senderId, stream)
      // const peerConnection = await getPeerConnectionById(senderId)
      // setRemoteDescription(peerConnection, { type: "offer", sdp: peerSdp })
      // const sessionDescription = await createAndSetAnswer(peerConnection)

      // sendRtcSessionCallOfferValue(senderId, userDetail?._id, sessionDescription)
      //   const peerConnection =  getPeerConnectionById(senderId)
      //  setRemoteDescription(peerConnection,{type:"offer",sdp:peerSdp})

      setRemoteSessionDescripition([{ sessionDescription: { type: "offer", sdp: peerSdp }, userId: senderId }])
    })

    socket.on("call:peer:getOfferAnswerPeer", async ({ receiverId, senderId, peerSdp }) => {
      console.log("get answer offer peer event ", receiverId, senderId)
      // const peerConnection = await getPeerConnectionById(senderId)
      // setRemoteDescription(peerConnection, { type: "answer", sdp: peerSdp })
      setRemoteSessionDescripition([{ sessionDescription: { type: "answer", sdp: peerSdp }, userId: senderId }])
    })

    socket.on("call:peer:getIceCandidate", async ({ receiverId, senderId, iceCandidate }) => {
      console.log("get ice candidate event", receiverId, senderId, iceCandidate)
      console.log("all peer connection", peerRef)
      // const peerConnection = await getPeerConnectionById(senderId)
      // setIceCandidate(peerRef.current[0].peerConnection, iceCandidate)
      setRemoteIceCandidate([{ iceCandidate: iceCandidate, userId: senderId }])
    })
  }, [isAvailableSocket, isLogedIn])

  useEffect(() => {
    if (isAvailableCallRoom) {
      const isCallInitiator = callDetail?.callInitiator?.userId == userDetail?._id
      if (isCallInitiator && connectionRequiredPeers?.latestPeer != undefined) {
        console.log("creating peer user id", connectionRequiredPeers.latestPeer.userId)

        getWebCamStream().then(async (stream) => {
          console.log("3")
          addMyVideoStreamToContext(stream)
          createPeer(connectionRequiredPeers.latestPeer.userId, stream)

          setIsReadyForCall(true)
          const peerConnection = getPeerConnectionById(connectionRequiredPeers.latestPeer.userId)
          console.log("== peer connectin", peerConnection)
          createAndSetOffer(peerConnection).then((sessionDescription) => {
            sendRtcSessionOffer(connectionRequiredPeers?.latestPeer.userId, sessionDescription)
          })
        })
      }
    }
  }, [isAvailableCallRoom, connectionRequiredPeers?.latestPeer])

  const getWebCamStream = (): Promise<MediaStream> => {
    console.log("called web cam stream functin ")
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
          console.log("get web cam stream error ", err)
          return reject()
        })
    })
  }

  const getDisplayMediaStream = (): Promise<MediaStream> => {
    return new Promise((resolve, reject) => {
      navigator.mediaDevices
        .getDisplayMedia({ video: true })
        .then((stream) => {
          resolve(stream)
        })
        .catch((err) => reject())
    })
  }

  const addUserMediaTracks = (connection: RTCPeerConnection, tracks: MediaStreamTrack[]) => {
    tracks.forEach((track) => {
      connection.addTrack(track)
    })
  }

  const stopStreamTrack = (videoStream: MediaStream) => {
    console.log("web cam steram", videoContext.videoStream)

    const videoTracks = videoStream.getVideoTracks()
    videoTracks?.forEach((videoTrack) => videoTrack.stop())

    const audioTracks = videoStream.getAudioTracks()
    audioTracks?.forEach((audioTrack) => audioTrack.stop())
  }

  const setNavigatorStream = async () => {
    try {
      const mediaStream = await getWebCamStream()
      if (peer.length > 0) {
        addUserMediaTracks(peer[0], mediaStream)
      } else {
        console.log("not have peer connection")
      }
    } catch (error) {
      console.log("navigator stream error", error)
    }
  }

  const addMyVideoStreamToContext = (stream: MediaStream) => {
    videoContext.setVideoStream(stream)
  }

  const replaceStreamTrack = (connection: RTCPeerConnection, mediaStream: MediaStream) => {
    connection.getSenders().forEach((sender) => {
      console.log("sender ", sender)

      if (sender.track.kind == "video" && videoContext?.videoStream?.getVideoTracks()?.length > 0) {
        const [track] = mediaStream.getVideoTracks()
        sender.replaceTrack(track)
        // sender.replaceTrack(track,)
      }
    })
  }

  // peer

  const createPeerConnection = (configuration?: RTCConfiguration): RTCPeerConnection => {
    const peerConnection = new RTCPeerConnection(configuration)
    return peerConnection
  }

  const getPeerConnectionById = (id: string): RTCPeerConnection | undefined => {
    if (peerRef.current.length < 1) return undefined
    const peerObj = peerRef.current.filter((peer) => peer.peerid == id)[0]
    return peerObj.peerConnection
  }

  const createPeer = async (id: string, video?: MediaStream): RTCPeerConnection => {
    console.log("create peer", id, video)
    const peerConnection = createPeerConnection()
    // {
    //   iceServers: [{ urls: ["stun:stun1.l.google.com:19302", "stun:stun2.l.google.com:19302"] }],
    //   iceCandidatePoolSize: 10,
    // }
    peerRef.current = [...peerRef.current, { peerConnection, peerid: id }]

    peerConnection.onicecandidate = (event) => {
      handleIceCandidate(event, peerConnection, id)
    }

    console.log("media stream", videoContext.videoStream, video)
    const mediaStream = videoContext.videoStream != undefined ? videoContext.videoStream : video
    addUserMediaTrack(peerConnection, mediaStream)

    peerConnection.ontrack = (event) => {
      handleTrack(event, id)
    }

    peerConnection.ondatachannel = handleDataChannel
    peerConnection.oniceconnectionstatechange = () => {
      console.log("on ice connection state chagne event ")
    }

    peerConnection.onicegatheringstatechange = (val) => {
      console.log("one ice gathering change event ", val, videoContext.communicatorsVideoStream)
      
    }
    peerConnection.onicecandidateerror = () => console.log("ice candidate error   event ")
    return peerConnection
  }

  const iceRef = useRef()
  const handleIceCandidate = (event: RTCPeerConnectionIceEvent, connection: RTCPeerConnection, id: string) => {
    // console.log("handler ice candidate event ", event.candidate)
    const offer = connection.localDescription
    console.log("handler ice candidate event ", event.candidate)
    if (iceRef.current == undefined) iceRef.current = event.candidate

    if (!event.candidate) {
      console.log("event candidate ", event.candidate, iceRef.current)

      sendIceCandidateHandler(id, userDetail?._id, iceRef.current)
    }
  }

  const handleTrack = (event: RTCTrackEvent, id: string) => {
    console.log("on tarck event ", event, event.streams[0], event.streams[0].getTracks())
    const newStream = new MediaStream()
    newStream.addTrack(event.streams[0].getTracks()[0])

    setLocalRemoteVideoStreams([{ id: "asdf", videoSrc: newStream }])
    // videoContext.setCommunicatorsVideoStream([{ id: "asdf", videoSrc: event.streams[0] }])
    // videoContext.setVideoStream(event.streams[0])
  }

  const handleDataChannel = (event: RTCDataChannelEvent) => {
    console.log("handler data channel event", event)
  }

  const addUserMediaTrack = (connection: RTCPeerConnection, mediaStream: MediaStream): RTCRtpSender => {
    return mediaStream.getTracks().map((track) => {
      return connection.addTrack(track, mediaStream)
    })
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

  const sendRtcSessionCallOfferValue = async (
    receiverId: string,
    senderId: string,
    sessionDescription: RTCSessionDescriptionInit,
  ) => {
    console.log("call session description", sessionDescription)

    socket.emit("call:peer:offerAnswerPeer", { receiverId, senderId, peerSdp: sessionDescription.sdp })
  }

  // ice candiate
  const setIceCandidate = (connection: RTCPeerConnection, candidate: RTCIceCandidateInit) => {
    console.log("set ice candidate")
    // candidate.forEach(async (candidate) => {
    connection.addIceCandidate(candidate)
    // })
  }

  const sendIceCandidateHandler = (receiverId: string, senderId: string, iceCandidate: RTCIceCandidate) => {
    console.log("emit event ", receiverId, senderId, iceCandidate)
    socket.emit("call:peer:sendIceCandidate", { receiverId, senderId, iceCandidate })
  }

  return <></>
}

export default PeerJsStreamMethodProvider
