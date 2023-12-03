import { SocketClient } from "@/socket-io-client/socket"
import { Socket } from "socket.io-client"

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
interface newMessageInterface extends messageSourceAndDestinationDetail {
  message: string
}
interface newAudiomessageDetails extends messageSourceAndDestinationDetail {
  message: {
    file: Buffer
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

interface ClientToServerMessageEvents {
  "message:newImageMessage": (messageDetails: newImageMessageInterface) => void
  "message:newMessage": (messageDetails: newMessageInterface) => void
  "message:newAudioMessage": (messageDetails: newAudiomessageDetails) => void
  // "groupMessage:newTextMessage"

  "groupMessage:newTextMessage": (messageDetails: groupNewTextMessageInterface) => void
  "groupMessage:newAudioMessage": (messageDetails: groupNewAudioMessageInterface) => void
  "groupMessage:newPollMessage": (messageDetails: groupNewPollMessageInterface) => void

  "groupMessage:pollMessageVoteUpdate": (messageDetails: pollMessageVoteUpdateInterface) => void
}
interface ServerToClientMessageEvents {
  "message:receiveMessage": (messageDetails: newMessageInterface) => void
  "message:recieveNewImageMessage": (messageDetails: newImageMessageInterface) => void

  "groupMessage:receiveTextMessage": (messageDetails: groupNewTextMessageInterface) => void
  "groupMessage:receiveAudioMessage": (messageDetails: groupNewAudioMessageInterface) => void
  "groupMessage:receivePollMessage": (messageDetails: groupNewPollMessageInterface) => void
}

export interface ClientToServerEvents extends ClientToServerMessageEvents {}
export interface ServerToClientEvents extends ServerToClientMessageEvents {}

export type SocketIO = SocketClient | Socket<ServerToClientEvents, ClientToServerEvents>
