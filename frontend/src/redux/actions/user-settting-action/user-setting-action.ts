import { userSettingReducerAction } from "@/redux/reducers/user-setting-reducer/user-setting-reducer"
import { AppDispatch } from "@/store"

export const changeUserSettingHandler = (setting: Object) => async (dispatch: AppDispatch) => {
  dispatch(userSettingReducerAction.addInitialUserSetting({ setting }))
}
