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
  isCurentChaterChanged: boolean
  currentChaterDetail: null | chatUserDetail
}

export type chatUsersListReducerState = chatUsersListReducer
const chatUserListInitialState: chatUsersListReducerState = {
  usersDeatail: [],
  isChanged: false,
  isCurentChaterChanged: false,
  currentChaterDetail: null,
}

export const chatUsersListReducer = createSlice({
  name: "chatUserListReducer",
  initialState: chatUserListInitialState,
  reducers: {
    addIntialAllUserList: (state, action) => {
      return { isChanged: true, usersDeatail: [...action.payload] }
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
        if (userDetail._id == action.payload._id) return { ...userDetail, status: action.payload.status }
        else return { ...userDetail }
      })

      state.usersDeatail = updatedUserDetail
    },
    addUserNotification: (state, action) => {
      const updatedUserDetail = state.usersDeatail.map((userDetail) => {
        if (userDetail._id == action.payload._id)
          return {
            ...userDetail,
            notification: {
              ...action.payload.notification,
              totalNotificationCount:
                userDetail.notification?.totalNotificationCount != undefined
                  ? userDetail.notification.totalNotificationCount + 1
                  : 1,
            },
          }
        else return { ...userDetail }
      })

      state.usersDeatail = updatedUserDetail
    },
    removeUserNotification: (state, action) => {
      const updatedUserDetail = state.usersDeatail.map((userDetail) => {
        if (userDetail._id == action.payload._id) return { ...userDetail, notification: undefined }
        else return { ...userDetail }
      })

      state.usersDeatail = updatedUserDetail
    },
    updateCurrentUser: (state, action) => {
      state.currentChaterDetail = action.payload.userDetail
      state.isCurentChaterChanged = true
    },
  },
})

export const chatUserListAction = chatUsersListReducer.actions
