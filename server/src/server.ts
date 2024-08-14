import express, { Application } from "express"
import http from "http"
import dotEnv from "dotenv"
import bodyParser from "body-parser"
import cookieParser from "cookie-parser"
import cors from "cors"
import path from "path"
import url from "url"
import * as socketIo from "socket.io"
dotEnv.config()

import userRouter from "./route/user-route"
import chatRouter from "./route/chat-route"
import meetingRouter from "./route/meeting-route"
import uploadRouter from "./route/upload-route"

import { connnectDB } from "./config/mongoose"
import { connectRedis } from "./config/redis"

import userMessageSocketIo from "./socket-io/message/user-message-socket-io"
import groupMessageSocketIo from "./socket-io/message/group-message-socket-io"
import { userSocketIntialization } from "./socket-io/user/user-initialise"
import { userStatusSocketIo } from "./socket-io/user/user-status-socket-io"
import callSocketIo from "./socket-io/meeting/video-call-socket-intialise"
import GroupCallSocketIo from "./socket-io/meeting/group-call-socket-io"
import callPeerHandlerSocketIo from "./socket-io/meeting/call-peer-handler-socket-io"
import groupControllSocketIo from "./socket-io/group/group-control-socket-io"

import { ClientToServerEvents, ServerToClientEvents } from "chit-chat-events"

const app: Application = express()
const server = http.createServer(app)
const port = process.env.PORT || 8000
const frontendUrl = process.env.FRONTEND_URL || "http://localhost:3000"

export const dirpath = path.dirname(__filename)

const corsOptions = {
  origin: frontendUrl,
  credentials: true,
  // optionSuccessStatus: 200,
}

app.use(cookieParser())
app.use(cors(corsOptions))
app.use(bodyParser())
app.use(express.static(path.join(__dirname, "..", "public")))

const io = new socketIo.Server<ClientToServerEvents, ServerToClientEvents>(server, {
  cors: {
    origin: [frontendUrl],
  },
})

io.on("connection", async (socket) => {
  // creating socket model
  userSocketIntialization(socket)

  // video call
  callPeerHandlerSocketIo(io, socket)
  callSocketIo(socket)
  GroupCallSocketIo(io, socket)

  userStatusSocketIo(io, socket)

  //message
  userMessageSocketIo(io, socket)
  groupMessageSocketIo(socket)

  // group controll
  groupControllSocketIo(socket)
})

app.use("/user", userRouter)
app.use("/chat", chatRouter)
app.use("/meeting", meetingRouter)
app.use("/upload", uploadRouter)

connnectDB(() => {
  server.listen(port, () => {
    console.log(`server listing on http://localhost:${port}`)
  })
  connectRedis()
})
