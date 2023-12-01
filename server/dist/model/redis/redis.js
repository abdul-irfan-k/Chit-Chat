var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import mongoose from "mongoose";
import { redisClient } from "../../config/redis.js";
import SocketModel from "../mongoose/socket-model.js";
export const getRedisSocketCached = (receiverId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield redisClient.get(`socket:${receiverId}`);
        const isCached = data != null;
        if (isCached) {
            const jsonData = yield JSON.parse(data);
            return jsonData;
        }
        const receiverObjectId = new mongoose.Types.ObjectId(receiverId);
        const socketData = yield SocketModel.findOne({ userId: receiverId });
        if (socketData == null)
            return console.log("no socket data found");
        yield assignRedisSocketCache(`socket:${receiverId}`, socketData);
        return socketData;
    }
    catch (error) {
        console.log(error);
    }
});
export const assignRedisSocketCache = (query, data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield redisClient.set(query, JSON.stringify(data));
    }
    catch (error) {
        console.log(error);
    }
});
export const removeRedisSocketCachedData = (query) => __awaiter(void 0, void 0, void 0, function* () {
    return new Promise((resolve, reject) => __awaiter(void 0, void 0, void 0, function* () {
        yield redisClient.del(query);
        return resolve({ isDeleted: true });
    }));
});
