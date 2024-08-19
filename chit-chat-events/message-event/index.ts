export type messageEmitCallBackArgs = { isSent: boolean; isReached: boolean }
export type messageEmitCallBack = (response: messageEmitCallBackArgs) => void

export interface PrivateMessageBasicDetail {
  receiverId: string
  senderId: string
  chatRoomId: string
  messageChannelType: "private"
}
export interface GroupMessageBasicDetail {
  groupId: string
  senderId: string
  chatRoomId: string
  messageChannelType: "group"
}

interface ImageMessageArgs {
  message: {
    imageSrc: string
    _id: string
  }
}
interface MultipleImageMessageArgs {
  message: {
    imageSrcs: string[]
    _id: string
  }[]
}
interface TextMessageArgs {
  message: {
    content: string
    _id: string
  }
}
interface AudioBufferMessageArgs {
  message: {
    audioBuffer: Buffer
    _id: string
  }
}

interface AudioFileMessageArgs {
  message: {
    audioSrc: string
    _id: string
  }
}
interface VideoMessageArgs {
  message: {
    videoSrc: string
    _id: string
  }
}

interface PollMessageArgs {
  message: {
    title: string
    options: {
      title: string
      _id: string
      votedMembers: {
        userId: string
      }[]
    }[]
    _id: string
  }
}

type MessageType = "Text" | "Voice" | "Image" | "Video" | "Poll"

export interface deleteMessageArgs {
  message: {
    _id: string
    messageType: Exclude<MessageType, "Poll">
  }
}

interface deleteGroupMessageArgs {
  message: {
    _id: string
    messageType: MessageType
  }
}
export interface reactMessage {
  message: {
    _id: string
    emojiId: string
    emoji: string
  }
}

export interface PrivateMessageArgs {
  AudioMessageSend: AudioBufferMessageArgs & PrivateMessageBasicDetail
  ImageMessage: ImageMessageArgs & PrivateMessageBasicDetail
  MultipleImageMessage: MultipleImageMessageArgs & PrivateMessageBasicDetail
  TextMessage: TextMessageArgs & PrivateMessageBasicDetail
  AudioMessage: AudioFileMessageArgs & PrivateMessageBasicDetail
  VideoMessage: VideoMessageArgs & PrivateMessageBasicDetail
}

export interface PrivateMessageActionArgs {
  deleteMessage: deleteMessageArgs & PrivateMessageBasicDetail
  reactMessage: reactMessage & PrivateMessageBasicDetail
}

export interface GroupMessageArgs {
  AudioMessageSend: AudioBufferMessageArgs & GroupMessageBasicDetail
  ImageMessage: ImageMessageArgs & GroupMessageBasicDetail
  MultipleImageMessage: MultipleImageMessageArgs & GroupMessageBasicDetail
  TextMessage: TextMessageArgs & GroupMessageBasicDetail
  AudioMessage: AudioFileMessageArgs & GroupMessageBasicDetail
  VideoMessage: VideoMessageArgs & GroupMessageBasicDetail
  PollMessage: PollMessageArgs & GroupMessageBasicDetail
}

export interface GroupMessageActionArgs {
  deleteMessage: deleteGroupMessageArgs & GroupMessageBasicDetail
  reactMessage: reactMessage & GroupMessageBasicDetail
  pollMessageVoteUpdate: groupPollMessageVoteUpdateArgs
}

type ExcludeMessageChannelType<T> = Omit<T, "messageChannelType">
interface ClientToServerPrivateMessageEvents {
  "message:newTextMessage": (messageDetails: PrivateMessageArgs["TextMessage"], callback?: messageEmitCallBack) => void
  "message:newAudioMessage": (
    messageDetails: PrivateMessageArgs["AudioMessageSend"],
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
    messageDetails: GroupMessageArgs["TextMessage"],
    callback?: messageEmitCallBack,
  ) => void
  "groupMessage:newAudioMessage": (
    messageDetails: GroupMessageArgs["AudioMessageSend"],
    callback?: messageEmitCallBack,
  ) => void
  "groupMessage:newImageMessage": (
    messageDetails: GroupMessageArgs["ImageMessage"],
    callback?: messageEmitCallBack,
  ) => void
  "groupMessage:newVideoMessage": (
    messageDetails: GroupMessageArgs["VideoMessage"],
    callback?: messageEmitCallBack,
  ) => void
  "groupMessage:newPollMessage": (
    messageDetails: GroupMessageArgs["PollMessage"],
    callback?: messageEmitCallBack,
  ) => void

  "groupMessage:pollMessageVoteUpdate": (
    messageDetails: GroupMessageActionArgs["pollMessageVoteUpdate"],
    callback?: messageEmitCallBack,
  ) => void
  "groupMessage:deleteMessage": (messageDetails: GroupMessageActionArgs["deleteMessage"]) => void
  "groupMessage:reactMessage": (messageDetails: GroupMessageActionArgs["reactMessage"]) => void
}

export interface ClientToServerMessageEvents
  extends ClientToServerPrivateMessageEvents,
    ClientToServerGroupMessageEvents {}
export interface ServerToClientMessageEvents {
  "message:receiveTextMessage": (messageDetails: ExcludeMessageChannelType<PrivateMessageArgs["TextMessage"]>) => void
  "message:recieveNewImageMessage": (
    messageDetails: ExcludeMessageChannelType<PrivateMessageArgs["ImageMessage"]>,
  ) => void
  "message:receiveVideoMessage": (messageDetails: ExcludeMessageChannelType<PrivateMessageArgs["VideoMessage"]>) => void
  "message:receiveAudioMessage": (messageDetails: ExcludeMessageChannelType<PrivateMessageArgs["AudioMessage"]>) => void
  "message:receiveMultipleImageMessage": (
    messageDetail: ExcludeMessageChannelType<PrivateMessageArgs["MultipleImageMessage"]>,
  ) => void

  "groupMessage:receiveTextMessage": (
    messageDetails: ExcludeMessageChannelType<GroupMessageArgs["TextMessage"]>,
  ) => void
  "groupMessage:receiveAudioMessage": (
    messageDetails: ExcludeMessageChannelType<GroupMessageArgs["AudioMessage"]>,
  ) => void
  "groupMessage:receiveImageMessage": (
    messageDetails: ExcludeMessageChannelType<GroupMessageArgs["ImageMessage"]>,
  ) => void
  "groupMessage:receivePollMessage": (
    messageDetails: ExcludeMessageChannelType<GroupMessageArgs["PollMessage"]>,
  ) => void
  "groupMessage:receiveVideoMessage": (
    messageDetails: ExcludeMessageChannelType<GroupMessageArgs["VideoMessage"]>,
  ) => void
  "groupMessage:receiveMultipleImageMessage": (
    messageDetail: ExcludeMessageChannelType<GroupMessageArgs["MultipleImageMessage"]>,
  ) => void

  "message:deleteMessage": (response: PrivateMessageActionArgs["deleteMessage"]) => void
  "groupMessage:deleteMessage": (response: GroupMessageActionArgs["deleteMessage"]) => void
}
