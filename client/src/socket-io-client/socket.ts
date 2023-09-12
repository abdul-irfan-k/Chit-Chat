import { io } from "socket.io-client"

const serverPort = process.env.SERVER_PORT || 8000
// const serverUrl = process.env.NODE_ENV === 'production'? process.env.SERVER_URL : `http://localhost:${serverPort}`
const serverUrl = `http://localhost:${serverPort}`

// export const Socket = io(serverUrl)
export const Socket = io(serverUrl)

Socket.emit("userMessage/newMessage", "hello")
Socket.on("userMessage/newMessage", (msg) => {})
