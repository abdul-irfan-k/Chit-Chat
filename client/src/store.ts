import { combineReducers, configureStore } from "@reduxjs/toolkit"
import { socketClientReducer } from "./redux/reducers/socket-reducer/socket-reducers"
import { audioCallNotificationReducer } from "./redux/reducers/top-notification-reducer/top-notification-reducer"
import { messengerSortReducer } from "./redux/reducers/messenger-reducer/messenger-reducer"
import { useDispatch } from "react-redux"
import { userDetailReducer, userSignUpDetailReducer } from "./redux/reducers/user-redicer/user-reducer"
import { chatUsersListReducer, currentChaterReducer } from "./redux/reducers/chat-reducer/chat-reducer"

const combinedReducers = combineReducers({
  socketClient: socketClientReducer.reducer,
  audioCallNotification: audioCallNotificationReducer.reducer,
  messengerSort: messengerSortReducer.reducer,
  userSignUpDetail: userSignUpDetailReducer.reducer,
  chatUsersList: chatUsersListReducer.reducer,
  currentChater:currentChaterReducer.reducer,
  userDetail:userDetailReducer.reducer
})

export const store = configureStore({
  reducer: combinedReducers,
})

export type AppDispatch = typeof store.dispatch
type DispatchFunc = () => AppDispatch
export const useAppDispatch: DispatchFunc = useDispatch
