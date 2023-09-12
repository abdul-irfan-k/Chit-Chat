import express, { Application } from "express"
import http from "http"
import * as socketIo from "socket.io"
import userMessageSocketIo from "./socket-io/user-message.js"
import dotEnv from "dotenv"

dotEnv.config()
const app: Application = express()
const server = http.createServer(app)
const port = process.env.PORT || 8000
// const frontendUrl = process.env.FRONTEND_URL

const io = new socketIo.Server(server, {
  cors: {
    origin: ["http://localhost:3000"],
  },
})

io.on("connection", (socket) => {
  userMessageSocketIo(io, socket)
})

server.listen(port, () => {
  console.log(`server listing on http://localhost:${port}`)
})
