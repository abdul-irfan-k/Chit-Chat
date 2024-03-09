import { createSlice } from "@reduxjs/toolkit"

interface callLog {
  _id: string
  callType: "audioCall" | "videoCall"
  callDirection: "incomingCall" | "outgoingCall" | "incomingMissedCall" | "outgoingMissedCall"
  callStartTime: string
  callEndTime: string
  callDuration: string
  callInitiator: userBasicDetail
}

interface userBasicDetail {
  _id: string
  profileImageUrl: string
}

interface privateCallLogParticipantsDetail extends userBasicDetail {}
interface privateCallLog extends callLog {
  callMode: "private"
  participants: privateCallLogParticipantsDetail
}
interface groupCallLog extends callLog {
  callMode: "group"
}

type callLogs = privateCallLog | groupCallLog
export type callLogsReducerState = {
  callLogs: Array<callLogs>
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
    addCallLogs: (state, action: { payload: callLogsReducerState }) => {
      return { ...state, callLogs: [...state.callLogs, ...action.payload.callLogs] }
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
