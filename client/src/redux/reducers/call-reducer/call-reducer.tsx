import { createSlice } from "@reduxjs/toolkit"

interface communicatorsDetail {
  peerId: string
  userId: string
  videoStatus: "inActive" | "active"
  camaraStatus: "inActive" | "active"
}
interface callRedcuer {
  callRoomId: string
  chatRoomId: string
  callType: "audioCall" | "videoCall"
  callChannelType: "single" | "multiple"
  avilableTotalUserCount?: number
  myDetail: {
    peerId: string
    userId: string
  }
  communicatorsDetail: communicatorsDetail[]
}
export type callReducerSlate = {
  callDetail?: callRedcuer
  isChanged: boolean
  callStatus?: "active" | "inActive"
}
const callReducerIntialState: callReducerSlate = {
  callDetail: undefined,
  isChanged: true,
}

export const callRedcuer = createSlice({
  name: "callReducer",
  initialState: callReducerIntialState,
  reducers: {
    addIntialCallData: (state, action) => {
      return { ...state, ...action.payload, isChanged: true }
    },
    removeUserFromCall: (state, action) => {
      const updatedCommunicatorDetails = state.callDetail?.communicatorsDetail.filter(
        (communicatorDetail) => communicatorDetail.peerId == action.payload.peerId,
      )

      const communicatorsDetail = updatedCommunicatorDetails != undefined ? updatedCommunicatorDetails : []
      const avilableTotalUserCount =
        state.callDetail?.avilableTotalUserCount != undefined ? state.callDetail.avilableTotalUserCount - 1 : undefined

      return {
        ...state,
        callDetail: { ...state.callDetail, communicatorsDetail, avilableTotalUserCount },
      }
    },
    updateUserStatus: (state, action) => {},
  },
})
export const callReducerACtion = callRedcuer.actions
