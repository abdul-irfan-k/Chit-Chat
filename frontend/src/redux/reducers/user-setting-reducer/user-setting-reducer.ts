import { createSlice } from "@reduxjs/toolkit"

interface userSetting {
  notificationAndSoundSetting?:
    | {
        privateChat?:
          | {
              notification: string
              messagePreview: boolean
            }
          | undefined
        group?:
          | {
              notification: string
              messagePreview: boolean
            }
          | undefined
      }
    | undefined

  generalSetting?:
    | {
        theme?: string | undefined
        backgroundTheme?:
          | {
              themeUrl?: string | undefined
            }
          | undefined
        keyboardSetting?:
          | {
              sendByEnter: boolean
              sendByControlPlusEnter?: boolean | undefined
            }
          | undefined
        time?:
          | {
              timeFormat: string
            }
          | undefined
      }
    | undefined
}
export type userSetttingReducerState = {
  setting: null | userSetting
}
const userSettingReducerIntialState: userSetttingReducerState = {
  setting: null,
}
export const userSettingReducer = createSlice({
  name: "userSetttngReducer",
  initialState: userSettingReducerIntialState,
  reducers: {
    addInitialUserSetting: (state, action: { payload: { setting: userSetting } }) => {
      return { setting: action.payload.setting }
    },
    updateUserSetting: (state, action: { payload: { setting: Object } }) => {
      if (state.setting == null) return
      state.setting = { ...state.setting, ...action.payload.setting }
    },
  },
})

export const userSettingReducerAction = userSettingReducer.actions
