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
const socketSchema = new Schema({
    ip: { type: String },
    socketId: { type: String, required: true },
    user: { type: Schema.Types.ObjectId, ref: "User" },
    userId: { type: String },
}, {
    timestamps: true,
});
socketSchema.statics.getOnlineUsers = function () {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const onlineUsers = yield this.aggregate([{ $project: { userId: 1 } }]);
            return onlineUsers;
        }
        catch (error) {
            console.log(error);
        }
    });
};
const SocketModel = model("Socket", socketSchema);
export default SocketModel;
