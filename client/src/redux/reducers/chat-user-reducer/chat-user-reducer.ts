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
  isStoredChatRoomMessages?: boolean
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
      return { isChanged: true, usersDeatail: [...action.payload] }
    },
    updateUser: (state, action) => {
      // state.isChange = false
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
      return { isChanged: true, userDetail: action.payload.userDetail }
    },
  },
})

export const currentChaterAction = currentChaterReducer.actions
