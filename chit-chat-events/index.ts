import { ClientToServerMessageEvents, ServerToClientMessageEvents } from "./message-event/index"

export interface ClientToServerEvents extends ClientToServerMessageEvents {}
export interface ServerToClientEvents extends ServerToClientMessageEvents {}

export * from "./message-event"
