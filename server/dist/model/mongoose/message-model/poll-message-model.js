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
const pollMessageSchema = new Schema({
    title: { type: String, required: true },
    options: [{ title: { type: String }, votedMembers: [{ userId: { type: String } }] }],
    totalVotedMembers: { type: Number, default: 0 },
    chatRoomId: { type: String, required: true },
    postedByUser: { type: String, required: true },
    messageType: { type: String },
    readreadByRecipient: [{ readByUserId: { type: String }, readAt: { type: Date, default: Date.now() } }],
}, {
    timestamps: true,
});
pollMessageSchema.statics.updateVotedMember = function ({ _id, currentVotedOptionDetail, userId, }) {
    return __awaiter(this, void 0, void 0, function* () {
        const pollMessage = yield this.findOne({ _id });
        if (pollMessage == null)
            return;
        // const updatedOptions: Array<optionInterface> = []
        const updatedOptions = pollMessage.options.map((option, index) => {
            const previosVotedOptionDetail = pollMessage.options[index].votedMembers.filter((member) => member.userId == userId);
            if (previosVotedOptionDetail.length > 0) {
                const updatedVotedMembers = option.votedMembers.filter((member) => member.userId != userId);
                return { votedMembers: [...updatedVotedMembers], _id: option._id, title: option.title };
            }
            else if (option._id.toString() == currentVotedOptionDetail._id) {
                const updatedMembers = option.votedMembers;
                updatedMembers.push({ userId: userId });
                return { votedMembers: [...updatedMembers], _id: option._id, title: option.title };
            }
            else
                return { votedMembers: [...option.votedMembers], _id: option._id, title: option.title };
        });
        // console.log("updated options", updatedOptions)
        yield this.findOneAndUpdate({ _id }, { options: updatedOptions }, { new: true });
        debugger;
    });
};
const PollMessageModel = model("pollMessage", pollMessageSchema);
export default PollMessageModel;
