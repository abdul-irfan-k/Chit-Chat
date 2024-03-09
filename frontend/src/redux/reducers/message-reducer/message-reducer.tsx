import { createSlice } from "@reduxjs/toolkit"
import { IncomingMessage, OutgoingMessage } from "http";

const chatRoomMessagesIntialState: chatRoomMessagesReducerSlate = {
  chatRoomMessages: [],
  messageAvailableChatRoom: [],
}

export const chatRoomsMessageReducer = createSlice({
  name: "chatRoomMessageReducer",
  initialState: chatRoomMessagesIntialState,
  reducers: {
    addChatRoomMessage: (
      state,
      action: { payload: { messageAndChatRoomDetails: chatRoomMessages; isInitialMessages: boolean } },
    ) => {
      if (action.payload.isInitialMessages)
        return {
          ...state,
          chatRoomMessages: [{ ...action.payload.messageAndChatRoomDetails, totalFetchedMessages: 10 }],
          currentChaterMessage: { ...action.payload.messageAndChatRoomDetails, totalFetchedMessages: 10 },
        }

      const oldMessages = state.chatRoomMessages.filter(
        (chatRoom) => chatRoom.chatRoomId == action.payload.messageAndChatRoomDetails.chatRoomId,
      )[0]

      const otherChatRoomMessages = state.chatRoomMessages.filter(
        (chatRoom) => chatRoom.chatRoomId != action.payload.messageAndChatRoomDetails.chatRoomId,
      )

      const currentChaterMessage: chatRoomMessages = {
        ...action.payload.messageAndChatRoomDetails,
        messages: [...oldMessages.messages, ...action.payload.messageAndChatRoomDetails.messages],
        totatMessages: oldMessages.totatMessages,
        totalFetchedMessages:
          oldMessages.totalFetchedMessages != undefined ? oldMessages.totalFetchedMessages + 10 : 10,
      }

      return {
        ...state,
        chatRoomMessages: [
          ...otherChatRoomMessages,
          {
            ...action.payload.messageAndChatRoomDetails,
            messages: [...currentChaterMessage.messages],
          },
        ],
        currentChaterMessage,
      }
      // return {...state}
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
      const updatedChatRoomMessage = state.chatRoomMessages.filter(
        (chatRoom) => chatRoom.chatRoomId == action.payload.chatRoomId,
      )[0]
      updatedChatRoomMessage.messages = [{ ...action.payload.newMessage }, ...updatedChatRoomMessage.messages]
      state.chatRoomMessages = [
        ...state.chatRoomMessages.filter((chatRoom) => chatRoom.chatRoomId != action.payload.chatRoomId),
        { ...updatedChatRoomMessage },
      ]
      state.currentChaterMessage = updatedChatRoomMessage
    },
    addSendedChatRoomMultipleMessage: (
      state,
      action: { payload: { chatRoomId: string; newMessage: Array<messageTypes> } },
    ) => {
      const updatedChatRoomMessage = state.chatRoomMessages.filter(
        (chatRoom) => chatRoom.chatRoomId == action.payload.chatRoomId,
      )[0]
      updatedChatRoomMessage.messages = [...action.payload.newMessage, ...updatedChatRoomMessage.messages]
      state.chatRoomMessages = [
        ...state.chatRoomMessages.filter((chatRoom) => chatRoom.chatRoomId != action.payload.chatRoomId),
        { ...updatedChatRoomMessage },
      ]
      state.currentChaterMessage = updatedChatRoomMessage
    },
    addMessageAvailableChatRooms: (state, action) => {
      const isAlreadAvailableMessage = state.messageAvailableChatRoom.some(
        (chatRoom) => chatRoom.chatRoomId == action.payload.chatRoomId,
      )
      if (isAlreadAvailableMessage) return { ...state }
      state.messageAvailableChatRoom = [...state.messageAvailableChatRoom, action.payload]
    },
    updateMessageStatus: (
      state,
      action: {
        payload: {
          chatRoomId: string
          messageId: string
          messageStatusDetails: { messageStatus?: messageStatus; messageDeliveryStatus?: messageDeliveryStatus }
        }
      },
    ) => {
      const chatRoomMessages = state.chatRoomMessages.filter((chatRoom) => {
        if (chatRoom.chatRoomId == action.payload.chatRoomId) return chatRoom.messages
        return []
      })[0]

      const updatedAllMessageOfChatRoom = chatRoomMessages.messages.map((message) => {
        if (message.messageData._id == action.payload.messageId) {
          return { ...message, ...action.payload.messageStatusDetails }
        } else return { ...message }
      })
      state.chatRoomMessages = [
        ...state.chatRoomMessages.filter((chatRoom) => chatRoom.chatRoomId != action.payload.chatRoomId),
        { chatRoomId: action.payload.chatRoomId, messages: updatedAllMessageOfChatRoom },
      ]
    },
    deleteMessageFromChatRoom: (state, action: { payload: { chatRoomId: string; message: { _id: string } } }) => {
      const chatRoomMessages = state.chatRoomMessages.filter(
        (chatRoom) => chatRoom.chatRoomId == action.payload.chatRoomId,
      )[0]
      const updatedAllMessageOfChatRoom = chatRoomMessages.messages.filter(
        (message) => message.messageData._id != action.payload.message._id,
      )

      state.chatRoomMessages = [
        ...state.chatRoomMessages.filter((chatRoom) => chatRoom.chatRoomId != action.payload.chatRoomId),
        { chatRoomId: action.payload.chatRoomId, messages: updatedAllMessageOfChatRoom },
      ]

      state.currentChaterMessage = { chatRoomId: action.payload.chatRoomId, messages: updatedAllMessageOfChatRoom }
    },
    updateMessageReaction: (
      state,
      action: {
        payload: { chatRoomId: string; userId: string; message: { _id: string; emoji: string; emojiId: string } }
      },
    ) => {
      const chatRoomMessages = state.chatRoomMessages.filter((chatRoom) => {
        if (chatRoom.chatRoomId == action.payload.chatRoomId) return chatRoom.messages
        return []
      })[0]
      const updatedAllMessageOfChatRoom = chatRoomMessages.messages.map((message) => {
        if (message.messageData._id == action.payload.message._id) {
          if (message.messageData.reactions == undefined) {
            return {
              ...message,
              messageData: {
                ...message.messageData,
                reactions: [{ ...action.payload.message, usersId: [{ userId: action.payload.userId }] }],
              },
            }
          }

          const updatedReaction: messageReaction["reactions"] = []
          message.messageData.reactions.forEach((reaction) => {
            if (reaction.emoji == action.payload.message.emoji) return updatedReaction.push({ ...reaction })
            const oldReactionIndex = reaction.usersId.findIndex((user) => user.userId == action.payload.userId)
            if (oldReactionIndex != -1) {
              if (reaction.usersId.length > 1)
                return updatedReaction.push({ ...reaction, usersId: reaction.usersId.slice(oldReactionIndex, 1) })

              if (reaction.emojiId == action.payload.message.emoji)
                return updatedReaction.push({
                  ...reaction,
                  usersId: [...reaction.usersId, { userId: action.payload.userId }],
                })
            } else updatedReaction.push({ ...reaction })
          })

          const isAlreadyHaveNewReaction = message.messageData.reactions.findIndex(
            (reaction) => reaction.emojiId == action.payload.message.emojiId,
          )
          if (isAlreadyHaveNewReaction == -1) {
            updatedReaction.push({ ...action.payload.message, usersId: [{ userId: action.payload.userId }] })
          }

          return { ...message, messageData: { ...message.messageData, reactions: updatedReaction } }
        } else return { ...message }
      })
      state.chatRoomMessages = [
        ...state.chatRoomMessages.filter((chatroom) => chatroom.chatRoomId != action.payload.chatRoomId),
        { chatRoomId: action.payload.chatRoomId, messages: updatedAllMessageOfChatRoom },
      ]
      if (state.currentChaterMessage?.chatRoomId == action.payload.chatRoomId) {
        state.currentChaterMessage = { chatRoomId: action.payload.chatRoomId, messages: updatedAllMessageOfChatRoom }
      }
    },
  },
})
export const chatRoomMessageAction = chatRoomsMessageReducer.actions

