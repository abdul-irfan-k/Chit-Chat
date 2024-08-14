import { axiosChatInstance, axiosUploadInstance } from "@/constants/axios"
import { SocketIO } from "@/provider/socket-io-provider/socket-io-provider"
import { chatUserListAction, groupSetting } from "@/redux/reducers/chat-user-reducer/chat-user-reducer"
import { chatRoomMessageAction, messageTypes } from "@/redux/reducers/message-reducer/message-reducer"
import { AppDispatch } from "@/store"
import { generateUUIDString } from "@/util/uuid"
import {
  deleteMessageInterface,
  groupMessageBasicDetail,
  groupNewPollMessageInterface,
  messageEmitCallBackArgs,
  privateTextMessageEvent,
  reactMeessageInterface,
  groupMessageArgs,
  privateMessageArgs,
  groupMessageActionArgs,
  privateMessageActionArgs,
} from "chit-chat-events"
import { Socket } from "socket.io-client"

export const addAllChatUsers = () => async (dispatch: AppDispatch) => {
  try {
    const { data: usersDeatail } = await axiosChatInstance.post("/getAllChatUsers")
    // dispatch(chatUserListAction.addIntialAllUserList(usersDeatail))
    const { data: groupDetail } = await axiosChatInstance.post("/getAllChatGroups")
    // console.log("user details", usersDeatail)
    // console.log("all chat groups", data)
    dispatch(chatUserListAction.addIntialAllUserAndGroupList({ usersDeatail, groupDetail }))
  } catch (error) {}
}

export const addAllChatGroups = () => async (dispatch: AppDispatch) => {
  try {
    // const { data } = await axiosChatInstance.post("/getAllChatGroups")
    // console.log("all chat groups", data)
  } catch (error) {}
}

export const createGroupHandler = (details: Object) => async (dispatch: AppDispatch) => {
  try {
    const { data } = await axiosChatInstance.post("/createGroup", details)
  } catch (error) {}
}

export const updateCurrentChaterHandler = (details) => async (dispatch: AppDispatch) => {
  dispatch(chatUserListAction.updateCurrentUser(details))
}
export const updateCurrentChatingGroupHandler = (details) => async (dispatch: AppDispatch) => {
  dispatch(chatUserListAction.updateCurrentChatingGroup(details))
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
      const { data } = await axiosChatInstance.post("/getChatRoomMessage", {
        chatRoomId,
        skip,
        step,
        limit,
        sort: "ACCENDING",
      })
      if (data == undefined) return dispatch(chatRoomMessageAction.removeCurrentChaterMessage({}))

      const messageData = data[0].messages.map((elm) => {
        const messegeChannelType = elm.postedByUser == myUserId ? "outgoingMessage" : "incomingMessage"
        return { messageData: { ...elm, messageSendedTime: new Date(elm.createdAt) }, messegeChannelType }
      })

      const isInitialMessages = skip == 0
      dispatch(
        chatRoomMessageAction.addChatRoomMessage({
          messageAndChatRoomDetails: { chatRoomId, messages: messageData, totatMessages: data.totalMessages },
          isInitialMessages,
        }),
      )
      dispatch(chatRoomMessageAction.addMessageAvailableChatRooms({ chatRoomId }))
    } catch (error) {
      console.log(error)
      return dispatch(chatRoomMessageAction.removeCurrentChaterMessage({}))
    }
  }

export const getGroupChatRoomMessageHandler =
  ({ chatRoomId, myUserId }: { chatRoomId: string; myUserId: string }) =>
  async (dispatch: AppDispatch) => {
    try {
      const { data } = await axiosChatInstance.post("/getGroupChatRoomMessage", { chatRoomId })
      if (data == undefined) return dispatch(chatRoomMessageAction.removeCurrentChaterMessage({}))

      const newData = data[0].messages.map((elm) => {
        const messegeChannelType = elm.postedByUser == myUserId ? "outgoingMessage" : "incomingMessage"
        return { messageData: { ...elm, messageSendedTime: new Date(elm.createdAt) }, messegeChannelType }
      })
      dispatch(chatRoomMessageAction.addIntialChatRoomMessage({ chatRoomId, messages: newData }))
      dispatch(chatRoomMessageAction.addMessageAvailableChatRooms({ chatRoomId }))
    } catch (error) {
      console.log(error)
      return dispatch(chatRoomMessageAction.removeCurrentChaterMessage({}))
    }
  }
