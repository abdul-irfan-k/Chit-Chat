import { Server, Socket } from "socket.io"
import { getRedisSocketCached } from "../../model/redis/redis"

const callPeerHandlerSocketIo = (io: Server, socket: Socket) => {
  socket.on(
    "call:peer:offerPeer",
    async ({ receiverId, peerSdp, senderId }: { receiverId: string; peerSdp: string; senderId: string }) => {
      try {
        console.log("offer peer", senderId, receiverId)
        const reciverSocket = await getRedisSocketCached(receiverId)
        socket.to(reciverSocket.socketId).emit("call:peer:getOfferPeer", { peerSdp, senderId })
      } catch (error) {
        console.log(error)
      }
    },
  )

  socket.on(
    "call:peer:offerAnswerPeer",
    async ({ receiverId, senderId, peerSdp }: { receiverId: string; senderId: string; peerSdp: string }) => {
      try {
        console.log("answer offer peer", senderId, receiverId)
        const reciverSocket = await getRedisSocketCached(receiverId)
        socket.to(reciverSocket.socketId).emit("call:peer:getOfferAnswerPeer", { peerSdp, senderId, receiverId })
      } catch (error) {
        console.log(error)
      }
    },
  )

  socket.on("call:peer:sendIceCandidate", async ({ receiverId, senderId, iceCandidate }) => {
    try {
      console.log("ice candidate", senderId, receiverId)
      const receiverSocket = await getRedisSocketCached(receiverId)
      socket.to(receiverSocket.socketId).emit("call:peer:getIceCandidate", { receiverId, senderId, iceCandidate })
    } catch (error) {
      console.log(error)
    }
  })
}

export default callPeerHandlerSocketIo
