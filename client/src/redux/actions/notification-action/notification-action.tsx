import { activateCallNotification } from "@/redux/reducers/notification-reducer/notification-reducer"
import { AppDispatch } from "@/store"

export const addAudioCallNotification = () => (dispatch:AppDispatch) => {
   dispatch(activateCallNotification({random:'test'}))
}