import { combineReducers, configureStore } from "@reduxjs/toolkit"
import { socketClientReducer } from "./redux/reducers/socket-reducer/socket-reducers"
import { messengerSortReducer } from "./redux/reducers/messenger-sort-reducer/messenger-sort-reducer"
import { useDispatch } from "react-redux"
import { userDetailReducer, userSignUpDetailReducer } from "./redux/reducers/user-redicer/user-reducer"
import { chatUsersListReducer } from "./redux/reducers/chat-user-reducer/chat-user-reducer"
import { chatRoomsMessageReducer } from "./redux/reducers/message-reducer/message-reducer"
import { callRequestReducer } from "./redux/reducers/call-request-reducer/call-request-reducer"
import { callRedcuer } from "./redux/reducers/call-reducer/call-reducer"
import { notificationReducer } from "./redux/reducers/notification-reducer/notification-reducer"
import { sidebarSortReducer } from "./redux/reducers/sidebar-sort-reducer/sidebar-sort-reducer"
import { userSettingReducer } from "./redux/reducers/user-setting-reducer/user-setting-reducer"
import { reactionMenuReducer } from "./redux/reducers/reaction-reducer/reaction-reducer"

const combinedReducers = combineReducers({
  socketClient: socketClientReducer.reducer,
  messengerSort: messengerSortReducer.reducer,
  userSignUpDetail: userSignUpDetailReducer.reducer,
  chatUsersList: chatUsersListReducer.reducer,
  userDetail: userDetailReducer.reducer,
  chatRoomsMessageReducer: chatRoomsMessageReducer.reducer,
  callRequestReducer: callRequestReducer.reducer,
  notificationReducer: notificationReducer.reducer,
  callRedcuer: callRedcuer.reducer,
  sidebarSort: sidebarSortReducer.reducer,
  userSetting: userSettingReducer.reducer,
  reactionMenu: reactionMenuReducer.reducer,
})

export const store = configureStore({
  reducer: combinedReducers,
})

export type AppDispatch = typeof store.dispatch
type DispatchFunc = () => AppDispatch
export const useAppDispatch: DispatchFunc = useDispatch