type sendTextMessageHandlerArgs = privateMessageArgs["TextMessage"] | groupMessageArgs["TextMessage"]
export const sendTextMessageHandler =
  (
    //@ts-ignore
    { chatRoomDetail, message, messageChannelType, senderDetails, receiverDetails }: sendTextMessageHandlerArgs,
    socket: SocketIO,
  ) =>
  async (dispatch: AppDispatch) => {
    message._id = generateUUIDString()
    dispatch(
      chatRoomMessageAction.addSendedChatRoomMessage({
        chatRoomId: chatRoomDetail._id,
        newMessage: {
          _id: message._id,
          messegeChannelType: "outgoingMessage",
          messageData: {
            chatRoomId: chatRoomDetail._id,
            message: message.messageContent,
            messageType: "textMessage",
            //@ts-ignore
            postedByUser: { name: senderDetails.name },
          },
          messageStatus: "notSended",
        },
      }),
    )

    if (messageChannelType == "private") {
      socket.emit(
        "message:newTextMessage",
        { message, chatRoomDetail, receiverDetails, senderDetails, messageChannelType },
        (response: messageEmitCallBackArgs) => {
          // if(response.isSended) dispatch(chatRoomMessageAction.updateMessageStatus())
        },
      )
    } else {
      socket.emit(
        "groupMessage:newTextMessage",
        {
          message,
          chatRoomDetail,
          messageChannelType,
          groupDetails: { _id: chatRoomDetail._id },
          senderDetails,
        },
        (response) => {},
      )
    }
  }

export const sendPollMessageHandler = () => async (dispatch: AppDispatch) => {}

// sending group poll message
interface sendGroupPollMessageArguments extends groupNewPollMessageInterface {
  postedByUser: string
}

export const sendGroupPollMessageHandler =
  ({ chatRoomId, groupDetail, message, postedByUser, senderId }: groupMessageArgs["PollMessage"], socket: SocketIO) =>
  async (dispatch: AppDispatch) => {
    socket.emit("groupMessage:newPollMessage", { chatRoomId, groupDetail, message, senderId })
    dispatch(
      chatRoomMessageAction.addSendedChatRoomMessage({
        chatRoomId,
        newMessage: {
          messegeChannelType: "outgoingMessage",
          messageData: {
            messageType: "pollMessage",
            _id: "",
            chatRoomId,
            messageSendedTime: new Date(),
            options: message.options,
            postedByUser: postedByUser,
            title: message.title,
          },
        },
      }),
    )
  }
// receiving group poll message

type imageMessage = privateMessageArgs["ImageMessage"] | groupMessageArgs["ImageMessage"]
type sendImageMessageArguments = imageMessage & {
  imageUrl: string
  formData: FormData
}
// send image message
export const sendImageMessageHandler =
  (
    {
      chatRoomDetail,
      formData,
      imageUrl,
      message,
      messageChannelType,
      receiverDetails,
      senderDetails,
    }: sendImageMessageArguments,
    socket: SocketIO,
  ) =>
  async (dispatch: AppDispatch) => {
    message._id = generateUUIDString()
    dispatch(
      chatRoomMessageAction.addSendedChatRoomMessage({
        chatRoomId,
        newMessage: {
          messegeChannelType: "outgoingMessage",
          messageData: {
            _id: message._id,
            chatRoomId: chatRoomDetail._id,
            messageType: "imageMessage",
            postedByUser: {
              ...senderDetails,
            },
            imageMessageSrc: [imageUrl],
          },
          messageStatus: "notSended",
        },
      }),
    )

    const { data: response } = await axiosUploadInstance.post("/uploadSingleImage", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    })

    if (!response.fileUrl) return

    if (messageChannelType == "private")
      socket.emit("message:newImageMessage", {
        chatRoomDetail,
        receiverDetails,
        senderDetails,
        messageChannelType: "private",
        message: { ...message, imageMessageSrc: response },
      })
    else
      socket.emit("groupMessage:newImageMessage", {
        chatRoomDetail,
        message: { ...message, imageMessageSrc: response },
        messageChannelType,
        receiverDetails,
        senderDetails,
      })
  }

