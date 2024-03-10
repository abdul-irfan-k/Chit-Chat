import { ClientToServerMessageEvents, ServerToClientMessageEvents } from "./message-event/index"

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

export * from './message-event'