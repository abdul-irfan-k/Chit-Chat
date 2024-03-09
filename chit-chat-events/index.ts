interface messageSourceAndDestinationDetail {
  receiverId: string
  senderId: string
  chatRoomId: string
}
interface newImageMessageInterface extends messageSourceAndDestinationDetail {
  message: {
    imageMessageSrc: string
  }
}
interface newTextMessageInterface extends messageSourceAndDestinationDetail {
  message: string
}
interface newAudiomessage extends messageSourceAndDestinationDetail {
  message: {
    file: Buffer
  }
}

interface reciveAudioMessageInterface extends messageSourceAndDestinationDetail {
  message: {
    file: string
  }
}
interface newVideoMessageInterface extends messageSourceAndDestinationDetail {
  message: {
    videoMessageSrc: string
  }
}

export interface groupMessageSourceAndDestinationDetail {
  senderId: string
  chatRoomId: string
  groupDetail: {
    _id: string
  }
}
interface groupNewTextMessageInterface extends groupMessageSourceAndDestinationDetail {
  message: {
    messageContent: string
  }
}
interface groupNewAudioMessageInterface extends groupMessageSourceAndDestinationDetail {
  message: {
    file: Buffer
  }
}

export interface groupNewPollMessageInterface extends groupMessageSourceAndDestinationDetail {
  message: {
    title: string
    options: {
      title: string
    }[]
  }
}

export interface groupNewImageMessageInterface extends groupMessageSourceAndDestinationDetail {
  message: {
    filepath: string
  }
}

interface pollMessageVoteUpdateInterface extends groupMessageSourceAndDestinationDetail {
  message: {
    _id: string
    selectedOption: {
      _id: string
      currentVotingStatus: boolean
    }
  }
}

export interface deleteMessageInterface extends messageSourceAndDestinationDetail {
  message: {
    _id: string
    messageType: "textMessage" | "voiceMessage" | "imageMessage" | "pollMessage" | "videoMessage"
  }
}
export type testing = "test"
interface deleteGroupMessageInterface extends groupMessageSourceAndDestinationDetail {
  message: {
    _id: string
    messageType: "textMessage" | "voiceMessage" | "imageMessage" | "pollMessage" | "videoMessage"
  }
}
export interface reactMeessageInterface extends messageSourceAndDestinationDetail {
  message: {
    _id: string
    emojiId: string
    emoji: string
  }
}

interface ClientToServerMessageEvents {
  "message:newImageMessage": (messageDetails: newImageMessageInterface) => void
  "message:newMessage": (messageDetails: newTextMessageInterface) => void
  "message:newAudioMessage": (messageDetails: newAudiomessage) => void
  "message:newVideoMessage": (messageDetails: newVideoMessageInterface) => void
  "message:reactMessage": (messageDetails: reactMeessageInterface) => void
  // "groupMessage:newTextMessage"

  "groupMessage:newTextMessage": (messageDetails: groupNewTextMessageInterface) => void
  "groupMessage:newAudioMessage": (messageDetails: groupNewAudioMessageInterface) => void
  "groupMessage:newPollMessage": (messageDetails: groupNewPollMessageInterface) => void
  "groupMessage:newImageMessage": (messageDetails: groupNewImageMessageInterface) => void

  "groupMessage:pollMessageVoteUpdate": (messageDetails: pollMessageVoteUpdateInterface) => void

  "message:deleteMessage": (messageDetails: deleteMessageInterface) => void
  "groupMessage:deleteMessage": (messageDetails: deleteMessageInterface) => void
}
interface ServerToClientMessageEvents {
  "message:receiveMessage": (messageDetails: newTextMessageInterface) => void
  "message:recieveNewImageMessage": (messageDetails: newImageMessageInterface) => void
  "message:receiveVideoMessage": (messageDetails: newVideoMessageInterface) => void
  "message:receiveAudioMessage": (messageDetails: reciveAudioMessageInterface) => void

  "groupMessage:receiveTextMessage": (messageDetails: groupNewTextMessageInterface) => void
  "groupMessage:receiveAudioMessage": (messageDetails: reciveAudioMessageInterface) => void
  "groupMessage:receivePollMessage": (messageDetails: groupNewPollMessageInterface) => void
  "groupMessage:receiveImageMessage": (messageDetails: groupNewImageMessageInterface) => void

  "message:deleteMessage": (response: deleteMessageInterface) => void
  "groupMessage:deleteMessage": () => void
}

interface groupAndSenderDetail {
  senderId: string
  chatRoomId: string
  groupDetail: {
    _id: string
  }
}
interface groupSetting {
  isAdminOnlySendMessage: boolean
  isAllowedJoinByUrl: boolean
  isHidingMembersNumber: boolean
}

interface groupUpdateSetting extends groupAndSenderDetail {
  setting: groupSetting
}
interface ClientToServerGroupHandlerEvents {
  "group:updateSetting": (args: groupUpdateSetting) => void
}
interface ServerToClientGroupHandlerEvents {
  "group:onUpdateSetting": (args: groupUpdateSetting) => void
}

export interface ClientToServerEvents extends ClientToServerMessageEvents, ClientToServerGroupHandlerEvents {}
export interface ServerToClientEvents extends ServerToClientMessageEvents, ServerToClientGroupHandlerEvents {}
