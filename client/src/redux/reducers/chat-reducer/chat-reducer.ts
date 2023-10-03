import { createSlice } from "@reduxjs/toolkit"

interface chatRoom {
  chatRoomId: string
}
interface chatUserDetail {
  _id: string
  name: string
  userId: string
  email: string
  profileImageUrl?: string
  chatRoom?: chatRoom
}

interface chatUsersListReducer {
  usersDeatail: chatUserDetail[]
  isChanged: Boolean
}

export type chatUsersListReducerState = chatUsersListReducer
const chatUserListInitialState: chatUsersListReducerState = {
  usersDeatail: [],
  isChanged: false,
}

export const chatUsersListReducer = createSlice({
  name: "chatUserListReducer",
  initialState: chatUserListInitialState,
  reducers: {
    addIntialAllUserList: (state, action) => {
      console.log("intial")
      state.usersDeatail = [...action.payload]
      state.isChanged = true
    },
  },
})

export const chatUserListAction = chatUsersListReducer.actions

// current chat user detail
interface currentChaterReducer {
  userDetail: chatUserDetail | null
  isChanged: Boolean
}
export type currentChaterReducerSlate = currentChaterReducer
const currentChaterIntialState: currentChaterReducerSlate = {
  isChanged: false,
  userDetail: null,
}

export const currentChaterReducer = createSlice({
  name: "currentChaterReducer",
  initialState: currentChaterIntialState,
  reducers: {
    updateCurrentChater: (state, action) => {
      state.isChanged = true
      state.userDetail = action.payload.userDetail
    },
  },
})

export const currentChaterAction = currentChaterReducer.actions
