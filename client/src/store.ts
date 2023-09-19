import { combineReducers, configureStore } from "@reduxjs/toolkit"
import { socketReducer } from "./redux/reducers/socket-reducers/socket-reducers"
import { audioCallNotificationReducer } from "./redux/reducers/top-notification-reducer/top-notification-reducer";

const combinedReducers = combineReducers({
  socket: socketReducer.reducer,
  audioCallNotification:audioCallNotificationReducer.reducer
})

export const store = configureStore({
  reducer: combinedReducers,
})


export type AppDispatch = typeof store.dispatch;