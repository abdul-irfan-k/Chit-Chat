var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import GroupCallRoomModel from "../../model/mongoose/meeting-model/video-group-call-room-model.js";
import { getRedisSocketCached } from "../../model/redis/redis.js";
import { v4 as uuidv4 } from "uuid";
const groupCallSocketIo = (io, socket) => {
    socket.on("groupCall:joinRequest", ({ userId, referenceId, userName }) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const adminDetail = yield GroupCallRoomModel.getAdminDetail({ referenceId });
            const adminSocket = yield getRedisSocketCached(adminDetail.userId);
            socket
                .to(adminSocket.socketId)
                .emit("groupCall:userJoinRequest", { joinRequestedUserDetail: { userName, userId } });
        }
        catch (error) { }
    }));
    socket.on("groupCall:joinRequestAccept", ({ acceptedJoinRequestUserDetail, userDetail, referenceId, }) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const peerId = uuidv4();
            const groupCallRoom = yield GroupCallRoomModel.findOneAndUpdate({ referenceId }, {
                $push: {
                    callRoomAllUsers: { userId: acceptedJoinRequestUserDetail.userId },
                    callRoomAvailableusers: { userId: acceptedJoinRequestUserDetail.userId, peerId },
                },
            }, { new: true });
            if (groupCallRoom == null)
                return;
            const receiverSocket = yield getRedisSocketCached(acceptedJoinRequestUserDetail.userId);
            socket.join(`groupCall:${referenceId}`);
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
            });
            socket.emit("groupCall:newUserJoined", { newUserDetail: Object.assign(Object.assign({}, acceptedJoinRequestUserDetail), { peerId }) });
            // .to(`groupCall:${referenceId}`)
        }
        catch (error) { }
    }));
    socket.on("groupCall:joinRequestReject", () => { });
};
export default groupCallSocketIo;
