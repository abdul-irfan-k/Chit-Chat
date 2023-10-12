import { SocketClient } from "@/socket-io-client/socket"
import { createAsyncThunk } from "@reduxjs/toolkit"

export const socketConnectHandler = createAsyncThunk("socket/connect", async (socketClient: SocketClient) => {
  try {
    console.log('called connect')
    const { socket } = await socketClient.connect()
    console.log('connected sockets ',socket)
    return { socket }
  } catch (error) {
    console.log("error", error)
  }
})
