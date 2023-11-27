import { Socket } from "socket.io"

const groupMessageSocketIo = (socket: Socket) => {
  socket.on("groupMessage:newTextMessage", ({ message, groupId, senderId, chatRoomId }) => {
    // socket.emit(`group:${}`)
  })
  socket.on("groupMessage:newAudioMessage", () => {})
}
export default groupMessageSocketIo
