import { Socket } from "socket.io-client"
import { generateUUIDString } from "@/util/uuid"
import { axiosChatInstance, axiosUploadInstance } from "@/constants/axios"
import { AppDispatch } from "@/store"
import { chatRoomMessageAction, messageTypes } from "@/redux/reducers/message-reducer/message-reducer"
import { chatUserAndGroupAction, groupSetting } from "@/redux/reducers/chat-user-reducer/chat-user-reducer"
import { SocketIO } from "@/provider/socket-io-provider/socket-io-provider"
import {
  GroupMessageActionArgs,
  GroupMessageArgs,
  messageEmitCallBackArgs,
  PrivateMessageActionArgs,
  PrivateMessageArgs,
} from "chit-chat-events"

export const sendedFreindRequestHandler = async (details: any) => {
  return new Promise(async (resolve, reject) => {
    try {
      const { data } = await axiosChatInstance.post("/friendRequest", details)
      resolve(data)
    } catch (error) {
      reject(error)
    }
  })
}

export const acceptFriendRequestHandler = async (details: any) => {
  return new Promise(async (resolve, reject) => {
    try {
      const { data } = await axiosChatInstance.put("/acceptfriendRequest", details)
      resolve(data)
    } catch (error) {
      reject(error)
    }
  })
}
export const rejectFriendRequestHandler = async (details: any) => {
  return new Promise(async (resolve, reject) => {
    try {
      const { data } = await axiosChatInstance.put("/rejectfriendRequest", details)
      resolve(data)
    } catch (error) {
      reject(error)
    }
  })
}

export const getFreindsListHandler = async () => {
  return new Promise(async (resolve, reject) => {
    try {
      const { data } = await axiosChatInstance.get("/friends")
      resolve(data)
    } catch (error) {
      reject(error)
    }
  })
}

export const getAllChatuserAndGroupHandler = () => async (dispatch: AppDispatch) => {
  try {
    const { data: usersDeatail } = await axiosChatInstance.post("/getAllChatUsers")
    const { data: groupDetail } = await axiosChatInstance.post("/getAllChatGroups")
    dispatch(chatUserAndGroupAction.addIntialAllUserAndGroupList({ usersDeatail, groupDetail }))
  } catch (error) {
    console.log("eror", error)
  }
}

export const createGroupHandler = (details: Object) => async (dispatch: AppDispatch) => {
  try {
    const { formData } = details
    const { data: response } = await axiosUploadInstance.post("/uploadSingleImage", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    })
    if (response.fileUrl) {
      const { data: group } = await axiosChatInstance.post("/groups", {
        name: details.name,
        members: details.members,
        groupImage: response.fileUrl,
      })
    }
  } catch (error) {
    console.log("error", error)
  }
}

export const getGroupDetailsHandler = (groupId: string) => async (dispatch: AppDispatch) => {
  try {
    const { data } = await axiosChatInstance.get(`/groups/${groupId}`)
    dispatch(
      chatUserAndGroupAction.updateGroup({ _id: groupId, members: data.members, isGroupMemberDetailsAvailable: true }),
    )
  } catch (error) {}
}

export const updateGroupSettingHandler = (details: any) => async (dispatch: AppDispatch) => {
  try {
    dispatch(
      chatUserAndGroupAction.updateGroup({
        setting: { ...details.groupSetting },
        _id: details.groupId,
      }),
    )

    const { data } = await axiosChatInstance.put(`/groups/${details.groupId}/settings`, {
      groupSetting: details.groupSetting,
    })
  } catch (error) {}
}

export const updateCurrentChaterHandler = (details: any) => async (dispatch: AppDispatch) => {
  dispatch(chatUserAndGroupAction.updateCurrentUser(details))
}
export const updateCurrentChatingGroupHandler = (details: any) => async (dispatch: AppDispatch) => {
  dispatch(chatUserAndGroupAction.updateCurrentChatingGroup(details))
}

