import { Schema, model } from "mongoose";
const imageMessageSchema = new Schema({
    chatRoomId: { type: String, required: true },
    postedByUser: { type: String, required: true },
    imageMessageSrc: { type: [String], required: true },
    messageType: { type: String },
    readreadByRecipient: [{ readByUserId: { type: String }, readAt: { type: Date, default: Date.now() } }],
}, {
    timestamps: true,
});
const ImageMessageModel = model("imageMessage", imageMessageSchema);
export default ImageMessageModel;
