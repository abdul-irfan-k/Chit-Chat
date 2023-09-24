import { createSlice } from "@reduxjs/toolkit"

export const socketReducer = createSlice({
  name: "socketReducer",
  initialState: { socket: {} },
  reducers: {
    initialiseSocket: (state, action) => {
      state.socket = action.payload
    },
    updateSocket: (state, action) => {
      state.socket = action.payload
    },
  },
})


export const usersReducer = createSlice({
  name:"usersReducer",
  initialState:[],
  reducers:{
    initialiseUsers:(state,action) => {
      state= action.payload
    }
  }
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

export const { initialiseSocket, updateSocket } = socketReducer.actions
