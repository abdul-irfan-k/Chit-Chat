import { Schema, model } from "mongoose";
const groupSchema = new Schema({
    name: { type: String, required: true },
    discription: { type: String, default: "" },
    adminsDetail: [{ userId: { type: Schema.Types.ObjectId } }],
    member: [{ userId: { type: Schema.Types.ObjectId } }],
    blockedMember: [{ userId: { type: Schema.Types.ObjectId } }],
    setting: {
        isAdminOnlySendMessage: { type: Boolean, default: false },
        isAllowedJoinByUrl: { type: Boolean, default: true },
        isHidingMembersNumber: { type: Boolean, default: false },
    },
    chatRoomId: { type: Schema.Types.ObjectId, required: true },
}, {
    timestamps: true,
});
const GroupModel = model("Group", groupSchema);
export default GroupModel;
