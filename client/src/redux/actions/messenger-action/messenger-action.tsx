import { changeMessengerSort, messengerSortState } from "@/redux/reducers/messenger-sort-reducer/messenger-sort-reducer";
import { AppDispatch } from "@/store";

export const changeMessengerSortState = (data:messengerSortState) => (dispatch:AppDispatch) => {
    dispatch(changeMessengerSort(data))
}