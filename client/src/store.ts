import { combineReducers, configureStore } from "@reduxjs/toolkit"
import { socketReducer } from "./reducers/socket-reducers/socket-reducers"

const combinedReducers = combineReducers({
  socket: socketReducer.reducer,
})

export const store = configureStore({
  reducer: combinedReducers,
})
