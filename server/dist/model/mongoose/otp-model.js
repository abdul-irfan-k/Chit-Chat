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
const otpSchema = new mongoose.Schema({
    email: { type: String },
    phone: { type: String },
    otp: { type: String, required: true },
    verificationType: { type: String },
    createdAt: { type: Date, index: { expires: 300 } },
});
otpSchema.pre("save", function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        const hashedOtp = yield bcrypt.hash(this.otp, 12);
        this.otp = hashedOtp;
        next();
    });
});
otpSchema.methods.verifyOtp = function (plainOtp) {
    return bcrypt.compare(plainOtp, this.otp);
};
const Otp = mongoose.model("Otp", otpSchema);
export default Otp;
