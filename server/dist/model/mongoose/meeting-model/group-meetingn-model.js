var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Schema, model } from "mongoose";
const groupCallRoomSchema = new Schema({
    referenceId: { type: String, required: true },
    adminId: { type: String, required: true },
    callRoomId: { type: String, required: true },
    callInitiator: { type: String, required: true },
    pinnedUsers: [
        {
            userId: { type: String },
        },
    ],
    callRoomAllUsers: [
        {
            userId: { type: String },
        },
    ],
    callRoomCurrentUsers: [
        {
            userId: { type: String },
            peerId: { type: String },
        },
    ],
});
groupCallRoomSchema.statics.createVideoCallRoom = function ({ peerId, referenceId, userId, callRoomId, }) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("peer id", peerId);
        const newVideoCallRoom = new this({
            referenceId,
            adminId: userId,
            callRoomId,
            callInitiator: userId,
            pinnedUsers: [{ userId }],
            callRoomAllUsers: [{ userId }],
            callRoomCurrentUsers: [{ peerId, userId }],
        });
        yield newVideoCallRoom.save();
        return;
    });
};
groupCallRoomSchema.statics.getAdminDetail = function ({ referenceId }) {
    return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
        const groupCallRoom = yield this.findOne({ referenceId });
        if (groupCallRoom == null)
            return reject();
        return resolve({ userId: groupCallRoom.adminId });
    }));
};
const GroupCallRoomModel = model("GroupMeeting", groupCallRoomSchema);
export default GroupCallRoomModel;
