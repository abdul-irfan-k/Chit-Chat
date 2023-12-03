import { Schema, model } from "mongoose";
const pollMessageSchema = new Schema({
    title: { type: String, required: true },
    options: [{ title: { type: String }, votedMembers: [{ userId: { type: String } }] }],
    chatRoomId: { type: String, required: true },
    postedByUser: { type: String, required: true },
    messageType: { type: String },
    readreadByRecipient: [{ readByUserId: { type: String }, readAt: { type: Date, default: Date.now() } }],
}, {
    timestamps: true,
});
const PollMessageModel = model("pollMessage", pollMessageSchema);
export default PollMessageModel;
