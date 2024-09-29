import config from "@/config/config"
import { ClientToServerEvents, ServerToClientEvents } from "chit-chat-events"
import { Socket, io } from "socket.io-client"

const serverPort = process.env.SERVER_PORT || 8000
const serverUrl = config.apiUrl

export class SocketClient {
  socket?: Socket<ServerToClientEvents, ClientToServerEvents>
  connect(): Promise<{ socket: Socket }> {
    return new Promise((resolve, reject) => {
      this.socket = io(serverUrl)
      consle.log("server url", serverUrl)

      this.socket?.on("connect", () => resolve({ socket: this.socket }))
      this.socket?.on("connect_error", () => reject())
    })
  }

  emit(event: string, data: any) {
    return new Promise((resolve, reject) => {
      this.socket?.emit(event, data)
      return resolve()
    })
  }

  on(event: string, callback: () => any) {
    return new Promise((resolve, reject) => {
      this.socket?.on(event, callback)
    })
  }
}
