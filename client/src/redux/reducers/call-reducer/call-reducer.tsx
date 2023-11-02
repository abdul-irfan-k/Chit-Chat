import { createSlice } from "@reduxjs/toolkit"
interface audioDevice {
  deviceId: string
  deviceName: string
}
interface videoDevice {
  deviceId: string
  deviceName: string
}

interface callSetting {
  callType: "videoCall" | "voiceCall"
  availabeAudioDevices?: audioDevice[]
  availabeVideoDevices?: videoDevice[]
  currentSelectedAudioDevice?: {
    deviceId: string
  }
  currentSelectedVideoDevice?: {
    deviceId: string
  }
  isAllowedScreenShare: boolean
  isAllowedCamara: boolean
  isAllowedMicrophone: boolean
}

interface communicatorsDetail {
  peerId: string
  userId: string
  videoStatus: "inActive" | "active"
  camaraStatus: "inActive" | "active"
}

interface callDetail {
  callRoomId: string
  chatRoomId: string
  referenceId?: string
  callType: "audioCall" | "videoCall"
  callChannelType: "single"
  avilableTotalUserCount?: number
  myDetail: {
    peerId: string
    userId: string
  }
  callInitiator?: {
    userId: string
  }
  communicatorsDetail: communicatorsDetail[]
}

interface groupCallDetail {
  callRoomId: string
  referenceId: string
  callChannelType: "group"
  myDetail: {
    peerId: string
    userId: string
  }
  adminDetail?: {
    userId: string
  }
  callIntiator?: {
    userId: string
  }
  communicatorsDetail: communicatorsDetail[]
}

interface peerDetail {
  userId: string
  peerId: string
}

interface joinRequestedUserDetail {
  userName: string
  userId: string
}
export type callReducerSlate = {
  callDetail?: callDetail | groupCallDetail
  isChanged: boolean
  callStatus?: "active" | "inActive"
  isAvailableCallRoom: boolean
  callSetting?: callSetting

  connectionRequiredPeers?: {
    latestPeer?: peerDetail
    allPeers: peerDetail[]
    isInitialPeer: boolean
  }
  joinRequestedUsers?: {
    latestJoinRequestor?: joinRequestedUserDetail
    allJoinRequestors: joinRequestedUserDetail[]
  }
}
const callReducerIntialState: callReducerSlate = {
  callDetail: undefined,
  isChanged: false,
  isAvailableCallRoom: false,
}

export const callRedcuer = createSlice({
  name: "callReducer",
  initialState: callReducerIntialState,
  reducers: {
    addIntialCallData: (state, action: { payload: callReducerSlate; type: string }) => {
      return { ...state, ...action.payload, isChanged: true }
    },
    addCallData: (state, action) => {
      return { ...state, ...action.payload }
    },
    removeUserFromCall: (state, action) => {
      const updatedCommunicatorDetails = state.callDetail?.communicatorsDetail.filter(
        (communicatorDetail) => communicatorDetail.peerId == action.payload.peerId,
      )

      const communicatorsDetail = updatedCommunicatorDetails != undefined ? updatedCommunicatorDetails : []
      const avilableTotalUserCount =
        state.callDetail?.avilableTotalUserCount != undefined ? state.callDetail.avilableTotalUserCount - 1 : undefined

      // return {
      //   ...state,
      //   callDetail: { ...state.callDetail, communicatorsDetail, avilableTotalUserCount },
      // }
    },
    updateUserStatus: (state, action) => {},
    addCallSetting: (state, action) => {
      return { ...state, callSetting: { ...action.payload } }
    },
    changeCallSetting: (state, action) => {
      return { ...state, callSetting: { ...state.callSetting, ...action.payload } }
    },

    addConnectionRequiredPeers: (state, action) => {
      if (state.connectionRequiredPeers != undefined) {
        state.connectionRequiredPeers.allPeers = [...state.connectionRequiredPeers?.allPeers, action.payload]
        state.connectionRequiredPeers.latestPeer = { ...action.payload }
      } else {
        state.connectionRequiredPeers = {
          allPeers: [action.payload],
          isInitialPeer: false,
          latestPeer: { ...action.payload },
        }
      }
    },

    addJoinRequestedUser: (state, action) => {
      if (state.joinRequestedUsers != undefined) {
        state.joinRequestedUsers = {
          allJoinRequestors: [...state.joinRequestedUsers?.allJoinRequestors, action.payload],
          latestJoinRequestor: { ...action.payload },
        }
      }
      if (state.joinRequestedUsers == undefined) {
        state.joinRequestedUsers = {
          allJoinRequestors: [action.payload],
          latestJoinRequestor: { ...action.payload },
        }
      }
    },
  },
})
export const callReducerAction = callRedcuer.actions
