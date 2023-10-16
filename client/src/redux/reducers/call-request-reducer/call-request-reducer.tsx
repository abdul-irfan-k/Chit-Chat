import { createSlice } from "@reduxjs/toolkit"

interface userDetail {
  _id:string
  name: string
  userId: string
  email: string
  profileImageUrl?: string
}

interface voiceCallRequest {
  callType: "voiceCall"
  chatRoomId: string
  callRoomId: string
  userDetail?:userDetail
}
interface videoCallRequest {
  callType: "videoCall"
  chatRoomId: string
  callRoomId: string
  userDetail?:userDetail
}

interface callRequest {
  isCalling: boolean
  callRequestData?: voiceCallRequest | videoCallRequest
}

export type callRequestReducerSlate = callRequest
export const callRequestIntialState: callRequestReducerSlate = {
  isCalling: false
}

export const callRequestReducer = createSlice({
  name: "callRequestReducer",
  initialState: callRequestIntialState,
  reducers: {
    addCallRequest: (state, action) => {
      return { isCalling: true, callRequestData: { ...action.payload } }
    },
    removeCallRequest: (state, action) => {
      return { isCalling: false }
    },
    changeCallRequest: (state, action) => {
      return { isCalling: true, callRequestData: { ...action.payload } }
    },
  },
})

export const callRequestRedcuerAction = callRequestReducer.actions
