export type messageEmitCallBackArgs = { isSent: boolean; status?: "ok" }
export type messageEmitCallBack = (response: messageEmitCallBackArgs) => void

export interface PrivateMessageBasicDetail {
  receiverId: string
  senderId: string
  chatRoomId: string
}
export interface GroupMessageBasicDetail {
  groupId: string
  senderId: string
  chatRoomId: string
}

interface PrivateNewImageMessageArgs extends PrivateMessageBasicDetail {
  message: {
    imageSource: string
    _id?: string
  }
}
interface PrivateNewMultipleImageMessageArgs extends PrivateMessageBasicDetail {
  message: {
    imageSources: string[]
    _id?: string
  }[]
}
interface PrivateNewTextMessageArgs extends PrivateMessageBasicDetail {
  message: {
    messageContent: string
    _id?: string
  }
}
interface PrivateAudioMessageArgs extends PrivateMessageBasicDetail {
  message: {
    audioBuffer: Buffer
    _id?: string
  }
}

interface PrivateNewAudioMessageArgs extends PrivateMessageBasicDetail {
  message: {
    file: string
    _id?: string
  }
}
interface PrivateNewVideoMessageArgs extends PrivateMessageBasicDetail {
  message: {
    videoMessageSrc: string
    _id: string
  }
}

interface groupNewTextMessageArgs extends GroupMessageBasicDetail {
  message: {
    messageContent: string
    _id?: string
  }
}
interface groupAudioMessageArgs extends GroupMessageBasicDetail {
  message: {
    file: Buffer
    _id?: string
  }
}
interface groupNewAudioMessageArgs extends GroupMessageBasicDetail {
  message: {
    file: string
    _id?: string
  }
}
interface groupNewMultipleImageMessageArgs extends GroupMessageBasicDetail {
  message: {
    imageMessageSrc: string[]
    _id?: string
  }[]
}

export interface groupNewPollMessageArgs extends GroupMessageBasicDetail {
  message: {
    title: string
    options: {
      title: string
    }[]
    _id?: string
  }
}

export interface groupNewImageMessageArgs extends GroupMessageBasicDetail {
  message: {
    filepath: string
    _id?: string
  }
}

interface groupPollMessageVoteUpdateArgs extends GroupMessageBasicDetail {
  message: {
    _id: string
    selectedOption: {
      _id: string
      currentVotingStatus: boolean
    }
  }
}

export type MessageType = "Text" | "Voice" | "Image" | "Video" | "Poll"

export interface deleteMessageArgs extends PrivateMessageBasicDetail {
  message: {
    _id: string
    messageType: Exclude<MessageType, "Poll">
  }
}

interface deleteGroupMessageArgs extends GroupMessageBasicDetail {
  message: {
    _id: string
    messageType: MessageType
  }
}
export interface reactMessage extends PrivateMessageBasicDetail {
  message: {
    _id: string
    emojiId: string
    emoji: string
  }
}

export interface PrivateMessageArgs {
  AudioMessageSend: PrivateAudioMessageArgs
  ImageMessage: PrivateNewImageMessageArgs
  MultipleImageMessage: PrivateNewMultipleImageMessageArgs
  TextMessage: PrivateNewTextMessageArgs
  AudioMessage: PrivateNewAudioMessageArgs
  VideoMessage: PrivateNewVideoMessageArgs
}

export interface PrivateMessageActionArgs {
  deleteMessage: deleteMessageArgs
  reactMessage: reactMessage
}

export interface groupMessageArgs {
  AudioMessageSend: groupAudioMessageArgs
  ImageMessage: groupNewImageMessageArgs
  MultipleImageMessage: groupNewMultipleImageMessageArgs
  TextMessage: groupNewTextMessageArgs
  AudioMessage: groupNewAudioMessageArgs
  VideoMessage: PrivateNewVideoMessageArgs
  PollMessage: groupNewPollMessageArgs
}