type multipleImageMessage = privateMessageArgs["MultipleImageMessage"] | groupMessageArgs["MultipleImageMessage"]
type sendMultipleImageMessageHandlerArgs = multipleImageMessage & {
  imageUrls: string[]
  formData: FormData
}
export const sendMultipleImageMessageHandler =
  (
    {
      chatRoomDetail,
      formData,
      imageUrls,
      message,
      messageChannelType,
      senderDetails,
    }: sendMultipleImageMessageHandlerArgs,
    socket: SocketIO,
  ) =>
  async (dispatch: AppDispatch) => {
    const newMessage: Array<messageTypes> = []
    imageUrls.forEach((imageUrl) => {
      newMessage.push({
        messegeChannelType: "outgoingMessage",
        messageData: {
          _id: "",
          chatRoomId,
          messageType: "imageMessage",
          messageSendedTime: new Date(),
          postedByUser: "",
          imageMessageSrc: [imageUrl],
        },
        messageStatus: "notSended",
      })
    })

    dispatch(chatRoomMessageAction.addSendedChatRoomMultipleMessage({ chatRoomId, newMessage: newMessage }))

    const { data: response } = await axiosUploadInstance.post("/uploadMultipleImage", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    })

    if (messageChannelType == "private")
      socket.emit("message:newImageMessage", {
        chatRoomId,
        message: { imageMessageSrc: response.fileUrl },
        receiverId,
        senderId,
      })
    else messageChannelType == "group"
    socket.emit("groupMessage:newImageMessage", { chatRoomDetail, messageChannelType, groupDetails })
  }

export const sendAudioMessageHandler =
  (
    {
      chatRoomId,
      message,
      receiverId,
      senderId,
    }: { message: { file: Buffer; url: string }; receiverId: string; senderId: string; chatRoomId: string },
    socket: SocketIO,
  ) =>
  async (dispatch: AppDispatch) => {
    console.log("send audio message")
    dispatch(
      chatRoomMessageAction.addSendedChatRoomMessage({
        chatRoomId,
        newMessage: {
          messegeChannelType: "outgoingMessage",
          messageData: {
            messageType: "voiceMessage",
            _id: "",
            chatRoomId,
            voiceMessageSrc: message.url,
            messageSendedTime: new Date(),
            postedByUser: "a",
          },
        },
      }),
    )
    socket.emit("message:newAudioMessage", { chatRoomId, message, receiverId, senderId })
  }

export const sendVideoMessageHandler =
  (
    {
      chatRoomId,
      receiverId,
      senderId,
      formData,
    }: {
      receiverId: string
      senderId: string
      chatRoomId: string
      formData: FormDatastring
      videoUrl: string
    },
    socket: SocketIO,
  ) =>
  async (dispatch: AppDispatch) => {
    const { data: response } = await axiosUploadInstance.post("/uploadVideo", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    })
    socket.emit("message:newVideoMessage", {
      message: { videoMessageSrc: response.fileUrl },
      senderId,
      receiverId,
      chatRoomId,
    })
  }

export const receiveMessageHandler =
  ({ chatRoomId, message }: privateTextMessageEvent) =>
  async (dispatch: AppDispatch) => {
    dispatch(
      chatRoomMessageAction.addSendedChatRoomMessage({
        chatRoomId,
        newMessage: {
          messegeChannelType: "incomingMessage",
          messageData: {
            chatRoomId,
            _id: message._id,
            message: message.messageContent,
            messageType: "textMessage",
            messageSendedTime: new Date(),
            postedByUser: "irfan",
          },
        },
      }),
    )
  }

export const recieveNewImageMessageHandler =
  ({ chatRoomId, message }: { chatRoomId: string; message: { imageMessageSrc: string } }) =>
  async (dispatch: AppDispatch) => {
    dispatch(
      chatRoomMessageAction.addSendedChatRoomMessage({
        chatRoomId,
        newMessage: {
          messegeChannelType: "incomingMessage",
          messageData: {
            messageType: "imageMessage",
            _id: "",
            chatRoomId,
            imageMessageSrc: [message.imageMessageSrc],
            messageSendedTime: new Date(),
            postedByUser: "asdf",
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
          postedByUser: "asdf",
        },
      })
    })
    dispatch(
      chatRoomMessageAction.addSendedChatRoomMultipleMessage({
        chatRoomId,
        newMessage: newMessages,
      }),
    )
  }

