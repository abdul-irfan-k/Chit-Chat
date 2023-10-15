import Peer from "peerjs"
import { Socket } from "socket.io-client"

class peerjsIntialise {
  intializePeerConnect(id: string): Peer {
    return new Peer(id, {
      secure: true,
    })
  }
}

interface communicatorsVideoRef{
  userId:string,
  videoRef?:React.MutableRefObject<HTMLVideoElement>
}
export class peerJsClient extends peerjsIntialise {
  myPeer: Peer
  myPeerId
  camaraDeviceId?: string

  myVideoRef?: React.MutableRefObject<HTMLVideoElement >
  communicatorsVideoRef:Array<communicatorsVideoRef> = []

  constructor({ myPeerId, myVideoRef }) {
    super()

    this.myVideoRef = myVideoRef
    this.myPeerId = myPeerId
    this.myPeer = this.intializePeerConnect(myPeerId)
    this.intializePeerEvents()
  }

  intializePeerEvents() {
    this.myPeer.on("open", (id) => {
      console.log("peer id ", id, this.myPeerId, this.myPeer)
      this.myPeerId = id

      this.getAudioVideoStream()
    })
  }

  getAudioVideoStream() {
    const deviceId = this.camaraDeviceId == undefined ? "" : this.camaraDeviceId
    navigator.mediaDevices
      .getUserMedia({
        video: { deviceId, aspectRatio: { ideal: 16 / 9 } },
        audio: false,
      })
      .then((stream) => {
        this.addStreamToVideoRef(this.myPeerId, stream)
      })
  }

  addStreamToVideoRef(userPeerId, stream) {
    console.log("stream ", stream)
    if (userPeerId == this.myPeerId) {
      console.log(this.myVideoRef?.current)
      if ( this.myVideoRef?.current != undefined) {
       console.log('user video ref ')
        this.myVideoRef.current.srcObject = stream
      }
    }
  }

  setPeerListeners(stream) {
    this.myPeer.on("call", (call) => {
      call.answer(stream)

      call.on("stream", (userVideoStream) => {
        console.log("peer call stream event ", userVideoStream)
      })

      call.on("close", () => {
        console.log("peer call close event")
      })
    })
  }

  
  newUserConnection = (stream) => {

  }

  connectToNewUser(userData)  {
    const {userId} = userData
    this.communicatorsVideoRef.push({userId:userId})
    const call = this.myPeer.call(userId,this.stream)
    call.on('stream',(receiverVideoStream) => {
      console.log('call stream event')
      this.addStreamToVideoRef(userId,receiverVideoStream)
    })
  }
}
