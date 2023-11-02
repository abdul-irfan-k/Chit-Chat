import { Server, Socket } from "socket.io"
import { getRedisSocketCached } from "../model/redis/redis.js"

const callPeerHandlerSocketIo = (io: Server, socket: Socket) => {
  socket.on(
    "call:peer:offerPeer",
    async ({ receiverId, peerSdp, senderId }: { receiverId: string; peerSdp: string; senderId: string }) => {
      try {
        console.log("offer peer ",receiverId)
        const reciverSocket = await getRedisSocketCached(receiverId)
        socket.to(reciverSocket.socketId).emit("call:peer:getOfferPeer", { peerSdp, senderId })
      } catch (error) {
        console.log(error)
      }
    },
  )
}

export default callPeerHandlerSocketIo