export interface groupMessageActionArgs {
  pollMessageVoteUpdate: groupPollMessageVoteUpdateArgs
  deleteMessage: deleteGroupMessageArgs
}

interface ClientToServerPrivateMessageEvents {
  "message:newTextMessage": (messageDetails: PrivateMessageArgs["TextMessage"], callback?: messageEmitCallBack) => void
  "message:newAudioMessage": (
    messageDetails: PrivateMessageArgs["AudioMessage"],
    callback?: messageEmitCallBack,
  ) => void
  "message:newVideoMessage": (
    messageDetails: PrivateMessageArgs["VideoMessage"],
    callback?: messageEmitCallBack,
  ) => void
  "message:newImageMessage": (
    messageDetails: PrivateMessageArgs["ImageMessage"],
    callback?: messageEmitCallBack,
  ) => void
  "message:newMultipleImageMessage": (
    messageDetail: PrivateMessageArgs["MultipleImageMessage"],
    callback?: messageEmitCallBack,
  ) => void
  "message:reactMessage": (
    messageDetails: PrivateMessageActionArgs["reactMessage"],
    callback?: messageEmitCallBack,
  ) => void
  "message:deleteMessage": (
    messageDetails: PrivateMessageActionArgs["deleteMessage"],
    callback?: messageEmitCallBack,
  ) => void
}

interface ClientToServerGroupMessageEvents {
  "groupMessage:newTextMessage": (
    messageDetails: groupMessageArgs["TextMessage"],
    callback?: messageEmitCallBack,
  ) => void
  "groupMessage:newAudioMessage": (
    messageDetails: groupMessageArgs["AudioMessage"],
    callback?: messageEmitCallBack,
  ) => void
  "groupMessage:newImageMessage": (
    messageDetails: groupMessageArgs["ImageMessage"],
    callback?: messageEmitCallBack,
  ) => void
  "groupMessage:newPollMessage": (
    messageDetails: groupMessageArgs["PollMessage"],
    callback?: messageEmitCallBack,
  ) => void

  "groupMessage:pollMessageVoteUpdate": (
    messageDetails: groupMessageActionArgs["pollMessageVoteUpdate"],
    callback?: messageEmitCallBack,
  ) => void
  "groupMessage:deleteMessage": (messageDetails: deleteGroupMessageArgs) => void
}

export interface ClientToServerMessageEvents
  extends ClientToServerPrivateMessageEvents,
    ClientToServerGroupMessageEvents {}
export interface ServerToClientMessageEvents {
  "message:receiveTextMessage": (messageDetails: PrivateMessageArgs["TextMessage"]) => void
  "message:recieveNewImageMessage": (messageDetails: PrivateMessageArgs["ImageMessage"]) => void
  "message:receiveVideoMessage": (messageDetails: PrivateMessageArgs["VideoMessage"]) => void
  "message:receiveAudioMessage": (messageDetails: PrivateMessageArgs["AudioMessage"]) => void
  "message:receiveMultipleImageMessage": (messageDetail: PrivateMessageArgs["MultipleImageMessage"]) => void

  "groupMessage:receiveTextMessage": (messageDetails: groupMessageArgs["TextMessage"]) => void
  "groupMessage:receiveAudioMessage": (messageDetails: groupMessageArgs["AudioMessage"]) => void
  "groupMessage:receiveImageMessage": (messageDetails: groupMessageArgs["ImageMessage"]) => void
  "groupMessage:receivePollMessage": (messageDetails: groupMessageArgs["PollMessage"]) => void
  "groupMessage:receiveVideoMessage": (messageDetails: groupMessageArgs["VideoMessage"]) => void
  "groupMessage:receiveMultipleImageMessage": (messageDetail: groupMessageArgs["MultipleImageMessage"]) => void

  "message:deleteMessage": (response: PrivateMessageActionArgs["deleteMessage"]) => void
  "groupMessage:deleteMessage": (response: groupMessageActionArgs["deleteMessage"]) => void
}
