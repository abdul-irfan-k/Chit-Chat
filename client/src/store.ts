import { combineReducers, configureStore } from "@reduxjs/toolkit"
import { socketReducer } from "./redux/reducers/socket-reducer/socket-reducers"
import { audioCallNotificationReducer } from "./redux/reducers/top-notification-reducer/top-notification-reducer";
import { messengerSortReducer } from "./redux/reducers/messenger-reducer/messenger-reducer";
import { useDispatch } from "react-redux";

const combinedReducers = combineReducers({
  socket: socketReducer.reducer,
  audioCallNotification:audioCallNotificationReducer.reducer,
  messengerSort:messengerSortReducer.reducer
})

export const store = configureStore({
  reducer: combinedReducers,
})


export type AppDispatch = typeof store.dispatch;
type DispatchFunc = () => AppDispatch
export const useAppDispatch: DispatchFunc = useDispatch