import { Socket } from "socket.io";
//@ts-ignore
import { ClientToServerEvents, ServerToClientEvents } from "chit-chat-events";
import { DefaultEventsMap } from "socket.io/dist/typed-events";
//@ts-ignore
export type SocketIo =  Socket<ClientToServerEvents, ServerToClientEvents, DefaultEventsMap, any>