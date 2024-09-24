import { createSlice } from "@reduxjs/toolkit"

const chatRoomMessagesIntialState: chatRoomMessagesReducerSlate = {
  chatRoomMessages: [],
  messageAvailableChatRoom: [],
}

export const messageReducer = createSlice({
  name: "chatRoomMessageReducer",
  initialState: chatRoomMessagesIntialState,
  reducers: {
    addChatRoomInitialMessage: (
      state,
      action: { payload: { messageAndChatRoomDetails: chatRoomMessages; isInitialMessages: boolean } },
    ) => {
      if (action.payload.isInitialMessages) {
        return {
          ...state,
          chatRoomMessages: [{ ...action.payload.messageAndChatRoomDetails, totalFetchedMessages: 10 }],
          currentChatRoomMessages: { ...action.payload.messageAndChatRoomDetails, totalFetchedMessages: 10 },
          messageAvailableChatRoom: [
            ...state.messageAvailableChatRoom,
            { chatRoomId: action.payload.messageAndChatRoomDetails.chatRoomId },
          ],
        }
      }

      const oldMessages = state.chatRoomMessages.filter(
        (chatRoom) => chatRoom.chatRoomId == action.payload.messageAndChatRoomDetails.chatRoomId,
      )[0]

      const otherChatRoomMessages = state.chatRoomMessages.filter(
        (chatRoom) => chatRoom.chatRoomId != action.payload.messageAndChatRoomDetails.chatRoomId,
      )

      const currentChatRoomMessages: chatRoomMessages = {
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
            messages: [...currentChatRoomMessages.messages],
          },
        ],
        currentChatRoomMessages,
      }
      // return {...state}
    },

    removeCurrentChaterMessage: (state, action) => {
      return { ...state, currentChatRoomMessages: undefined }
    },
    addCurrentChaterMessage: (state, action) => {
      const currentChatRoomMessages = state.chatRoomMessages.filter(
        (chatRoom) => chatRoom.chatRoomId == action.payload.chatRoomId,
      )
      state.currentChatRoomMessages = currentChatRoomMessages[0]
    },
    addChatRoomMessage: (
      state,
      action: {
        payload: { chatRoomId: string; newMessage: incomingMessage | outGoingMessage; isSendedMessage?: boolean }
      },
    ) => {
      let updatedChatRoomMessage = state.chatRoomMessages.filter(
        (chatRoom) => chatRoom.chatRoomId == action.payload.chatRoomId,
      )[0]
      if (updatedChatRoomMessage)
        updatedChatRoomMessage.messages = [{ ...action.payload.newMessage }, ...updatedChatRoomMessage.messages]
      else {
        //@ts-ignore
        updatedChatRoomMessage = { chatRoomId: action.payload.chatRoomId, messages: [{ ...action.payload.newMessage }] }
      }
      state.chatRoomMessages = [
        ...state.chatRoomMessages.filter((chatRoom) => chatRoom.chatRoomId != action.payload.chatRoomId),
        { ...updatedChatRoomMessage },
      ]
      if (action.payload.isSendedMessage || state.currentChatRoomMessages?.chatRoomId == action.payload.chatRoomId)
        state.currentChatRoomMessages = updatedChatRoomMessage
    },
    addChatRoomMultipleMessage: (
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
      state.currentChatRoomMessages = updatedChatRoomMessage
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
      const chatRoom = state.chatRoomMessages.filter((chatRoom) => chatRoom.chatRoomId == action.payload.chatRoomId)[0]
      const updatedAllMessageOfChatRoom = chatRoom.messages.filter(
        (message) => message.messageData._id != action.payload.message._id,
      )

      state.chatRoomMessages = [
        ...state.chatRoomMessages.filter((chatRoom) => chatRoom.chatRoomId != action.payload.chatRoomId),
        { ...chatRoom, messages: updatedAllMessageOfChatRoom },
      ]

      if (state.currentChatRoomMessages?.chatRoomId == action.payload.chatRoomId) {
        state.currentChatRoomMessages = { chatRoomId: action.payload.chatRoomId, messages: updatedAllMessageOfChatRoom }
      }
      return { ...state }
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
                reactions: [{ ...action.payload.message, usersId: [action.payload.userId] }],
              },
            }
          }

          const updatedReaction: messageReaction["reactions"] = []
          message.messageData.reactions.forEach((reaction) => {
            if (reaction.emoji == action.payload.message.emoji) return updatedReaction.push({ ...reaction })
            const oldReactionIndex = reaction.usersId.findIndex((userId) => userId == action.payload.userId)
            if (oldReactionIndex != -1) {
              if (reaction.usersId.length > 1)
                return updatedReaction.push({
                  ...reaction,
                  usersId: [...reaction.usersId.filter((userId) => userId != action.payload.userId)],
                })

              if (reaction.emojiId == action.payload.message.emoji)
                return updatedReaction.push({
                  ...reaction,
                  usersId: [...reaction.usersId, action.payload.userId],
                })
            } else updatedReaction.push({ ...reaction })
          })

          const isAlreadyHaveNewReaction = message.messageData.reactions.findIndex(
            (reaction) => reaction.emojiId == action.payload.message.emojiId,
          )
          if (isAlreadyHaveNewReaction == -1) {
            updatedReaction.push({ ...action.payload.message, usersId: [action.payload.userId] })
          }

          return { ...message, messageData: { ...message.messageData, reactions: updatedReaction } }
        } else return { ...message }
      })
      state.chatRoomMessages = [
        ...state.chatRoomMessages.filter((chatroom) => chatroom.chatRoomId != action.payload.chatRoomId),
        { chatRoomId: action.payload.chatRoomId, messages: updatedAllMessageOfChatRoom },
      ]
      if (state.currentChatRoomMessages?.chatRoomId == action.payload.chatRoomId) {
        state.currentChatRoomMessages = { chatRoomId: action.payload.chatRoomId, messages: updatedAllMessageOfChatRoom }
      }
    },
  },
})
export const chatRoomMessageAction = messageReducer.actions

export interface messageReaction {
  reactions?: {
    emoji: string
    emojiId: string
    usersId: []
  }[]
}
interface messageBasicDetails {
  _id: string
  postedByUser?: {
    _id?: string
    name: string
    profileImageUrl: string
  }
  messageSendedTime?: Date | string
}

interface textMessage extends messageReaction, messageBasicDetails {
  content: string
  messageType: "textMessage"
}

interface voiceMessage extends messageReaction, messageBasicDetails {
  messageType: "voiceMessage"
  audioSrc: string
}

interface imageMessage extends messageReaction, messageBasicDetails {
  messageType: "imageMessage"
  imageSrc: string[]
}
interface videoMessage extends messageReaction, messageBasicDetails {
  messageType: "videoMessage"
  videoSrc: string
}

interface pollMessage extends messageReaction, messageBasicDetails {
  messageType: "pollMessage"
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
export type messageTypes = outGoingMessage | incomingMessage

interface chatRoomMessages {
  chatRoomId: string
  messages: Array<outGoingMessage | incomingMessage>
  isAllMessageFetched?: boolean
  totalFetchedMessages?: number
  totatMessages?: number
}

interface allChatRoomMessages {
  chatRoomMessages: chatRoomMessages[]
  currentChatRoomMessages?: chatRoomMessages
  messageAvailableChatRoom: availabeChatRoom[]
}

interface availabeChatRoom {
  chatRoomId: string
}

export type chatRoomMessagesReducerSlate = allChatRoomMessages
