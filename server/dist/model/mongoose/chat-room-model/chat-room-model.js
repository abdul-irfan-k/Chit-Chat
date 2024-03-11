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
const chatRoomConversationsSchema = new Schema({
    messageId: String,
    messageType: String,
});
const chatRoomSchema = new Schema({
    userIds: { type: [String] },
    chatRoomConversations: {
        type: [chatRoomConversationsSchema],
        default: [],
    },
}, {
    timestamps: true,
});
chatRoomSchema.statics.initiateChat = function (userIds) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const avilableRoom = yield this.findOne({ userIds: { $all: userIds } });
            if (avilableRoom != null)
                return;
            const newRoom = new this({ userIds: userIds });
            yield newRoom.save();
            return { new: true };
        }
        catch (error) {
            console.log(error);
        }
    });
};
chatRoomSchema.statics.addChatConversation = function ({ messageId, messageType, chatRoomId, }) {
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
const ChatRoomModel = model("ChatRoom", chatRoomSchema);
export default ChatRoomModel;
