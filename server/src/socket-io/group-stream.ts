import { Server, Socket } from "socket.io"

const groupStreamSocketIo = (io:Server,socket:Socket) => {
socket.on('groupStream',() => {})
}

export default groupStreamSocketIo