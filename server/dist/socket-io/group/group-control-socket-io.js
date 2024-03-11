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
import GroupModel from "../../model/mongoose/group-model.js";
const groupControlSocketIo = (socket) => {
    socket.on("group:updateSetting", ({ chatRoomId, groupDetail, senderId, setting }) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const groupObjectId = new mongoose.Types.ObjectId(groupDetail._id);
            const userObjectId = new mongoose.Types.ObjectId(senderId);
            const updatedGroupModel = yield GroupModel.findOneAndUpdate({ _id: groupObjectId, "adminsDetail.userId": userObjectId }, { setting }, { new: true });
            if (updatedGroupModel == null)
                return console.log("not updated");
            socket
                .to(`group:${groupDetail._id}`)
                .emit("group:onUpdateSetting", { chatRoomId, groupDetail, senderId, setting });
        }
        catch (error) {
            console.log(error);
        }
    }));
};
export default groupControlSocketIo;
