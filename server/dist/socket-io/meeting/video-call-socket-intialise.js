var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { getRedisSocketCached } from "../../model/redis/redis.js";
import VideoCallRoomModel from "../../model/mongoose/meeting-model/video-call-room-model.js";
import { v4 as uuidv4 } from "uuid";
const videoCallIntialiseSocketIo = (io, socket) => {
    socket.on("videoCall:intialise", ({ chatRoomId, userDetail, userName, receiverId }) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const videoCallRoom = yield VideoCallRoomModel.initiateVideoCallRoom({ chatRoomId, userId: userDetail._id });
            const reciever = yield getRedisSocketCached(receiverId);
            socket.to(reciever.socketId).emit("videoCall:requestCallAccept", {
                callRoomId: videoCallRoom._id,
                chatRoomId,
                userDetail,
            });
        }
        catch (error) {
            console.log("error", error);
        }
    }));
    socket.on("videoCall:selfEnd", () => __awaiter(void 0, void 0, void 0, function* () { }));
    socket.on("videoCall:rejectRequest", (chatRoomId, userId) => __awaiter(void 0, void 0, void 0, function* () { }));
    socket.on("videoCall:acceptRequest", ({ callRoomId, userId }) => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        try {
            const updatedVideoCallRoom = yield VideoCallRoomModel.addVideoCallRoomUser({ callRoomId, userId });
            if (updatedVideoCallRoom == null)
                return console.log("no room found");
            const chatRoomUserDetails = yield updatedVideoCallRoom.userIds.map((userId) => {
                const peerId = uuidv4();
                return {
                    userId,
                    peerId,
                };
            });
            (_a = updatedVideoCallRoom === null || updatedVideoCallRoom === void 0 ? void 0 : updatedVideoCallRoom.userIds) === null || _a === void 0 ? void 0 : _a.forEach((userId) => __awaiter(void 0, void 0, void 0, function* () {
                const receiver = yield getRedisSocketCached(userId);
                if (receiver.socketId == socket.id) {
                    socket.emit("videoCall:start", {
                        callRoomId: updatedVideoCallRoom._id,
                        chatRoomId: updatedVideoCallRoom.chatRoomId,
                        callType: "videoCall",
                        callChannelType: "single",
                        callRoomUserDetails: chatRoomUserDetails,
                    });
                }
                else {
                    socket.to(receiver.socketId).emit("videoCall:start", {
                        callRoomId: updatedVideoCallRoom._id,
                        callRoomUserDetails: chatRoomUserDetails,
                    });
                }
            }));
        }
        catch (error) {
            console.log(error);
        }
    }));
};
export default videoCallIntialiseSocketIo;
