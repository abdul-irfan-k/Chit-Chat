import { Schema, model } from "mongoose";
const videoMessageSchema = new Schema({
    chatRoomId: { type: String, required: true },
    postedByUser: { type: String, required: true },
    videoMessageSrc: { type: String, required: true },
    messageType: { type: String },
    readreadByRecipient: [{ readByUserId: { type: String }, readAt: { type: Date, default: Date.now() } }],
    reactions: { type: Schema.Types.ObjectId }
}, {
    timestamps: true,
});
const VideoMessageModel = model("videoMessage", videoMessageSchema);
export default VideoMessageModel;
