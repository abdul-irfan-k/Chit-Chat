import { createSlice } from "@reduxjs/toolkit"

interface textMessage {
  _id: string
  chatRoomId: string
  postedByUser: string
  message: string
  messageType: "textMessage"
  messageSendedTime: Date
}

interface voiceMessage {
  _id: string
  chatRoomId: string
  postedByUser: string
  message: string
  messageType: "voiceMessage"
  messageSendedTime: Date
  voiceMessageSrc: string
}

interface imageMessage {
  _id: string
  chatRoomId: string
  postedByUser: string
  messageType: "imageMessage"
  messageSendedTime: Date
  imageMessageSrc: string[]
}
type messageType = textMessage | voiceMessage | imageMessage
interface outGoingMessage {
  messegeChannelType: "outgoingMessage"
  messageData: messageType
  messageStatus?: "sended" | "notSended"
  messageDeliveryStatus?: "notDelivered" | "delivered" | "watched"
}
interface incomingMessage {
  messegeChannelType: "incomingMessage"
  messageData: messageType
}

interface chatRoomMessages {
  chatRoomId: string
  messages: Array<outGoingMessage | incomingMessage>
}

interface allChatRoomMessages {
  chatRoomMessages: chatRoomMessages[]
  currentChaterMessage?: chatRoomMessages
  messageAvailableChatRoom: availabeChatRoom[]
}

interface availabeChatRoom {
  chatRoomId: string
}

export type chatRoomMessagesReducerSlate = allChatRoomMessages
const chatRoomMessagesIntialState: chatRoomMessagesReducerSlate = {
  chatRoomMessages: [],
  messageAvailableChatRoom: [],
}

export const chatRoomsMessageReducer = createSlice({
  name: "chatRoomMessageReducer",
  initialState: chatRoomMessagesIntialState,
  reducers: {
    addIntialChatRoomMessage: (state, action) => {
      return { ...state, chatRoomMessages: [action.payload], currentChaterMessage: action.payload }
    },

    removeCurrentChaterMessage: (state, action) => {
      return { ...state, currentChaterMessage: undefined }
    },
    addCurrentChaterMessage: (state, action) => {
      const currentChaterMessage = state.chatRoomMessages.filter(
        (chatRoom) => chatRoom.chatRoomId == action.payload.chatRoomId,
      )
      state.currentChaterMessage = currentChaterMessage[0]
    },
    addSendedChatRoomMessage: (
      state,
      action: { payload: { chatRoomId: string; newMessage: incomingMessage | outGoingMessage } },
    ) => {
      const updatedChatRoomMessage = state.chatRoomMessages.filter((chatRoom) => {
        if (chatRoom.chatRoomId == action.payload.chatRoomId) return chatRoom.messages.push(action.payload.newMessage)
        return []
      })
      console.log("update chat room room message",updatedChatRoomMessage)
      state.chatRoomMessages = [
        ...state.chatRoomMessages.filter((chatRoom) => chatRoom.chatRoomId != action.payload.chatRoomId),
        updatedChatRoomMessage[0],
      ]
      state.currentChaterMessage = updatedChatRoomMessage[0]
    },
    addMessageAvailableChatRooms: (state, action) => {
      const isAlreadAvailableMessage = state.messageAvailableChatRoom.some(
        (chatRoom) => chatRoom.chatRoomId == action.payload.chatRoomId,
      )
      if (isAlreadAvailableMessage) return { ...state }
      state.messageAvailableChatRoom = [...state.messageAvailableChatRoom, action.payload]
    },
  },
})
export const chatRoomMessageAction = chatRoomsMessageReducer.actions