export const getChatRoomMessageHandler =
  ({
    chatRoomId,
    myUserId,
    skip = 0,
    step = 10,
    limit = 10,
  }: {
    chatRoomId: string
    myUserId: string
    skip: number
    step: number
    limit: number
  }) =>
  async (dispatch: AppDispatch) => {
    try {
      const { data } = await axiosChatInstance.post("/chatroom/messages", {
        chatRoomId,
        skip,
        step,
        limit,
        sort: "ACCENDING",
      })
      if (data == undefined) return dispatch(chatRoomMessageAction.removeCurrentChaterMessage({}))

      const messageData = data[0].messages.map((elm: any) => {
        const messegeChannelType = elm.postedByUser == myUserId ? "outgoingMessage" : "incomingMessage"
        return { messageData: { ...elm, messageSendedTime: new Date(elm.createdAt) }, messegeChannelType }
      })

      const isInitialMessages = skip == 0
      //@ts-ignore
      await dispatch(
        chatRoomMessageAction.addChatRoomInitialMessage({
          messageAndChatRoomDetails: { messages: messageData, totatMessages: data.totalMessages, chatRoomId },
          isInitialMessages,
        }),
      )

      // await axiosChatInstance.post("chatroom/messages/reaction", { chatRoomId, skip, step, limit })
    } catch (error) {
      console.log(error)
      // return dispatch(chatRoomMessageAction.removeCurrentChaterMessage({}))
    }
  }

export const getGroupChatRoomMessageHandler =
  ({ chatRoomId, myUserId, skip = 0, step = 10, limit = 10 }: { chatRoomId: string; myUserId: string }) =>
  async (dispatch: AppDispatch) => {
    try {
      const { data } = await axiosChatInstance.post("/groupChatroom/messages", {
        chatRoomId,
        skip,
        step,
        limit,
        sort: "ACCENDING",
      })
      if (data == undefined) return dispatch(chatRoomMessageAction.removeCurrentChaterMessage({}))

      const messageData = data[0].messages.map((elm: any) => {
        const messegeChannelType = elm.postedByUser._id == myUserId ? "outgoingMessage" : "incomingMessage"
        return { messageData: { ...elm, messageSendedTime: new Date(elm.createdAt) }, messegeChannelType }
      })

      const isInitialMessages = skip == 0
      //@ts-ignore
      dispatch(
        chatRoomMessageAction.addChatRoomInitialMessage({
          messageAndChatRoomDetails: { messages: messageData, totatMessages: data.totalMessages, chatRoomId },
          isInitialMessages,
        }),
      )
    } catch (error) {
      console.log(error)
      return dispatch(chatRoomMessageAction.removeCurrentChaterMessage({}))
    }
  }

type textMessageArgs = PrivateMessageArgs["TextMessage"] | GroupMessageArgs["TextMessage"]
export const sendTextMessageHandler = (args: textMessageArgs, socket: SocketIO) => async (dispatch: AppDispatch) => {
  const { chatRoomId, message, senderId, messageChannelType } = args
  message._id = generateUUIDString()
  dispatch(
    chatRoomMessageAction.addChatRoomMessage({
      chatRoomId: chatRoomId,
      newMessage: {
        messegeChannelType: "outgoingMessage",
        messageData: {
          ...message,
          messageType: "textMessage",
        },
      },
      isSendedMessage: true,
    }),
  )

  if (messageChannelType == "private") {
    socket.emit(
      "message:newTextMessage",
      { message, chatRoomId, receiverId: args.receiverId, senderId, messageChannelType },
      (response: messageEmitCallBackArgs) => {},
    )
  } else {
    socket.emit(
      "groupMessage:newTextMessage",
      {
        message,
        chatRoomId,
        groupId: args.groupId,
        senderId,
        messageChannelType,
      },
      (response) => {},
    )
  }
}

type audioMessageArgs = PrivateMessageArgs["AudioMessage"] | GroupMessageArgs["AudioMessage"]
type sendAudioMessageHandleArgs = audioMessageArgs & {
  messageSrc: string
}
export const sendAudioMessageHandler =
  (details: sendAudioMessageHandleArgs, socket: SocketIO) => async (dispatch: AppDispatch) => {
    const { chatRoomId, message, senderId, messageChannelType, messageSrc } = details
    message._id = generateUUIDString()
    dispatch(
      chatRoomMessageAction.addChatRoomMessage({
        chatRoomId,
        newMessage: {
          messegeChannelType: "outgoingMessage",
          messageData: {
            messageType: "voiceMessage",
            ...message,
            audioSrc: messageSrc,
          },
        },
        isSendedMessage: true,
      }),
    )
    if (messageChannelType == "private")
      socket.emit("message:newAudioMessage", {
        chatRoomId,
        message,
        senderId,
        messageChannelType,
        receiverId: details.senderId,
      })
    else {
      socket.emit("groupMessage:newAudioMessage", {
        chatRoomId,
        message,
        groupId: details.groupId,
        senderId,
        messageChannelType,
      })
    }
  }

