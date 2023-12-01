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
const readByRecipientSchema = new Schema({
    readByUserId: { type: String, required: true },
    readAt: { type: Date, default: Date.now() },
});
const textMessageSchema = new Schema({
    chatRoomId: { type: String, required: true },
    postedByUser: { type: String, required: true },
    message: { type: String, required: true },
    messageType: { type: String, default: "textMessage" },
    readByRecipient: { type: [readByRecipientSchema], default: [] },
}, {
    timestamps: true,
});
textMessageSchema.statics.createNewMessageInChatRoom = function ({ chatRoomId, postedByUser, message, }) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const post = yield this.create({ chatRoomId, postedByUser, message });
            return post;
        }
        catch (error) {
            console.log(error);
        }
    });
};
const textMessageModel = model("TextMessage", textMessageSchema);
export default textMessageModel;
