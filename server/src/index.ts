import express, { Application } from "express"
import http from "http"
import * as socketIo from "socket.io"
import userMessageSocketIo from "./socket-io/user-message.js"
import dotEnv from "dotenv"
import userStreamSocketIo from "./socket-io/user-stream.js"
import userRouter from "./route/user-route.js"
import { connnectDB } from "./config/mongoose.js"

dotEnv.config()
const app: Application = express()
const server = http.createServer(app)
const port = process.env.PORT || 8000
const frontendUrl = process.env.FRONTEND_URL || "http://localhost:3000"

const io = new socketIo.Server(server, {
  cors: {
    origin: [frontendUrl],
  },
})

io.on("connection", (socket) => {
  const ip = socket.request.connection.remoteAddress

  userMessageSocketIo(io, socket)
  userStreamSocketIo(io, socket)
})

app.use("/user", userRouter)

connnectDB(() => {
  server.listen(port, () => {
    console.log(`server listing on http://localhost:${port}`)
  })
})