export const recieveVideoMessageHandler =
  ({ chatRoomId, message }: { chatRoomId: string; message: { videoMessageSrc: string } }) =>
  async (dispatch: AppDispatch) => {
    dispatch(
      chatRoomMessageAction.addSendedChatRoomMessage({
        chatRoomId,
        newMessage: {
          messegeChannelType: "incomingMessage",
          messageData: {
            messageType: "videoMessage",
            _id: "",
            chatRoomId,
            videoMessageSrc: message.videoMessageSrc,
            messageSendedTime: new Date(),
            postedByUser: "a",
          },
        },
      }),
    )
  }

export const recieveAudioMessageHandler =
  ({ chatRoomId, message }: { chatRoomId: string; message: { audoMessageSrc: string; _id: string } }) =>
  async (dispatch: AppDispatch) => {
    dispatch(
      chatRoomMessageAction.addSendedChatRoomMessage({
        chatRoomId,
        newMessage: {
          messegeChannelType: "incomingMessage",
          messageData: {
            messageType: "voiceMessage",
            _id: message._id,
            chatRoomId,
            voiceMessageSrc: message.audoMessageSrc,
            messageSendedTime: new Date(),
            postedByUser: "a",
          },
        },
      }),
    )
  }

export const receivePollMessageHandler =
  ({
    chatRoomId,
    message,
    senderId,
  }: {
    chatRoomId: string
    message: { title: string; options: Array<Object> }
    senderId: string
  }) =>
  async (dispatch: AppDispatch) => {
    dispatch(
      chatRoomMessageAction.addSendedChatRoomMessage({
        chatRoomId,
        newMessage: {
          messegeChannelType: "incomingMessage",
          messageData: {
            messageType: "pollMessage",
            _id: "",
            chatRoomId,
            messageSendedTime: new Date(),
            options: message.options,
            postedByUser: senderId,
            title: message.title,
          },
        },
      }),
    )
  }

export const onChaterdeleteMessageHandler =
  ({ chatRoomId, message }: { chatRoomId: string; message: { _id: string } }) =>
  async (dispatch: AppDispatch) => {
    dispatch(chatRoomMessageAction.deleteMessageFromChatRoom({ chatRoomId, message }))
  }

export const deleteMessageHandler =
  ({ chatRoomId, message, receiverId, senderId }: deleteMessageInterface, socket: SocketIO) =>
  async (dispatch: AppDispatch) => {
    socket.emit("message:deleteMessage", { chatRoomId, message, receiverId, senderId })
    dispatch(chatRoomMessageAction.deleteMessageFromChatRoom({ chatRoomId, message }))
  }

export const messageReactionHandler =
  ({ chatRoomId, message, receiverId, senderId }: reactMeessageInterface, socket: SocketIO) =>
  async (dispatch: AppDispatch) => {
    try {
      socket.emit("message:reactMessage", { chatRoomId, message, receiverId, senderId })
      dispatch(chatRoomMessageAction.updateMessageReaction({ chatRoomId, userId: senderId, message }))
    } catch (error) {}
  }

//user action
export const onGroupSettingChangeHandler =
  ({ groupDetail, setting }: { groupDetail: { _id: string }; setting: groupSetting }) =>
  async (dispatch: AppDispatch) => {
    dispatch(chatUserListAction.updateGroupSetting({ _id: groupDetail._id, setting }))
  }

export const addNewMessageNotificationHandler =
  ({ _id }: { _id: string }) =>
  async (dispatch: AppDispatch) => {
    dispatch(
      chatUserListAction.addUserNotification({
        _id,
        notification: { notificationType: "newMessage", totalNotificationCount: 1, isAvailableNewNotification: true },
      }),
    )
  }

export const getIntialOnlineChatUsers = (socket: Socket) => async (dispatch: AppDispatch) => {
  try {
    socket.emit("status:getOnlineUsers", (onlineUsers) => {
      dispatch(chatUserListAction.addintialOnlineUsers({ onlineUsers }))
    })
  } catch (error) {}
}
