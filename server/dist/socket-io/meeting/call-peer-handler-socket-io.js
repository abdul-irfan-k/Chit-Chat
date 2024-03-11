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
const callPeerHandlerSocketIo = (io, socket) => {
    socket.on("call:peer:offerPeer", ({ receiverId, peerSdp, senderId }) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            console.log("offer peer", senderId, receiverId);
            const reciverSocket = yield getRedisSocketCached(receiverId);
            socket.to(reciverSocket.socketId).emit("call:peer:getOfferPeer", { peerSdp, senderId });
        }
        catch (error) {
            console.log(error);
        }
    }));
    socket.on("call:peer:offerAnswerPeer", ({ receiverId, senderId, peerSdp }) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            console.log("answer offer peer", senderId, receiverId);
            const reciverSocket = yield getRedisSocketCached(receiverId);
            socket.to(reciverSocket.socketId).emit("call:peer:getOfferAnswerPeer", { peerSdp, senderId, receiverId });
        }
        catch (error) {
            console.log(error);
        }
    }));
    socket.on("call:peer:sendIceCandidate", ({ receiverId, senderId, iceCandidate }) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            console.log("ice candidate", senderId, receiverId);
            const receiverSocket = yield getRedisSocketCached(receiverId);
            socket.to(receiverSocket.socketId).emit("call:peer:getIceCandidate", { receiverId, senderId, iceCandidate });
        }
        catch (error) {
            console.log(error);
        }
    }));
};
export default callPeerHandlerSocketIo;
