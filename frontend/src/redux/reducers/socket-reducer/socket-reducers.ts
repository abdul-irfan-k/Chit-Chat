import { socketConnectHandler } from "@/redux/actions/socket-action/socket-action"
import { SocketClient } from "@/socket-io-client/socket"
import { createSlice } from "@reduxjs/toolkit"

const socket =  new SocketClient()
interface socketReducer {
  socket: SocketClient
  isAvailableSocket: Boolean,
  isConnectedSocket:boolean
}
export type socketReducerState = socketReducer
const socketReducerInitialState: socketReducerState = {
  socket: socket,
  isAvailableSocket: false,
  isConnectedSocket:false
}
export const socketClientReducer = createSlice({
  name: "socketClient",
  initialState: socketReducerInitialState,
  reducers: {
    initialiseSocket: (state, action) => {
      state.socket = action.payload
      state.isAvailableSocket = true
    },
    updateSocket: (state, action) => {
      return {...state,...action.payload}
    },
    connectSocket: (state, action) => {},
  },
  extraReducers: (builder) => {
    builder.addCase(socketConnectHandler.fulfilled,(state,action) => {
      // state.isAvailableSocket = true
      // state.isConnectedSocket = true
      // state.socket = action.payload?.socket
    })
  },
})

export const { initialiseSocket, updateSocket } = socketClientReducer.actions
export const socketReducerAction = socketClientReducer.actions
