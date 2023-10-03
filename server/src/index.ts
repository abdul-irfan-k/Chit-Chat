import express, { Application } from "express"
import http from "http"
import dotEnv from "dotenv"
import bodyParser from "body-parser"
import cookieParser from "cookie-parser"
import cors from "cors"
import * as socketIo from "socket.io"

import userMessageSocketIo from "./socket-io/user-message.js"
import userStreamSocketIo from "./socket-io/user-stream.js"
import { userSocketIntialization } from "./socket-io/user-initialise.js"

import userRouter from "./route/user-route.js"
import chatRouter from "./route/chat-route.js"

import { connnectDB } from "./config/mongoose.js"
import { connectRedis } from "./config/redis.js"

dotEnv.config()
const app: Application = express()
const server = http.createServer(app)
const port = process.env.PORT || 8000
const frontendUrl = process.env.FRONTEND_URL || "http://localhost:3000"

const corsOptions = {
  origin: frontendUrl,
  credentials: true,
  // optionSuccessStatus: 200,
}

app.use(cookieParser())
app.use(cors(corsOptions))
app.use(bodyParser())

const io = new socketIo.Server(server, {
  cors: {
    origin: [frontendUrl],
  },
  
})

io.on("connection", async (socket) => {
  // creating socket model
  userSocketIntialization(socket)

  userMessageSocketIo(io, socket)
  userStreamSocketIo(io, socket)
})

app.use("/user", userRouter)
app.use("/chat", chatRouter)

connnectDB(() => {
  server.listen(port, () => {
    console.log(`server listing on http://localhost:${port}`)
  })
  connectRedis()
})
