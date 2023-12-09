import { createSlice } from "@reduxjs/toolkit"

type sidebarSortOption = "settting" | "notification" | "freindsList" | "messenger"

export interface sidebarSortReducerState {
  currentSideBarSortOption: sidebarSortOption
}

const sidebarSortReducerIntialState: sidebarSortReducerState = {
  currentSideBarSortOption: "messenger",
}
export const sidebarSortReducer = createSlice({
  name: "sidebarSortReducer",
  initialState: sidebarSortReducerIntialState,
  reducers: {
    changeSideBarSortOption: (state, action: { payload: { currentSideBarSortOption: sidebarSortOption } }) => {
      state.currentSideBarSortOption = action.payload.currentSideBarSortOption
    },
  },
})
export const sidebarReducerAction = sidebarSortReducer.actions
