import { activateCallNotification } from "@/redux/reducers/top-notification-reducer/top-notification-reducer"
import { AppDispatch } from "@/store"

export const addAudioCallNotification = () => (dispatch:AppDispatch) => {
   dispatch(activateCallNotification({random:'test'}))
}