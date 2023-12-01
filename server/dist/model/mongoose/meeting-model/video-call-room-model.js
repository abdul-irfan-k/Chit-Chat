var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import mongoose, { Schema, model } from "mongoose";
const videoCallRoomSchema = new Schema({
    userIds: { type: [String], default: [] },
    chatRoomId: { type: String, required: true },
    callCurrentStatus: { type: String },
    callIntiatorUserId: { type: String },
}, {
    timestamps: true,
});
videoCallRoomSchema.statics.initiateVideoCallRoom = function ({ chatRoomId, userId }) {
    return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
        try {
            const videoCallRoom = new this({ chatRoomId, userIds: [userId], callIntiatorUserId: userId });
            yield videoCallRoom.save();
            return resolve({ isCreatedRoom: true, _id: videoCallRoom._id });
        }
        catch (error) {
            reject();
        }
    }));
};
videoCallRoomSchema.statics.addVideoCallRoomUser = function ({ userId, callRoomId }) {
    return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
        try {
            const callRoomObjectId = new mongoose.Types.ObjectId(callRoomId);
            const videoCallRoom = yield this.findOneAndUpdate({ _id: callRoomObjectId }, {
                $push: { userIds: userId },
            }, { new: true });
            resolve(videoCallRoom);
        }
        catch (error) {
            reject();
        }
    }));
};
videoCallRoomSchema.statics.getVideoCallRoom = function (chatRoomId) {
    return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
        try {
            const videoCallRoom = yield this.findOne({ chatRoomId });
            return resolve(videoCallRoom);
        }
        catch (error) {
            reject();
        }
    }));
};
const VideoCallRoomModel = model("VideoCallRoom", videoCallRoomSchema);
export default VideoCallRoomModel;
