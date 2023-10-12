import { createSlice } from "@reduxjs/toolkit"

interface chatRoomNotification {
  notificationType: "newMessage"
  totalNotificationCount: number
  isAvailableNewNotification: boolean
}
interface chatRoom {
  chatRoomId: string
}

interface ChatRoomUserStatus {
  onlineStatus: "online" | "ofline"
  currentUserStatus?: "typing" | "recording"
}

interface chatUserDetail {
  _id: string
  name: string
  userId: string
  email: string
  profileImageUrl?: string
  chatRoom?: chatRoom
  isStoredChatRoomMessages?: boolean
  notification?: chatRoomNotification
  status?: ChatRoomUserStatus
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
    addintialOnlineUsers: (state, action) => {
      const updatedUserDetail = state.usersDeatail.map((userDetail) => {
        const onlineStatus = action.payload.onlineUsers.some((onlineUser) => onlineUser.userId == userDetail._id)
          ? "online"
          : "ofline"
        return { ...userDetail, status: { onlineStatus } }
      })
      state.usersDeatail = updatedUserDetail
    },
    changeUserOnlineStatus: (state, action) => {
      const updatedUserDetail = state.usersDeatail.map((userDetail) => {
        if(userDetail._id == action.payload._id) return {...userDetail,status:action.payload.status}
        else return {...userDetail}
      })

      console.log('change user status  user detail ',updatedUserDetail)
      state.usersDeatail = updatedUserDetail
    },
    addUserNotification: (state, action) => {
        const updatedUserDetail = state.usersDeatail.map((userDetail) => {
          if(userDetail._id == action.payload._id) return {...userDetail,notification:action.payload.notification}
          else return {...userDetail}
        })

        console.log('notfication user detail ',updatedUserDetail)
        state.usersDeatail = updatedUserDetail
    },
    removeUserNotification: (state, action) => {
      const updatedUserDetail = state.usersDeatail.map((userDetail) => {
        if(userDetail._id == action.payload._id) return {...userDetail,notification:undefined}
        else return {...userDetail}
      })

      console.log('notfication removed user detail ',updatedUserDetail)
      state.usersDeatail = updatedUserDetail
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
