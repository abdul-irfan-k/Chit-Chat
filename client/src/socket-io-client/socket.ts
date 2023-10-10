import { Socket, io } from "socket.io-client"

const serverPort = process.env.SERVER_PORT || 8000
// const serverUrl = process.env.NODE_ENV === 'production'? process.env.SERVER_URL : `http://localhost:${serverPort}`
const serverUrl = `http://localhost:${serverPort}`

// export const Socket = io(serverUrl)
export const Socket = io(serverUrl)

Socket.on('message:receiveMessage',(val) => {
    console.log('message ',val)
})


export class SocketClient {
    socket?:Socket
    connect(){
        return new Promise((resolve,reject) => {
            this.socket =  io(serverUrl)

            this.socket?.on('connect',() => resolve())
            this.socket?.on('connect_error',() => reject())
        })
    }

    emit(event:string,data:any){
        return new Promise((resolve,reject) => {
            this.socket?.emit(event,data)
            return resolve()
        })
    }

    on(event:string,callback:() => any){
    return new Promise((resolve,reject) => {
        this.socket?.on(event,callback)
    })
    }
}