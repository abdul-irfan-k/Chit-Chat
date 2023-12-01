var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import mongoose from "mongoose";
import bcrypt from "bcrypt";
const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    userId: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    profileImageUrl: { type: String },
    isBlocked: { type: Boolean, default: false },
    accountVerification: { isVerified: { type: Boolean }, veriftionType: { type: String } },
}, {
    timestamps: true,
});
userSchema.pre("save", function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        const hashedPassword = yield bcrypt.hash(this.password, 12);
        this.password = hashedPassword;
        next();
    });
});
userSchema.methods.checkIsCorrectPassword = function (plainPassword) {
    return __awaiter(this, void 0, void 0, function* () {
        const isCorrectPassword = yield bcrypt.compare(plainPassword, this.password);
        return isCorrectPassword;
    });
};
userSchema.methods.changePassword = function (password) {
    return __awaiter(this, void 0, void 0, function* () {
        const hashedPassword = yield bcrypt.hash(password, 12);
        this.password = hashedPassword;
        return { isValid: true, isChangedPassword: true };
    });
};
userSchema.statics.getAllChatUser = function (myUserId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const id = new mongoose.Types.ObjectId(myUserId);
            const allChatUsers = yield this.aggregate([
                { $match: { _id: { $ne: id } } },
                {
                    $lookup: {
                        from: "chatrooms",
                        let: { receiverId: "$_id" },
                        pipeline: [
                            {
                                $match: {
                                    $expr: { $and: [{ $in: ["$$receiverId", "$userIds"] }, { $in: [id, "$userIds"] }] },
                                },
                            },
                            { $project: { chatRoomId: "$_id", _id: 0 } },
                        ],
                        as: "chatRoom",
                    },
                },
                { $unwind: "$chatRoom" },
                { $project: { name: 1, email: 1, userId: 1, chatRoom: "$chatRoom" } },
            ]);
            return allChatUsers;
        }
        catch (error) {
            console.log(error);
        }
    });
};
userSchema.statics.getUserDetail = function (myUserId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const id = new mongoose.Types.ObjectId(myUserId);
            const userDetail = yield this.aggregate([{ $match: { _id: id } }, { $project: { password: 0 } }]);
            return userDetail[0];
        }
        catch (error) {
            console.log(error);
        }
    });
};
const UserModel = mongoose.model("User", userSchema);
export default UserModel;
