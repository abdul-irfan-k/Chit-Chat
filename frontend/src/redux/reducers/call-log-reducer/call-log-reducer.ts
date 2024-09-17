import { createSlice } from "@reduxjs/toolkit"
import { userDetail } from "../user-redicer/user-reducer"

interface callLog {
  _id: string
  callType: "private" | "group"
  isMissedCall: boolean
  mediaType: "audio" | "video"
  isIncomingCall: boolean
  startTime: string
  endTime: string
  duration: string
  callIntiatorUserId: string
  participants: userDetail[]
}

export type callLogsReducerState = {
  callLogs: Array<callLog>
  isInitial: boolean
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
    // deleteParticularUserAllCallLogs:(state,action:{payload:{}}) => {

    // }
  },
})

export const callLogsReducerAction = callLogsReducer.actions
