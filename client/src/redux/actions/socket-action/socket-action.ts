import { SocketClient } from "@/socket-io-client/socket"
import { createAsyncThunk } from "@reduxjs/toolkit"

export const socketConnectHandler = createAsyncThunk("socket/connect", async (socketClient: SocketClient) => {
  try {
    const { socket } = await socketClient.connect()
    return {}
  } catch (error) {
    console.log("error", error)
  }
})