type imageMessage = PrivateMessageArgs["ImageMessage"] | GroupMessageArgs["ImageMessage"]
type sendImageMessageArguments = imageMessage & {
  formData: FormData
}
// send image message
export const sendImageMessageHandler =
  (args: sendImageMessageArguments, socket: SocketIO) => async (dispatch: AppDispatch) => {
    const { chatRoomId, formData, message, messageChannelType, senderId } = args
    message._id = generateUUIDString()
    dispatch(
      chatRoomMessageAction.addChatRoomMessage({
        chatRoomId,
        newMessage: {
          messegeChannelType: "outgoingMessage",
          messageData: {
            messageType: "imageMessage",
            _id: message._id,
            imageSrc: message.imageSrc,
          },
          messageStatus: "notSended",
          messageDeliveryStatus: "notDelivered",
        },
        isSendedMessage: true,
      }),
    )

    const { data: response } = await axiosUploadInstance.post("/uploadSingleImage", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    })

    if (!response.fileUrl) return

    if (messageChannelType == "private")
      socket.emit("message:newImageMessage", {
        chatRoomId,
        messageChannelType,
        message: { ...message, imageSrc: [response.fileUrl] },
        receiverId: args.receiverId,
        senderId,
      })
    else
      socket.emit("groupMessage:newImageMessage", {
        chatRoomId,
        messageChannelType,
        message: { ...message, imageSrc: [response.fileUrl] },
        groupId: args.groupId,
        senderId,
      })
  }

type multipleImageMessage = PrivateMessageArgs["MultipleImageMessage"] | GroupMessageArgs["MultipleImageMessage"]
type sendMultipleImageMessageHandlerArgs = multipleImageMessage & {
  imageUrls: string[]
  formData: FormData
}
export const sendMultipleImageMessageHandler =
  (args: sendMultipleImageMessageHandlerArgs, socket: SocketIO) => async (dispatch: AppDispatch) => {
    const { chatRoomId, formData, imageUrls, message, messageChannelType, senderId } = args

    const newMessage: Array<messageTypes> = []
    imageUrls.forEach((imageUrl) => {
      newMessage.push({
        messegeChannelType: "outgoingMessage",
        messageData: {
          messageType: "imageMessage",
          imageSrc: [imageUrl],
          _id: "",
          chatRoomId,
          messageSendedTime: new Date(),
        },
        messageStatus: "notSended",
      })
    })

    dispatch(chatRoomMessageAction.addChatRoomMultipleMessage({ chatRoomId, newMessage: newMessage }))

    const { data: response } = await axiosUploadInstance.post("/uploadMultipleImage", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    })

    if (messageChannelType == "private")
      socket.emit("message:newImageMessage", {
        chatRoomId,
        message: { imageSrc: response.fileUrl },
        receiverId: args.receiverId,
        senderId,
        messageChannelType,
      })
    else
      socket.emit("groupMessage:newImageMessage", {
        chatRoomId,
        groupId: args.groupId,
        message: { imageSrc: response.fileUrl },
        messageChannelType,
        senderId,
      })
  }

type videoMessage = PrivateMessageArgs["VideoMessage"] | GroupMessageArgs["VideoMessage"]
type sendVideoMessageArgs = videoMessage & {
  formData: string
}
export const sendVideoMessageHandler =
  (args: sendVideoMessageArgs, socket: SocketIO) => async (dispatch: AppDispatch) => {
    const { chatRoomId, formData, message, messageChannelType, senderId, videoUrl } = args
    message._id = generateUUIDString()

    dispatch(
      chatRoomMessageAction.addChatRoomMessage({
        chatRoomId,
        newMessage: {
          messegeChannelType: "outgoingMessage",
          messageData: {
            messageType: "videoMessage",
            ...message,
          },
          messageStatus: "notSended",
          messageDeliveryStatus: "notDelivered",
        },
        isSendedMessage: true,
      }),
    )
    const { data: response } = await axiosUploadInstance.post("/uploadVideo", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    })
    if (messageChannelType == "private")
      socket.emit("message:newVideoMessage", {
        message: { videoSrc: response.fileUrl, _id: message._id },
        senderId,
        receiverId: args.receiverId,
        chatRoomId,
        messageChannelType,
      })
    else
      socket.emit("groupMessage:newVideoMessage", {
        message: { videoSrc: response.fileUrl, _id: message._id },
        senderId,
        groupId: args.groupId,
        chatRoomId,
        messageChannelType,
      })
  }

