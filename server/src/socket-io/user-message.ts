import { Socket, Server } from "socket.io"

const userMessageSocketIo = (io: Server, socket: Socket) => {
  socket.on("message/newUserMessage", (message) => {
    console.log("message", message)
    socket.broadcast.emit("userMessage/newMessage", "message from the server ")
  })

  socket.on("message/newGroupMessage", () => {})
}

export default userMessageSocketIo
