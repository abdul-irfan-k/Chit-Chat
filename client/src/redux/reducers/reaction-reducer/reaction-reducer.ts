import { createSlice } from "@reduxjs/toolkit"

interface reactionMenu {
  xPosition: number
  yPosition: number
  messageId: string
}

type reactionMenuReducer = null | reactionMenu
export type reactionMenuReducerState = {
  reactionMenu: reactionMenuReducer
}
const reactionMenuReducerInitialState: reactionMenuReducerState = {
  reactionMenu: null,
}

export const reactionMenuReducer = createSlice({
  name: "reactionMenuReducer",
  initialState: reactionMenuReducerInitialState,
  reducers: {
    changeReactionMenu: (state, action: { payload: reactionMenuReducerState }) => {
      if (action.payload == null) return { reactionMenu: null }
      else return {...action.payload}
    },
  },
})

export const reactionMenuReducerActions = reactionMenuReducer.actions
