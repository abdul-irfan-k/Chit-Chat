import { axiosUserInstance } from "@/constants/axios"
import { userDetailAction, userDetailState, userSignUpAction } from "@/redux/reducers/user-redicer/user-reducer"
import { AppDispatch } from "@/store"
import axios from "axios"
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context"

export const loginHandler = (details: Object, router: AppRouterInstance) => async (dispatch: AppDispatch) => {
  try {
    const { data } = await axiosUserInstance.post("/login", { ...details })
    if (data.isValid) {
      router.push("/messenger")
    }
  } catch (error) {
    console.log(error)
  }
}

export const signUpHandler = (details: Object) => async (dispatch: AppDispatch) => {
  try {
    const { data } = await axiosUserInstance.post("/signUp", { ...details })
    if (data.isValid)
      dispatch(userDetailAction.setUserDetail({ userDetail: { name: data.name, email: data.email }, isLogedIn: true }))
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const { isValid, errorType, errorMessage } = error.response?.data
      dispatch(userSignUpAction.setUserSignUpError({ error: errorType, errorMessage }))
      return console.log(error)
    }
    console.log(error)
  }
}

export const checkUserIsLogedIn = () => async (dispatch: AppDispatch) => {
  try {
    const { data } = await axiosUserInstance.post("/getUserDetail")
    console.log("data", data)
    return dispatch(
      userDetailAction.setUserDetail({
        userDetail: {
          name: data.name,
          email: data.email,
          userId: data.userId,
          _id: data._id,
          profileImageUrl: data.profileImageUrl,
        },
        isLogedIn: true,
        isChanged: true,
      }),
    )
  } catch (error) {
    dispatch(userDetailAction.setUserDetail({ isLogedIn: false, isChanged: true }))
  }
}

export const loginWithGoogleHandler = (data: Object, router: AppRouterInstance) => async (dispatch: AppDispatch) => {
  try {
    console.log("login with google ")
    const { data: response } = await axiosUserInstance.post("/loginWithGoogleWithCredintials", data)
    if (response.isValid) {
      router.push("/messenger")
    }
  } catch (error) {}
}

export const loginWithGoogleWithAcessToken =
  (data: Object, router: AppRouterInstance) => async (dispatch: AppDispatch) => {
    try {
      const { data: response } = await axiosUserInstance.post("/googleLoginWithAcessToken", data)
      if (response.isValid) {
        router.push("/messenger")
      }
    } catch (error) {}
  }

export const loginWithGithubHandler = (data: Object, router: AppRouterInstance) => async (dispatch: AppDispatch) => {
  try {
    const { data: response } = await axiosUserInstance.post("/loginWithGithub", data)
    if (response.isValid) {
      router.push("/messenger")
    }
  } catch (error) {}
}

export const userIntialSettingSetupHandler = async (data: Object, router: AppRouterInstance) => {
  try {
    const { data: response } = await axiosUserInstance.post("/gettingStartedSettingSetup", data)
    if (response.isUpdated) {
      router.push("/messenger")
    }
  } catch (error) {}
}
