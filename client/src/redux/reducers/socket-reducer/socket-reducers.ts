import { createSlice } from "@reduxjs/toolkit"
import { Socket } from "socket.io-client"

interface socketReducer {
  socket: Socket | undefined,
  isAvailableSocket:Boolean
}
export type socketReducerState = socketReducer 
const socketReducerInitialState: socketReducerState = {
  socket:null,
  isAvailableSocket:false
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
      state.socket = action.payload
    },
  },
})

export const usersReducer = createSlice({
  name: "usersReducer",
  initialState: [],
  reducers: {
    initialiseUsers: (state, action) => {
      state = action.payload
    },
  },
})

export const currentUsersReducer = createSlice({
  name: "currentUserReducer",
  initialState: [],
  reducers: {
    initialiseCurrentUsers: (state, action) => {
      state = action.payload
    },
    updateCurrentUser: (state, action) => {},
    // removeCurrentUser: (state, action) => {
    //   state = state.filter(
    //     (currentUser:{}) => currentUser?._id != action.payload._id,
    //   )
    // },
    removeAllCurrentUsers: (state) => {
      state = []
    },
  },
})

export const { initialiseSocket, updateSocket } = socketClientReducer.actions
