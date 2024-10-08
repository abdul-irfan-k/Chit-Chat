import { createSlice } from "@reduxjs/toolkit"

interface chatSort {
  messengerSortType: "chat"
  subSelectionType: "direct" | "group"
}

interface callSort {
  messengerSortType: "call"
  subSelectionType: "allCall" | "incomingCall" | "outgoingCall" | "missedCall"
}

interface contactSort {
  messengerSortType: "freinds"
  subSelectionType: "all" | "sendFreindRequest" | "recivedFreindRequest"
}
// export type messengerSortState<T> = messengerSort &  (T extends chatSort ? T & chatSort : T extends callSort ? T & callSort :T &  contactSort)
export type messengerSortState = chatSort | callSort | contactSort
const messengerSortIntialState: messengerSortState = {
  messengerSortType: "chat",
  subSelectionType: "direct",
}

export const messengerSortReducer = createSlice({
  name: "messengerSortReducer",
  initialState: messengerSortIntialState,
  reducers: {
    changeMessengerSort: (state, action) => {
      state.messengerSortType = action.payload.messengerSortType
      state.subSelectionType = action.payload.subSelectionType
    },
  },
})

export const { changeMessengerSort } = messengerSortReducer.actions
