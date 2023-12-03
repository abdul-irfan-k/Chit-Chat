var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import PollMessageModel from "../../model/mongoose/message-model/poll-message-model.js";
import textMessageModel from "../../model/mongoose/message-model/text-message-model.js";
import GroupChatRoomModel from "../../model/mongoose/chat-room-model/group-chat-room-model.js";
import mongoose from "mongoose";
const groupMessageSocketIo = (socket) => {
    socket.on("groupMessage:newTextMessage", ({ chatRoomId, message, senderId, groupDetail }) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            socket
                .to(`group:${groupDetail._id}`)
                .emit("groupMessage:receiveTextMessage", { chatRoomId, groupDetail, message, senderId });
            const newMessage = yield textMessageModel.createNewMessageInChatRoom({
                chatRoomId: chatRoomId,
                message: message.messageContent,
                postedByUser: senderId,
            });
            if (newMessage == null)
                return;
            GroupChatRoomModel.addChatConversation({
                chatRoomId: chatRoomId,
                messageId: newMessage._id.toString(),
                messageType: "textMessage",
            });
        }
        catch (error) {
            console.log(error);
        }
    }));
    socket.on("groupMessage:newPollMessage", ({ chatRoomId, groupDetail, message, senderId }) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            socket
                .to(`group:${groupDetail._id}`)
                .emit("groupMessage:receivePollMessage", { chatRoomId, groupDetail, message, senderId });
            const newMessage = new PollMessageModel({
                title: message.title,
                options: message.options,
                chatRoomId,
                postedByUser: senderId,
            });
            yield newMessage.save();
            if (newMessage == null)
                return;
            GroupChatRoomModel.addChatConversation({
                chatRoomId,
                messageId: newMessage._id.toString(),
                messageType: "pollMessage",
            });
        }
        catch (error) {
            console.log(error);
        }
    }));
    socket.on("groupMessage:pollMessageVoteUpdate", ({ chatRoomId, groupDetail, message, senderId }) => __awaiter(void 0, void 0, void 0, function* () {
        console.log("poll update message");
        const messageObjectId = new mongoose.Types.ObjectId(message._id);
        yield PollMessageModel.updateVotedMember({
            _id: messageObjectId,
            currentVotedOptionDetail: { _id: message.selectedOption._id },
            userId: senderId,
        });
    }));
};
export default groupMessageSocketIo;
