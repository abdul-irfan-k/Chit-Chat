import { axiosChatInstance } from "@/constants/axios"

export const createMessageGroupHandler = (details: Object) => async (dispatch: AppDispatch) => {
  try {
    const { data } = await axiosChatInstance.post("/createGroup", details)
  } catch (error) {}
}
