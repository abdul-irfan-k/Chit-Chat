import { EMAILALAREADTAKEN, USERIDALREADTAKEN } from "@/constants/error-constant"
import { createSlice } from "@reduxjs/toolkit"

// user sign up reducer
type userSignUpError = EMAILALAREADTAKEN | USERIDALREADTAKEN
export interface userSignUpDeatil {
  isContainSignUpError: boolean
  error: null | userSignUpError
  errorMessage?: string
}
const userSignUpDeatilIntialState: userSignUpDeatil = {
  isContainSignUpError: false,
  error: null,
}
export const userSignUpDetailReducer = createSlice({
  name: "userSignUpDetailReducer",
  initialState: userSignUpDeatilIntialState,
  reducers: {
    setUserSignUpError: (state, action) => {
      state.isContainSignUpError = true
      state.error = action.payload.error
      state.errorMessage = action.payload.errorMessage
    },
    removeUserSignUpError: (state, action) => {
      state.isContainSignUpError = false
      state.error = null
      state.errorMessage = ""
    },
  },
})
export const userSignUpAction = userSignUpDetailReducer.actions

// userdetail reducer
export interface userDetail {
  _id: string
  name: string
  userId: string
  email: string
  profileImageUrl: string
}

interface userDetailReducer {
  userDetail: userDetail | null
  isLogedIn: Boolean
  isChanged: Boolean
}
export type userDetailState = userDetailReducer
const userDetailIntialState: userDetailState = {
  userDetail: null,
  isLogedIn: false,
  isChanged: false,
}

export const userDetailReducer = createSlice({
  name: "userDetailReducer",
  initialState: userDetailIntialState,
  reducers: {
    setUserDetail: (state, action: { payload: userDetailReducer }) => {
      state.isChanged = action.payload.isChanged
      state.isLogedIn = action.payload.isLogedIn
      if (action.payload.userDetail != null) state.userDetail = { ...action.payload.userDetail }
    },
    updateUserDetail: (state, action: { payload: Partial<userDetail> }) => {
      return { ...state, userDetail: { ...state.userDetail, ...action.payload } }
    },
    removeUserDetail: (state, action) => {
      state = null
    },
  },
})
export const userDetailAction = userDetailReducer.actions
