var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import mongoose, { Schema, model } from "mongoose";
const settingSchema = new mongoose.Schema({
    userId: {
        type: Schema.Types.ObjectId,
    },
    notificationAndSoundSetting: {
        privateChat: {
            notification: { type: Boolean, default: true },
            messagePreview: { type: Boolean, default: true },
        },
        group: {
            notification: { type: Boolean, default: true },
            messagePreview: { type: Boolean, default: true },
        },
    },
    generalSetting: {
        theme: { type: String },
        backgroundTheme: { themeUrl: { type: String } },
        keyboardSetting: { sendByEnter: { type: Boolean, default: true }, sendByControlPlusEnter: { type: Boolean } },
        time: { timeFormat: { type: String, default: "12" } },
    },
}, {
    timestamps: true,
});
settingSchema.statics.createIntialDefaultSettings = function (userId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const userSetting = yield this.findOne({ userId: userId });
            if (userSetting) {
                // const updatedSetting = await this.findOneAndUpdate({ userId }, {}, { new: true })
            }
            else {
                const userNewSetting = new this({ userId });
                yield userNewSetting.save();
                return userNewSetting;
            }
        }
        catch (error) {
            throw Error();
        }
    });
};
const UserSettingModel = model("userSetting", settingSchema);
export default UserSettingModel;