type sendGroupPollMessageArgs = GroupMessageArgs["PollMessage"]
export const sendGroupPollMessageHandler =
  ({ chatRoomId, groupId, message, senderId, messageChannelType }: sendGroupPollMessageArgs, socket: SocketIO) =>
  async (dispatch: AppDispatch) => {
    message._id = generateUUIDString()
    dispatch(
      chatRoomMessageAction.addChatRoomMessage({
        chatRoomId,
        newMessage: {
          messegeChannelType: "outgoingMessage",
          //@ts-ignore
          messageData: {
            messageType: "pollMessage",
            ...message,
          },
        },
        isSendedMessage: true,
      }),
    )
    socket.emit("groupMessage:newPollMessage", { chatRoomId, groupId, message, senderId, messageChannelType })
  }

//======================================== RECEIVE MESSAGE ============================

export const receiveMessageHandler =
  ({
    chatRoomId,
    message,
    messageType,
  }: {
    chatRoomId: string
    message: any
    messageType: "textMessage" | "voiceMessage" | "imageMessage" | "videoMessage" | "pollMessage"
    isSendedMessage?: boolean
  }) =>
  async (dispatch: AppDispatch) => {
    dispatch(
      chatRoomMessageAction.addChatRoomMessage({
        chatRoomId,
        newMessage: {
          messegeChannelType: "incomingMessage",
          messageData: {
            ...message,
            messageType,
          },
        },
      }),
    )
  }

export const recieveMultipleNewImageMessageHandler =
  ({ chatRoomId, message }: { chatRoomId: string; message: { imageMessageSrc: string[] } }) =>
  async (dispatch: AppDispatch) => {
    const newMessages: Array<messageTypes> = []
    message.imageMessageSrc.forEach((imageSrc) => {
      newMessages.push({
        messegeChannelType: "incomingMessage",
        messageData: {
          messageType: "imageMessage",
          _id: "",
          chatRoomId,
          imageMessageSrc: [imageSrc],
          messageSendedTime: new Date(),
        },
      })
    })
    dispatch(
      chatRoomMessageAction.addChatRoomMultipleMessage({
        chatRoomId,
        newMessage: newMessages,
      }),
    )
  }

export const onChaterdeleteMessageHandler =
  ({ chatRoomId, message }: PrivateMessageActionArgs["deleteMessage"] | GroupMessageActionArgs["deleteMessage"]) =>
  async (dispatch: AppDispatch) => {
    dispatch(chatRoomMessageAction.deleteMessageFromChatRoom({ chatRoomId, message }))
  }

type deleteMessageArgs = PrivateMessageActionArgs["deleteMessage"] | GroupMessageActionArgs["deleteMessage"]
export const deleteMessageHandler = (args: deleteMessageArgs, socket: SocketIO) => async (dispatch: AppDispatch) => {
  const { message, chatRoomId, messageChannelType, senderId } = args
  dispatch(chatRoomMessageAction.deleteMessageFromChatRoom({ chatRoomId, message }))

  if (messageChannelType == "private")
    socket.emit("message:deleteMessage", {
      chatRoomId,
      message,
      receiverId: args.receiverId,
      senderId,
      messageChannelType,
    })
  else
    socket.emit("groupMessage:deleteMessage", {
      chatRoomId,
      message,
      groupId: args.groupId,
      senderId,
      messageChannelType,
    })
}

type reactMeessageArgs = PrivateMessageActionArgs["reactMessage"] | GroupMessageActionArgs["reactMessage"]
export const messageReactionHandler = (args: reactMeessageArgs, socket: SocketIO) => async (dispatch: AppDispatch) => {
  try {
    const { chatRoomId, message, messageChannelType, senderId } = args
    dispatch(chatRoomMessageAction.updateMessageReaction({ chatRoomId, userId: senderId, message }))
    if (messageChannelType == "private") {
      socket.emit("message:reactMessage", {
        ...args,
      })
    }
  } catch (error) {
    console.log(error)
  }
}

//user action
export const onGroupSettingChangeHandler =
  ({ groupDetail, setting }: { groupDetail: { _id: string }; setting: groupSetting }) =>
  async (dispatch: AppDispatch) => {
    dispatch(chatUserAndGroupAction.updateGroup({ _id: groupDetail._id, setting }))
  }

export const addNewMessageNotificationHandler =
  ({ _id }: { _id: string }) =>
  async (dispatch: AppDispatch) => {
    dispatch(
      chatUserAndGroupAction.addUserNotification({
        _id,
        notification: { notificationType: "newMessage", totalNotificationCount: 1, isAvailableNewNotification: true },
      }),
    )
  }

export const getIntialOnlineChatUsers = (socket: Socket) => async (dispatch: AppDispatch) => {
  try {
    socket.emit("status:getOnlineUsers", (onlineUsers: any) => {
      dispatch(chatUserAndGroupAction.addintialOnlineUsers({ onlineUsers }))
    })
  } catch (error) {}
}
