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

import userMessageSocketIo from "./socket-io/user-message.js"
import userStreamSocketIo from "./socket-io/user-stream.js"
import { userSocketIntialization } from "./socket-io/user-initialise.js"
import { userStatusSocketIo } from "./socket-io/user-status-socket-io.js"

import userRouter from "./route/user-route.js"
import chatRouter from "./route/chat-route.js"
import meetingRouter from "./route/meeting-route.js"

import { connnectDB } from "./config/mongoose.js"
import { connectRedis } from "./config/redis.js"
import videoCallIntialiseSocketIo from "./socket-io/video-call-socket-intialise.js"

const app: Application = express()
const server = http.createServer(app)
const port = process.env.PORT || 8000
const frontendUrl = process.env.FRONTEND_URL || "http://localhost:3000"

const __filename = url.fileURLToPath(import.meta.url)
export const __dirname = path.dirname(__filename)

const corsOptions = {
  origin: frontendUrl,
  credentials: true,
  // optionSuccessStatus: 200,
}

app.use(cookieParser())
app.use(cors(corsOptions))
app.use(bodyParser())
app.use(express.static(path.join(__dirname, "..", "public")))

const io = new socketIo.Server(server, {
  cors: {
    origin: [frontendUrl],
  },
})

io.on("connection", async (socket) => {
  // creating socket model
  userSocketIntialization(socket)

  // video call
  videoCallIntialiseSocketIo(io, socket)

  userStatusSocketIo(io, socket)

  //message
  userMessageSocketIo(io, socket)
  userStreamSocketIo(io, socket)
})

app.use("/user", userRouter)
app.use("/chat", chatRouter)
app.use("/meeting",meetingRouter)

connnectDB(() => {
  server.listen(port, () => {
    console.log(`server listing on http://localhost:${port}`)
  })
  connectRedis()
})
