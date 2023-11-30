interface messageSourceAndDestinationDetail {
  receiverId: string
  senderId: string
  chatRoomId: string
}
interface newImageMessageInterface extends messageSourceAndDestinationDetail {
  message: {
    filePath: string
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

interface ClientToServerMessageEvents {
  "message:newImageMessage": (messageDetails: newImageMessageInterface) => void
  "message:newMessage": (messageDetails: newMessageInterface) => void
  "message:newAudioMessage": (messageDetails: newAudiomessageDetails) => void
}
interface ServerToClientMessageEvents {
  "message:receiveMessage": (messageDetails: newMessageInterface) => void
  "message:recieveNewImageMessage": (messageDetails: newImageMessageInterface) => void
}

export interface ClientToServerEvents extends ClientToServerMessageEvents {}
export interface ServerToClientEvents extends ServerToClientMessageEvents {}
