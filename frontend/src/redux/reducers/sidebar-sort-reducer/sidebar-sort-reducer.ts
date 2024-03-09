import { createSlice } from "@reduxjs/toolkit"

type sidebarSortOption = "settting" | "notification" | "freindsList" | "messenger"

export interface sidebarSortReducerState {
  currentSideBarSortOption: sidebarSortOption
  isInitialRender: boolean
}

const sidebarSortReducerIntialState: sidebarSortReducerState = {
  currentSideBarSortOption: "messenger",
  isInitialRender: true,
}
export const sidebarSortReducer = createSlice({
  name: "sidebarSortReducer",
  initialState: sidebarSortReducerIntialState,
  reducers: {
    changeSideBarSortOption: (state, action: { payload: { currentSideBarSortOption: sidebarSortOption } }) => {
      return {currentSideBarSortOption:action.payload.currentSideBarSortOption,isInitialRender:false}
    },
  },
})
export const sidebarReducerAction = sidebarSortReducer.actions
