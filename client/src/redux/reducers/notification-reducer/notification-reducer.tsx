import { createSlice } from "@reduxjs/toolkit"

interface userDetail {
  _id: string
  name: string
  userId: string
  email: string
  profileImageUrl?: string
}

interface voiceCallNotificaton {
  callType: "voiceCall"
  chatRoomId: string
  callRoomId: string
  userDetail?: userDetail
}

interface videoCallNotification {
  callType: "videoCall"
  chatRoomId: string
  callRoomId: string
  userDetail?: userDetail
}

interface callJoinRequestNotification {
  userId: string
}

interface notification {
  isAvailableCallNotification: boolean
  callNotificationData?: voiceCallNotificaton | videoCallNotification
  callJoinRequestNotification?: callJoinRequestNotification[]
}

export type callNotificationReducerSlate = notification
export const callNotificationInitialState: callNotificationReducerSlate = {
  isAvailableCallNotification: false,
}

export const notificationReducer = createSlice({
  name: "audioCallNotificationReducer",
  initialState: callNotificationInitialState,
  reducers: {
    addCallNotification: (state, action) => {
      return { isAvailableCallNotification: true, callNotificationData: { ...action.payload } }
    },
    removeCallNotification: (state, action) => {
      return { isAvailableCallNotification: false }
    },
  },
})

export const callRequestNotificationReducerAction = notificationReducer.actions
