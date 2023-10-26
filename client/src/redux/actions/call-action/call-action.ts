import { callReducerAction } from "@/redux/reducers/call-reducer/call-reducer"
import { AppDispatch } from "@/store"

export const addInitialCallDataHandler = (data: any, id: string) => async (dispatch: AppDispatch) => {
  const myDetail = data.callRoomUserDetails.filter((userDetail) => userDetail.userId === id)[0]
  const communicatorsDetail = data.callRoomUserDetails.filter((userDetail) => userDetail.userId != id)

  dispatch(
    callReducerAction.addIntialCallData({
      isChanged: true,
      callDetail: {
        callRoomId: data.callRoomId,
        chatRoomId: data.chatRoomId,
        callType: data.callType,
        callChannelType: data.callChannelType,
        myDetail,
        communicatorsDetail,
      },
      callStatus: "active",
      isAvailableCallRoom: true,
    }),
  )
}

export const addAvailableMediaDevices =
  (
    audioDevices: Array<{ deviceId: string; deviceName: string }>,
    videoDevices: Array<{ deviceId: string; deviceName: string }>,
  ) =>
  (dispatch: AppDispatch) => {
    dispatch(
      callReducerAction.changeCallSetting({ availabeAudioDevices: audioDevices, availabeVideoDevices: videoDevices }),
    )
  }

export const changeCallSettingHandler = (data) => async (dispatch: AppDispatch) => {
  dispatch(callReducerAction.changeCallSetting(data))
}

export const addScreenSharingHandler = () => async (dispatch: AppDispatch) => {
  dispatch(callReducerAction.changeCallSetting({ isAllowedScreenShare: true }))
}

export const removeScreenSharingHandler = () => async (dispatch: AppDispatch) => {
  dispatch(callSettingReducerAction.changeCallSetting({ isAllowedScreenShare: false }))
}

export const addCallSettingHandler = (data) => async (dispatch: AppDispatch) => {
  dispatch(
    callReducerAction.addCallSetting({
      isAllowedScreenShare: false,
      isAllowedCamara: false,
      isAllowedMicrophone: false,
      callType: "videoCall",
    }),
  )
}