export interface messageReaction {
  reactions?: {
    emoji: string
    emojiId: string
    usersId: {
      userId: string
    }[]
  }[]
}

interface textMessage extends messageReaction {
  _id: string
  chatRoomId: string
  postedByUser: string
  message: string
  messageType: "textMessage"
  messageSendedTime: Date
}

interface voiceMessage extends messageReaction {
  _id: string
  chatRoomId: string
  postedByUser: string
  message: string
  messageType: "voiceMessage"
  messageSendedTime: Date
  voiceMessageSrc: string
}

interface imageMessage extends messageReaction {
  _id: string
  chatRoomId: string
  postedByUser: string
  messageType: "imageMessage"
  messageSendedTime: Date
  imageMessageSrc: string[]
}
interface videoMessage extends messageReaction {
  _id: string
  chatRoomId: string
  postedByUser: string
  messageType: "videoMessage"
  messageSendedTime: Date
  videoMessageSrc: string
}

interface pollMessage extends messageReaction {
  _id: string
  chatRoomId: string
  postedByUser: string
  messageType: "pollMessage"
  messageSendedTime: Date
  title: string
  options: {
    title: string
    _id: string
    votedMembers: {
      userId: string
    }[]
  }[]
}
type messageType = textMessage | voiceMessage | imageMessage | pollMessage | videoMessage
export type messageStatus = "sended" | "notSended"
export type messageDeliveryStatus = "notDelivered" | "delivered" | "watched"

export interface outGoingMessage {
  messegeChannelType: "outgoingMessage"
  messageData: messageType
  messageStatus?: messageStatus
  messageDeliveryStatus?: messageDeliveryStatus
}
export interface incomingMessage {
  messegeChannelType: "incomingMessage"
  messageData: messageType
}
export type messageTypes =  OutgoingMessage | IncomingMessage

interface chatRoomMessages {
  chatRoomId: string
  messages: Array<outGoingMessage | incomingMessage>
  isAllMessageFetched?: boolean
  totalFetchedMessages?: number
  totatMessages?: number
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
