import { Server, Socket } from "socket.io"
import GroupCallRoomModel from "../model/mongoose/video-group-call-room-model.js"
import { getRedisSocketCached } from "../model/redis/redis.js"

const groupCallSocketIo = (io: Server, socket: Socket) => {
  socket.on(
    "groupCall:joinRequest",
    ({ userId, referenceId }: { userId: string; referenceId: string; userName: string }) => {
      try {
        const adminDetail = await GroupCallRoomModel.getAdminDetail({ referenceId })
        const adminSocket = getRedisSocketCached(adminDetail.userId)
        socket
          .to(adminSocket.socketId)
          .emit("groupCall:userJoinRequest", { joinRequestedUserDetail: { userName, userId } })
      } catch (error) {}
    },
  )

  socket.on("groupCall:joinRequestAccepted",(
    {    acceptedJoinRequestUserDetail,    userDetail,    referenceId  }
       :{    acceptedJoinRequestUserDetail: { userName: string; userId: string }
           userDetail: { userName: string; userId: string }    referenceId: string  }) => {
      try {
        GroupCallRoomModel.findOneAndUpdate({referenceId},{
          $push:{callRoomAllUsers:{userId:acceptedJoinRequestUserDetail.userId}}
        })
        const receiverSocket = getRedisSocketCached(acceptedJoinRequestUserDetail.userId)
        socket.to(receiverSocket.socketId).emit("groupCall:joinRequestAccepted",{referenceId})
      } catch (error) {}
    },
  )

  //   socket.on("groupCall:joinRequestRejected",() => {})
}

export default groupCallSocketIo