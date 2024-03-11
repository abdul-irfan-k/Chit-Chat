export type messageEmitCallBackArgs = { isSended: boolean; status?: "ok" }
export type messageEmitCallBack = (response: messageEmitCallBackArgs) => void

export interface privateMessageBasicDetail {
  receiverDetails: {
    _id: string
  }
  senderDetails: {
    _id: string
    name: string
    profileImageUrl: string
  }
  chatRoomDetail: {
    _id: string
  }
  messageChannelType: "private"
}
export interface groupMessageBasicDetail {
  groupDetails: {
    _id: string
  }
  senderDetails: {
    _id: string
    name: string
    profileImageUrl: string
  }
  chatRoomDetail: {
    _id: string
  }
  messageChannelType: "group"
}

interface privateNewImageMessageArgs extends privateMessageBasicDetail {
  message: {
    imageMessageSrc: string
    _id?: string
  }
}
interface privateNewMultipleImageMessageArgs extends privateMessageBasicDetail {
  message: {
    imageMessageSrc: string[]
    _id?: string
  }
}
interface privateNewTextMessageArgs extends privateMessageBasicDetail {
  message: {
    messageContent: string
    _id?: string
  }
}
interface privateAudioMessageArgs extends privateMessageBasicDetail {
  message: {
    file: Buffer
    _id?: string
  }
}

interface privateNewAudioMessageArgs extends privateMessageBasicDetail {
  message: {
    file: string
    _id?: string
  }
}
interface privateNewVideoMessageArgs extends privateMessageBasicDetail {
  message: {
    videoMessageSrc: string
    _id: string
  }
}

interface groupNewTextMessageArgs extends groupMessageBasicDetail {
  message: {
    messageContent: string
    _id?: string
  }
}
interface groupAudioMessageArgs extends groupMessageBasicDetail {
  message: {
    file: Buffer
    _id?: string
  }
}
interface groupNewAudioMessageArgs extends groupMessageBasicDetail {
  message: {
    file: string
    _id?: string
  }
}
interface groupNewMultipleImageMessageArgs extends groupMessageBasicDetail {
  message: {
    imageMessageSrc: string[]
    _id?: string
  }
}

export interface groupNewPollMessageArgs extends groupMessageBasicDetail {
  message: {
    title: string
    options: {
      title: string
    }[]
    _id?: string
  }
}

export interface groupNewImageMessageArgs extends groupMessageBasicDetail {
  message: {
    filepath: string
    _id?: string
  }
}

interface groupPollMessageVoteUpdateArgs extends groupMessageBasicDetail {
  message: {
    _id: string
    selectedOption: {
      _id: string
      currentVotingStatus: boolean
    }
  }
}

export interface deleteMessageArgs extends privateMessageBasicDetail {
  message: {
    _id: string
    messageType: "textMessage" | "voiceMessage" | "imageMessage" | "pollMessage" | "videoMessage"
  }
}

interface deleteGroupMessageArgs extends groupMessageBasicDetail {
  message: {
    _id: string
    messageType: "textMessage" | "voiceMessage" | "imageMessage" | "pollMessage" | "videoMessage"
  }
}
export interface reactMessage extends privateMessageBasicDetail {
  message: {
    _id: string
    emojiId: string
    emoji: string
  }
}

export interface privateMessageArgs {
  AudioMessageSend: privateAudioMessageArgs
  ImageMessage: privateNewImageMessageArgs
  MultipleImageMessage: privateNewMultipleImageMessageArgs
  TextMessage: privateNewTextMessageArgs
  AudioMessage: privateNewAudioMessageArgs
  VideoMessage: privateNewVideoMessageArgs
}

export interface privateMessageActionArgs {
  deleteMessage: deleteGroupMessageArgs
  reactMessage: reactMessage
}

export interface groupMessageArgs {
  AudioMessageSend: groupAudioMessageArgs
  ImageMessage: groupNewImageMessageArgs
  MultipleImageMessage: groupNewMultipleImageMessageArgs
  TextMessage: groupNewTextMessageArgs
  AudioMessage: groupNewAudioMessageArgs
  VideoMessage: privateNewVideoMessageArgs
  PollMessage: groupNewPollMessageArgs
}

export interface groupMessageActionArgs {
  pollMessageVoteUpdate: groupPollMessageVoteUpdateArgs
  deleteMessage: deleteGroupMessageArgs
}

interface ClientToServerPrivateMessageEvents {
  "message:newTextMessage": (messageDetails: privateMessageArgs["TextMessage"], callback?: messageEmitCallBack) => void
  "message:newAudioMessage": (
    messageDetails: privateMessageArgs["AudioMessage"],
    callback?: messageEmitCallBack,
  ) => void
  "message:newVideoMessage": (
    messageDetails: privateMessageArgs["VideoMessage"],
    callback?: messageEmitCallBack,
  ) => void
  "message:newImageMessage": (
    messageDetails: privateMessageArgs["ImageMessage"],
    callback?: messageEmitCallBack,
  ) => void
  "message:newMultipleImageMessage": (
    messageDetail: privateMessageArgs["MultipleImageMessage"],
    callback?: messageEmitCallBack,
  ) => void
  "message:reactMessage": (
    messageDetails: privateMessageActionArgs["reactMessage"],
    callback?: messageEmitCallBack,
  ) => void
  "message:deleteMessage": (
    messageDetails: privateMessageActionArgs["deleteMessage"],
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
  "groupMessage:deleteMessage": (
    messageDetails: groupMessageActionArgs["deleteMessage"],
    callback?: messageEmitCallBack,
  ) => void
}

export interface ClientToServerMessageEvents
  extends ClientToServerPrivateMessageEvents,
    ClientToServerGroupMessageEvents {}

export interface ServerToClientMessageEvents {
  "message:receiveTextMessage": (messageDetails: privateMessageArgs["TextMessage"]) => void
  "message:recieveNewImageMessage": (messageDetails: privateMessageArgs["ImageMessage"]) => void
  "message:receiveVideoMessage": (messageDetails: privateMessageArgs["VideoMessage"]) => void
  "message:receiveAudioMessage": (messageDetails: privateMessageArgs["AudioMessage"]) => void
  "message:receiveMultipleImageMessage": (messageDetail: privateMessageArgs["MultipleImageMessage"]) => void

  "groupMessage:receiveTextMessage": (messageDetails: groupMessageArgs["TextMessage"]) => void
  "groupMessage:receiveAudioMessage": (messageDetails: groupMessageArgs["AudioMessage"]) => void
  "groupMessage:receiveImageMessage": (messageDetails: groupMessageArgs["ImageMessage"]) => void
  "groupMessage:receivePollMessage": (messageDetails: groupMessageArgs["PollMessage"]) => void
  "groupMessage:receiveVideoMessage": (messageDetails: groupMessageArgs["VideoMessage"]) => void
  "groupMessage:receiveMultipleImageMessage": (messageDetail: groupMessageArgs["MultipleImageMessage"]) => void

  "message:deleteMessage": (response: privateMessageActionArgs["deleteMessage"]) => void
  "groupMessage:deleteMessage": (response: groupMessageActionArgs["deleteMessage"]) => void
}
