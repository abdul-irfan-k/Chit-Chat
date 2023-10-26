import { combineReducers, configureStore } from "@reduxjs/toolkit"
import { socketClientReducer } from "./redux/reducers/socket-reducer/socket-reducers"
import { messengerSortReducer } from "./redux/reducers/messenger-sort-reducer/messenger-sort-reducer"
import { useDispatch } from "react-redux"
import { userDetailReducer, userSignUpDetailReducer } from "./redux/reducers/user-redicer/user-reducer"
import { chatUsersListReducer } from "./redux/reducers/chat-user-reducer/chat-user-reducer"
import { chatRoomsMessageReducer } from "./redux/reducers/message-reducer/message-reducer"
import { callRequestReducer } from "./redux/reducers/call-request-reducer/call-request-reducer"
import { callNotificationReducer } from "./redux/reducers/top-notification-reducer/call-notification-reducer"
import { callRedcuer } from "./redux/reducers/call-reducer/call-reducer"

const combinedReducers = combineReducers({
  socketClient: socketClientReducer.reducer,
  messengerSort: messengerSortReducer.reducer,
  userSignUpDetail: userSignUpDetailReducer.reducer,
  chatUsersList: chatUsersListReducer.reducer,
  userDetail: userDetailReducer.reducer,
  chatRoomsMessageReducer: chatRoomsMessageReducer.reducer,
  callRequestReducer: callRequestReducer.reducer,
  callNotificationReducer: callNotificationReducer.reducer,
  callRedcuer: callRedcuer.reducer,
})

export const store = configureStore({
  reducer: combinedReducers,
})

export type AppDispatch = typeof store.dispatch
type DispatchFunc = () => AppDispatch
export const useAppDispatch: DispatchFunc = useDispatch
