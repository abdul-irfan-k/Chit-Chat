import { Schema, model } from "mongoose";
const connectionSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        required: true,
    },
    freinds: [
        {
            userId: { type: Schema.Types.ObjectId },
            chatRoomId: { type: Schema.Types.ObjectId },
        },
    ],
    groups: [
        {
            groupId: { type: Schema.Types.ObjectId },
            chatRoomId: { type: Schema.Types.ObjectId },
        },
    ],
    sendedFreindRequest: [
        {
            userId: { type: Schema.Types.ObjectId },
        },
    ],
    receivedFreindRequest: [
        {
            userId: { type: Schema.Types.ObjectId },
        },
    ],
    chatRooms: [
        {
            chatRoomId: {
                type: Schema.Types.ObjectId,
            },
        },
    ],
});
const ConnectionModel = model("Connection", connectionSchema);
export default ConnectionModel;
