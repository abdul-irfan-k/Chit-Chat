import { callReducerACtion } from "@/redux/reducers/call-reducer/call-reducer"
import { AppDispatch } from "@/store"

export const addInitialCallDataHandler = () => async (dispatch: AppDispatch) => {
  dispatch(
    callReducerACtion.addInitialCallDataHandler({
      isChanged: true,
      callDetail:{

      }
    }),
  )
}
