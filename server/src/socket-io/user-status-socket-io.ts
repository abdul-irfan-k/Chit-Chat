import { Server, Socket } from "socket.io"
import SocketModel from "../model/mongoose/socket-model.js"

export const userStatusSocketIo = (io: Server, socket: Socket) => {
  socket.on("status:getOnlineUsers", async (callback: (data: any) => any) => {
    const onlineUsers = await SocketModel.getOnlineUsers()
    callback(onlineUsers)
  })
}
