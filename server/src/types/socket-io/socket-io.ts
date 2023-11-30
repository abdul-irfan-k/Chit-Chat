import { Socket } from "socket.io";
//@ts-ignore
import { ClientToServerEvents, ServerToClientEvents } from "../../../../socket-io-event-types/socket-io-event-types";
import { DefaultEventsMap } from "socket.io/dist/typed-events";

export type SocketIo =  Socket<ClientToServerEvents, ServerToClientEvents, DefaultEventsMap, any>