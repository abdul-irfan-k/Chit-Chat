import { Server, Socket } from "socket.io";

const userStreamSocketIo = (io:Server, socket:Socket) => {
   socket.on('userStream/intialiseStream',() => {})
}

export default userStreamSocketIo