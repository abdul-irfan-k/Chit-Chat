var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { getSocketIp } from "../../util/socket.js";
import SocketModel from "../../model/mongoose/socket-model.js";
import mongoose from "mongoose";
import { removeRedisSocketCachedData } from "../../model/redis/redis.js";
import ConnectionModel from "../../model/mongoose/connections-model.js";
export const userSocketIntialization = (socket) => __awaiter(void 0, void 0, void 0, function* () {
    const ip = getSocketIp(socket);
    socket.on("socket:join", ({ userId }) => __awaiter(void 0, void 0, void 0, function* () {
        console.log("join", socket.id);
        // const id = new mongoose.Types.ObjectId(_id)
        yield SocketModel.create({
            socketId: socket.id,
            ip,
            userId,
        });
        // joining the group room
        const userObjectId = new mongoose.Types.ObjectId(userId);
        const joinRequiredGroups = yield ConnectionModel.findOne({ userId: userObjectId });
        if (joinRequiredGroups == null)
            return;
        joinRequiredGroups.groups.forEach((group) => {
            socket.join(`group:${group.groupId}`);
        });
    }));
    socket.on("disconnect", () => __awaiter(void 0, void 0, void 0, function* () {
        console.log("disconnect");
        const socketData = yield SocketModel.findOne({ socketId: socket.id });
        if (socketData != null)
            yield removeRedisSocketCachedData(`socket:${socketData.userId}`);
        yield SocketModel.deleteMany({
            socketId: socket.id,
        });
        if (socketData == null)
            return;
        const userObjectId = new mongoose.Types.ObjectId(socketData.userId);
        const socketRoomLeaveRequiredGroups = yield ConnectionModel.findOne({ userId: userObjectId });
        if (socketRoomLeaveRequiredGroups == null)
            return;
        socketRoomLeaveRequiredGroups.groups.forEach((group) => {
            socket.leave(`group:${group.groupId}`);
        });
    }));
});
