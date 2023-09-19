import { createSlice } from "@reduxjs/toolkit";

export const audioCallNotificationReducer = createSlice({
    name:"audioCallNotificationReducer",
    initialState:{isAvilableNotification:false},
    reducers:{
     activateCallNotification : (state,action) => {
        state.isAvilableNotification = true
     },
     removeCallNotification : (state,action) => {
        state.isAvilableNotification = false
     }
    }
})

export const {activateCallNotification,removeCallNotification} = audioCallNotificationReducer.actions