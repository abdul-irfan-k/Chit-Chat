var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import mongoose, { model } from "mongoose";
import { Schema } from "mongoose";
const groupChatRoomSchema = new Schema({
    groupId: { type: Schema.Types.ObjectId, required: true },
    chatRoomConversations: [
        {
            messageId: Schema.Types.ObjectId,
            messageType: String,
            postedByUser: Schema.Types.ObjectId,
        },
    ],
}, {
    timestamps: true,
});
groupChatRoomSchema.statics.initiateChat = function (groupId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const groupObjectId = new mongoose.Types.ObjectId(groupId);
            const avilableRoom = yield this.findOne({ groupId: groupObjectId });
            if (avilableRoom != null)
                return;
            const newRoom = new this({ groupId: groupObjectId });
            yield newRoom.save();
            return { new: true };
        }
        catch (error) {
            console.log(error);
        }
    });
};
groupChatRoomSchema.statics.addChatConversation = function ({ messageId, messageType, chatRoomId, }) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield this.findOneAndUpdate({ _id: chatRoomId }, { $push: { chatRoomConversations: { messageId, messageType } } });
            return;
        }
        catch (error) {
            console.log(error);
        }
    });
};
const GroupChatRoomModel = model("ChatRoom", groupChatRoomSchema);
export default GroupChatRoomModel;
