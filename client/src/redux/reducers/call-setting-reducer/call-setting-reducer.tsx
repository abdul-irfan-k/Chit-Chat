import { createSlice } from "@reduxjs/toolkit"

interface audioDevice {
  deviceId: string
}
interface videoDevice {
  deviceId: string
}

interface audioDeviceDetails {
  availabeAudioDevices: audioDevice[]
  currentSelectedDevice: {
    deviceId: string
  }
}

interface videoDeviceDetails {
  availabeVideoDevices: videoDevice[]
  currentSelectedDevice: {
    deviceId: string
  }
}

interface voiceCallSetting {
  callType: "audioCall"
  audioSourceDetail: audioDeviceDetails
}

interface videoCallSetting {
  callType: "videoCall"
  videoSourceDetail: videoDeviceDetails
  audioSourceDetail: audioDeviceDetails
}

export type callSettingReducerSlate = voiceCallSetting | videoCallSetting | null
export const callSettingReducerInitialState: callSettingReducerSlate = null

export const callSettingReducer = createSlice({
  name: "callSettingReducer",
  initialState: callSettingReducerInitialState,
  reducers: {
    addCallSettingData:(state,action) => {

    }
  },
})
export const callSettingReducerAction = callSettingReducer.actions
