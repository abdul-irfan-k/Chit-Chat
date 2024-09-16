import { createSlice } from "@reduxjs/toolkit"
interface audioDevice {
  deviceId: string
  deviceName: string
}
interface videoDevice {
  deviceId: string
  deviceName: string
}

export interface callSetting {
  callType: "videoCall" | "voiceCall"
  availabeAudioDevices?: audioDevice[]
  availabeVideoDevices?: videoDevice[]
  currentSelectedAudioDevice?: audioDevice
  currentSelectedVideoDevice?: videoDevice
  isAllowedScreenShare: boolean
  isAllowedCamara: boolean
  isAllowedMicrophone: boolean
}

interface communicatorsDetail extends userBasicDetail {
  peerId: string
  videoStatus: "inActive" | "active"
  camaraStatus: "inActive" | "active"
}

interface privateCallDetail {
  callRoomId: string
  chatRoomId: string
  referenceId?: string
  callType: "audioCall" | "videoCall"
  callChannelType: "private"
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
  callType: "audioCall" | "videoCall"
  callChannelType: "group"
  avilableTotalUserCount?: number
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

interface userBasicDetail {
  _id: string
  name: string
  userId: string
  profileImageUrl?: string
}

interface peerDetail extends userBasicDetail {
  userId: string
  peerId: string
}

interface joinRequestedUserDetail extends userBasicDetail {}

interface privateCallRequest {
  callType: "audioCall" | "videoCall"
  callChannelType: "private"
  isCalling: boolean
  communicatorsDetail: userBasicDetail
}
interface groupCallRequest {
  isCalling: boolean
  callType: "audioCall" | "videoCall"
  callChannelType: "group"
  communicatorsDetail: userBasicDetail[]
}

export type callReducerState = {
  callDetail?: privateCallDetail | groupCallDetail
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
  callRequestDetail?: privateCallRequest | groupCallRequest
}
const callReducerIntialState: callReducerState = {
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
    },
    updateUserStatus: (state, action) => {},
    addCallSetting: (state, action: { payload: callReducerState["callSetting"] }) => {
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
    addCallRequest: (state, action: { payload: callReducerState["callRequestDetail"] }) => {
      return { ...state, callRequestDetail: action.payload }
    },
    removeCallRequest: (state, action) => {
      return { ...state, callRequestDetail: undefined }
    },
  },
})
export const callReducerAction = callRedcuer.actions
