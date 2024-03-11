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
import CallRoomModel from "../../model/mongoose/meeting-model/meeting-model.js";
import { v4 as uuidv4 } from "uuid";
import mongoose from "mongoose";
const callSocketIo = (socket) => {
    socket.on("privateCall:intialise", ({ chatRoomId, userDetail, userName, receiverId }) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const videoCallRoom = yield CallRoomModel.initiateCallRoom({
                chatRoomId,
                userId: userDetail._id,
                callType: "videoCall",
            });
            const reciever = yield getRedisSocketCached(receiverId);
            socket.to(reciever.socketId).emit("privateCall:requestCallAccept", {
                callRoomId: videoCallRoom._id,
                chatRoomId,
                userDetail,
            });
        }
        catch (error) {
            console.log("error", error);
        }
    }));
    socket.on("privateCall:selfEnd", ({ callRoomId, userId }) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const callRoomObjectId = new mongoose.Types.ObjectId(callRoomId);
            yield CallRoomModel.findOneAndUpdate({ _id: callRoomObjectId }, { callStatus: "missedCall" });
        }
        catch (error) { }
    }));
    socket.on("privateCall:rejectRequest", (chatRoomId, userId) => __awaiter(void 0, void 0, void 0, function* () { }));
    socket.on("privateCall:acceptRequest", ({ callRoomId, userId }) => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        try {
            console.log("call room id", callRoomId);
            const updatedVideoCallRoom = yield CallRoomModel.addCallRoomUser({ callRoomId, userId });
            if (updatedVideoCallRoom == null)
                return console.log("no room found");
            console.log("updated video call room", updatedVideoCallRoom);
            const chatRoomUserDetails = yield updatedVideoCallRoom.participants.map((userId) => {
                const peerId = uuidv4();
                return {
                    userId,
                    peerId,
                };
            });
            (_a = updatedVideoCallRoom === null || updatedVideoCallRoom === void 0 ? void 0 : updatedVideoCallRoom.participants) === null || _a === void 0 ? void 0 : _a.forEach((userId) => __awaiter(void 0, void 0, void 0, function* () {
                const receiver = yield getRedisSocketCached(userId);
                if (receiver.socketId == socket.id) {
                    socket.emit("privateCall:start", {
                        callRoomId: updatedVideoCallRoom._id,
                        chatRoomId: updatedVideoCallRoom.chatRoomId,
                        callType: "videoCall",
                        callChannelType: "single",
                        callRoomUserDetails: chatRoomUserDetails,
                    });
                }
                else {
                    socket.to(receiver.socketId).emit("privateCall:start", {
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
export default callSocketIo;
