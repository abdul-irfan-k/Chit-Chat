import { Socket, Server } from "socket.io"

const userMessageSocketIo = (io: Server, socket: Socket) => {
  socket.on("userMessage/newMessage", (message) => {
    console.log("message", message)
    socket.broadcast.emit("userMessage/newMessage", "message from the server ")
  })
}

export default userMessageSocketIo
