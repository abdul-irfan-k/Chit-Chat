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
const messageReactionSchema = new Schema({
    messageId: { type: Schema.Types.ObjectId, required: true },
    reactions: [
        {
            reactionType: { type: String },
            emoji: { type: String, required: true },
            emojiId: { type: String, required: true },
            usersId: [{ userId: { type: Schema.Types.ObjectId, required: true } }],
        },
    ],
}, { timestamps: true });
messageReactionSchema.statics.findOrCreateMessageReactionModel = function (messageId) {
    return __awaiter(this, void 0, void 0, function* () {
        const messageReaction = yield this.findOne({ messageId });
        if (!messageReaction)
            return messageReaction;
        const newMessageReaction = new this({ messageId, reactions: [] });
        yield newMessageReaction.save();
        return newMessageReaction;
    });
};
const MessageReactionModel = model("messageReaction", messageReactionSchema);
export default MessageReactionModel;
