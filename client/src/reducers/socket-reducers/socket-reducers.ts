import { createSlice } from "@reduxjs/toolkit"

export const socketReducer = createSlice({
  name: "socketReducer",
  initialState: { socket: {} },
  reducers: {
    initialiseSocket: (state, action) => {
      state.socket = action.payload
    },
    updateSocket: (state, action) => {},
  },
})

export const { initialiseSocket, updateSocket } = socketReducer.actions
