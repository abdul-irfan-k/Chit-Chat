import { Server, Socket } from "socket.io"
import GroupCallRoomModel from "../model/mongoose/video-group-call-room-model.js"
import { getRedisSocketCached } from "../model/redis/redis.js"
import { v4 as uuidv4 } from "uuid"

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

  socket.on(
    "groupCall:joinRequestAccepted",
    async ({
      acceptedJoinRequestUserDetail,
      userDetail,
      referenceId,
    }: {
      acceptedJoinRequestUserDetail: { userName: string; userId: string }
      userDetail: { userName: string; userId: string }
      referenceId: string
    }) => {
      try {
        const peerId = uuidv4()
        const groupCallRoom = await GroupCallRoomModel.findOneAndUpdate(
          { referenceId },
          {
            $push: {
              callRoomAllUsers: { userId: acceptedJoinRequestUserDetail.userId },
              callRoomAvailableusers: { userId: acceptedJoinRequestUserDetail.userId, peerId },
            },
          },
          { new: true },
        )
        if (groupCallRoom == null) return

        const receiverSocket = getRedisSocketCached(acceptedJoinRequestUserDetail.userId)
        socket.join(`groupCall:${referenceId}`)
        socket.to(receiverSocket.socketId).emit("groupCall:joinRequestAccepted", {
          referenceId,
          peerId,
          adminDetail: groupCallRoom.adminDetail,
          callRoomId: groupCallRoom.callRoomId,
          callInitiator: groupCallRoom.callInitiator,
          pinnedUsers: groupCallRoom.pinnedUsers,
          callRoomAvailableUsers: groupCallRoom.callRoomAvailableUsers,
        })

        socket
          .to(`groupCall:${referenceId}`)
          .emit("groupCall:newuserJoined", { newUserDetail: { acceptedJoinRequestUserDetail } })
      } catch (error) {}
    },
  )

  //   socket.on("groupCall:joinRequestRejected",() => {})
}

export default groupCallSocketIo
