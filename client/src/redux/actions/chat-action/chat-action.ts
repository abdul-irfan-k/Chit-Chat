import { axiosChatInstance, axiosUserInstance } from "@/constants/axios"
import {
  chatUserListAction,
  currentChaterAction,
  currentChaterReducerSlate,
} from "@/redux/reducers/chat-reducer/chat-reducer"
import { AppDispatch } from "@/store"
import { Socket } from "socket.io-client"

export const addAllChatUsers = () => async (dispatch: AppDispatch) => {
  try {
    const { data } = await axiosUserInstance.post("/getAllChatUsers")
    console.log("fetched data", data)
    dispatch(chatUserListAction.addIntialAllUserList(data))
  } catch (error) {}
}

export const updateCurrentChaterHandler = (details: currentChaterReducerSlate) => async (dispatch: AppDispatch) => {
  dispatch(currentChaterAction.updateCurrentChater(details))
}

export const sendMessageHandler = ({ message, receiverId, senderId, chatRoomId }, socket: Socket) => async (dispatch: AppDispatch) => {
    socket.emit("message:newMessage", { message, receiverId, senderId, chatRoomId })
  }

export const getChatRoomMessageHandler = ({chatRoomId}) => async(dispatch:AppDispatch) =>  {
  try {
    const {data} = await axiosChatInstance.post('/getChatRoomMessage',{chatRoomId})
    console.log('chatroom Message',data)
  } catch (error) {
    console.log('chat room message request error ')
  }
}
