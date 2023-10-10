import { axiosChatInstance, axiosUserInstance } from "@/constants/axios"
import {
  chatUserListAction,
  currentChaterAction,
  currentChaterReducerSlate,
} from "@/redux/reducers/chat-user-reducer/chat-user-reducer"
import {
  chatRoomMessageAction,
  messageAvailableChatRoomsAction,
} from "@/redux/reducers/message-reducer/message-reducer"
import { AppDispatch } from "@/store"
import { Socket } from "socket.io-client"

export const addAllChatUsers = () => async (dispatch: AppDispatch) => {
  try {
    const { data } = await axiosUserInstance.post("/getAllChatUsers")
    dispatch(chatUserListAction.addIntialAllUserList(data))
  } catch (error) {}
}

export const updateCurrentChaterHandler = (details: currentChaterReducerSlate) => async (dispatch: AppDispatch) => {
  dispatch(currentChaterAction.updateCurrentChater(details))
}

export const sendMessageHandler =
  ({ message, receiverId, senderId, chatRoomId }, socket: Socket) =>
  async (dispatch: AppDispatch) => {
    socket.emit("message:newMessage", { message, receiverId, senderId, chatRoomId })
  }

export const getChatRoomMessageHandler =
  ({ chatRoomId, myUserId }) =>
  async (dispatch: AppDispatch) => {
    try {
      console.log("getchatroom message handler ")
      const { data } = await axiosChatInstance.post("/getChatRoomMessage", { chatRoomId })
      if (data == undefined) return dispatch(chatRoomMessageAction.removeCurrentChaterMessage({}))

      const newData = data[0].messages.map((elm) => {
        const messegeChannelType = elm.postedByUser == myUserId ? "outgoingMessage" : "incomingMessage"
        return { messageData: { ...elm, messageSendedTime: new Date(elm.createdAt) }, messegeChannelType }
      })

      dispatch(chatRoomMessageAction.addIntialChatRoomMessage({ chatRoomId, messages: newData }))
      dispatch(messageAvailableChatRoomsAction.addMessageAvailableChatRooms({ chatRoomId }))
    } catch (error) {
      console.log(error)
      return dispatch(chatRoomMessageAction.removeCurrentChaterMessage({}))
    }
  }
