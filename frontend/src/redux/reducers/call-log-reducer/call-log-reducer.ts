import { createSlice } from "@reduxjs/toolkit"
import { userDetail } from "../user-redicer/user-reducer"

export interface callLog {
  _id: string
  callType: "private" | "group"
  isMissedCall: boolean
  mediaType: "audio" | "video"
  isIncomingCall: boolean
  startTime: string
  endTime: string
  duration: string
  callIntiatorUserId: string
  participants: Array<userDetail & { chatRoomId: string }>
}

export type callLogsReducerState = {
  callLogs: Array<callLog>
  isInitial: boolean
  selectedCallLogMember?: userDetail & { chatRoomId: string }
}

const callLogsReducerIntialState: callLogsReducerState = {
  callLogs: [],
  isInitial: true,
}

export const callLogsReducer = createSlice({
  name: "callLogsReducer",
  initialState: callLogsReducerIntialState,
  reducers: {
    addCallLogs: (state, action: { payload: callLogsReducerState["callLogs"] }) => {
      return { ...state, callLogs: [...state.callLogs, ...action.payload], isInitial: false }
    },
    deleteCallLogs: (state, action: { payload: { _id: string } }) => {
      const updatedCallLogs = state.callLogs.filter((callLog) => callLog._id != action.payload._id)
      return { ...state, callLogs: [...updatedCallLogs] }
    },
    selectCallLogMember: (state, action: { payload: userDetail | undefined }) => {
      return { ...state, selectedCallLogMember: action.payload }
    },
  },
})

export const callLogsReducerAction = callLogsReducer.actions
