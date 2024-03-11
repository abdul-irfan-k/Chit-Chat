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
const CallRoomSchema = new Schema({
    chatRoomId: { type: String, required: true },
    callCurrentStatus: { type: String },
    participants: { type: [String], default: [] },
    callStatus: { type: String },
    callIntiatorUserId: { type: Schema.Types.ObjectId, required: true },
    callType: { type: String },
}, {
    timestamps: true,
});
CallRoomSchema.statics.initiateCallRoom = function ({ chatRoomId, userId, callType }) {
    return __awaiter(this, void 0, void 0, function* () {
        const intiatorUserId = new mongoose.Types.ObjectId(userId);
        const videoCallRoom = new this({ chatRoomId, participants: [userId], callIntiatorUserId: intiatorUserId, callType });
        yield videoCallRoom.save();
        return { isCreatedRoom: true, _id: videoCallRoom._id };
    });
};
CallRoomSchema.statics.addCallRoomUser = function ({ userId, callRoomId }) {
    return __awaiter(this, void 0, void 0, function* () {
        const callRoomObjectId = new mongoose.Types.ObjectId(callRoomId);
        const videoCallRoom = yield this.findOneAndUpdate({ _id: callRoomObjectId }, {
            $push: { participants: userId },
        }, { new: true });
        return videoCallRoom;
    });
};
CallRoomSchema.statics.getCallRoom = function (chatRoomId) {
    return __awaiter(this, void 0, void 0, function* () {
        const videoCallRoom = yield this.findOne({ chatRoomId });
        return videoCallRoom;
    });
};
const CallRoomModel = model("Meeting", CallRoomSchema);
export default CallRoomModel;
