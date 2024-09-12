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
  chatRoomId: string
  isStoredChatRoomMessages?: boolean
  notification?: chatRoomNotification
  status?: ChatRoomUserStatus
}

interface currentChaterUserDetail extends chatUserDetail {
  currentChaterType: "user"
}
export interface groupSetting {
  adminOnlyMessaging: boolean
  allowJoinByUrl: boolean
  hideMemberPhoneNumber: boolean
  adminOnlyChangeSetting: boolean
}
interface chatGroupDetails {
  _id: string
  name: string
  groupImage: string
  chatRoomId: string
  isAdmin: boolean
  setting: groupSetting
  discription: string
}

interface currentChatingGroupDetail extends chatGroupDetails {
  currentChaterType: "group"
}

type currentChaterDetailType = null | currentChaterUserDetail | currentChatingGroupDetail
interface chatUsersListReducer {
  usersDeatail: chatUserDetail[]
  groupDetail: chatGroupDetails[]
  isChanged: Boolean
  currentChaterDetail: currentChaterDetailType
  isCurrentChatingWithGroup: boolean
}

export type chatUsersListReducerState = chatUsersListReducer
const chatUserListInitialState: chatUsersListReducerState = {
  usersDeatail: [],
  groupDetail: [],
  isChanged: false,
  currentChaterDetail: null,
  isCurrentChatingWithGroup: false,
}

export const chatUsersListReducer = createSlice({
  name: "chatUserListReducer",
  initialState: chatUserListInitialState,
  reducers: {
    addIntialAllUserList: (state, action) => {
      // return { isChanged: true, usersDeatail: [...action.payload] }
    },
    addIntialAllUserAndGroupList: (state, action) => {
      // console.log('action',action.payload)
      return {
        isChanged: true,
        usersDeatail: [...action.payload.usersDeatail],
        groupDetail: [...action.payload.groupDetail],
        currentChaterDetail: null,
        isCurrentChatingWithGroup: true,
      }
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
      const userDetail = state.usersDeatail.filter((userDetail) => userDetail._id == action.payload._id)[0]
      if (userDetail == undefined) return { ...state }

      if (state.currentChaterDetail?._id != action.payload._id) {
        userDetail.notification = {
          ...action.payload.notification,
          totalNotificationCount:
            userDetail.notification?.totalNotificationCount != undefined
              ? userDetail.notification.totalNotificationCount + 1
              : 1,
        }
      }

      state.usersDeatail = [{ ...userDetail }, ...state.usersDeatail.filter((user) => user._id != action.payload._id)]
    },
    removeUserNotification: (state, action) => {
      const updatedUserDetail = state.usersDeatail.map((userDetail) => {
        if (userDetail._id == action.payload._id) return { ...userDetail, notification: undefined }
        else return { ...userDetail }
      })

      state.usersDeatail = updatedUserDetail
    },
    updateCurrentUser: (state, action) => {
      state.currentChaterDetail = { ...action.payload.userDetail, currentChaterType: "user" }
      state.isCurrentChatingWithGroup = false
    },

    updateCurrentChatingGroup: (state, action) => {
      state.currentChaterDetail = { ...action.payload.groupDetail, currentChaterType: "group" }
      state.isCurrentChatingWithGroup = true
    },
    updateGroupSetting: (state, action: { payload: { setting: groupSetting; _id: string } }) => {
      const updatedRequiredGroup = state.groupDetail.filter((group) => group._id == action.payload._id)[0]
      state.groupDetail = [
        ...state.groupDetail.filter((group) => group._id != action.payload._id),
        { ...updatedRequiredGroup, setting: action.payload.setting },
      ]
      if (state.currentChaterDetail != null && state.currentChaterDetail.currentChaterType == "group") {
        state.currentChaterDetail = { ...state.currentChaterDetail, setting: action.payload.setting }
      }
    },
  },
})

export const chatUserListAction = chatUsersListReducer.actions
