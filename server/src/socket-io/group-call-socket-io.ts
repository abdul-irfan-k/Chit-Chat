import { Server, Socket } from "socket.io"
import GroupCallRoomModel from "../model/mongoose/video-group-call-room-model.js"
import { getRedisSocketCached } from "../model/redis/redis.js"
import { v4 as uuidv4 } from "uuid"

const groupCallSocketIo = (io: Server, socket: Socket) => {
  socket.on(
    "groupCall:joinRequest",
    async ({ userId, referenceId, userName }: { userId: string; referenceId: string; userName: string }) => {
      try {
        const adminDetail = await GroupCallRoomModel.getAdminDetail({ referenceId })
        const adminSocket = await getRedisSocketCached(adminDetail.userId)
        socket
          .to(adminSocket.socketId)
          .emit("groupCall:userJoinRequest", { joinRequestedUserDetail: { userName, userId } })
      } catch (error) {}
    },
  )

  socket.on(
    "groupCall:joinRequestAccept",
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

        const receiverSocket = await getRedisSocketCached(acceptedJoinRequestUserDetail.userId)
        socket.join(`groupCall:${referenceId}`)
        socket.to(receiverSocket.socketId).emit("groupCall:joinRequestAccepted", {
          referenceId,
          peerId,
          adminId: groupCallRoom.adminId,
          callRoomId: groupCallRoom.callRoomId,
          adminDetail: {
            userId: groupCallRoom.adminId,
          },
          callInitiator: groupCallRoom.callInitiator,
          pinnedUsers: groupCallRoom.pinnedUsers,
          callRoomAvailableUsers: groupCallRoom.callRoomCurrentUsers,
        })

        socket.emit("groupCall:newUserJoined", { newUserDetail: { ...acceptedJoinRequestUserDetail, peerId } })
        // .to(`groupCall:${referenceId}`)
      } catch (error) {}
    },
  )

  socket.on("groupCall:joinRequestReject", () => {})
}

export default groupCallSocketIo
