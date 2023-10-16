import { callRequestRedcuerAction } from "@/redux/reducers/call-request-reducer/call-request-reducer";
import { AppDispatch } from "@/store";

export const videoCallRequestHandler = (details) => async(dispatch: AppDispatch) =>  {
    dispatch(callRequestRedcuerAction.addCallRequest(details))
}

export const videoCallRequestRemoveHandler = () => async(dispatch: AppDispatch) => {
    dispatch(callRequestRedcuerAction.removeCallRequest())
}