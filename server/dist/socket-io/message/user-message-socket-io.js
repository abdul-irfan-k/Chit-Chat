var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { getRedisSocketCached } from "../../model/redis/redis.js";
import ChatRoomModel from "../../model/mongoose/chat-room-model/chat-room-model.js";
import textMessageModel from "../../model/mongoose/message-model/text-message-model.js";
import { cloudinaryFileUploadHandler } from "../../config/cloudinary.js";
import fs from "fs";
import path from "path";
import { v4 as uuidv4 } from "uuid";
import { __dirname } from "../../server.js";
import voiceMessageModel from "../../model/mongoose/message-model/voice-message-model.js";
import ImageMessageModel from "../../model/mongoose/message-model/image-message-model.js";
import mongoose from "mongoose";
import PollMessageModel from "../../model/mongoose/message-model/poll-message-model.js";
import VideoMessageModel from "../../model/mongoose/message-model/video-message-model.js";
import MessageReactionModel from "../../model/mongoose/message-model/message-reaction-model.js";
const userMessageSocketIo = (io, socket) => {
    socket.on("message:newTextMessage", ({ message, receiverId, senderId, chatRoomId }, callback) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const receiver = yield getRedisSocketCached(receiverId);
            ChatRoomModel.initiateChat([receiverId, senderId]);
            if (receiver != null) {
                socket.to(receiver.socketId).emit("message:receiveTextMessage", { message, senderId, chatRoomId, receiverId });
            }
            const textMessage = yield textMessageModel.createNewMessageInChatRoom({
                chatRoomId,
                message: message.messageContent,
                postedByUser: senderId,
                _id: message._id
            });
            console.log(textMessage);
            yield ChatRoomModel.addChatConversation({ chatRoomId, messageId: textMessage._id, messageType: "textMessage" });
            if (callback != undefined)
                callback({ isSended: true });
        }
        catch (error) {
            console.log(error);
        }
    }));
    socket.on("message:newAudioMessage", ({ message, senderId, chatRoomId, receiverId }) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            // const receiver = awiat getRedisSocketCached(receiverId)
            const randomId = uuidv4();
            const filepath = path.join(__dirname, "..", "public", "upload", `${randomId}.mp3`);
            // const base64ConvertedData = file.toString("base64")
            yield fs.writeFileSync(filepath, message.file);
            const cloudinaryUpload = yield cloudinaryFileUploadHandler(filepath, { resource_type: "auto" });
            if (!cloudinaryUpload.isSuccess || cloudinaryUpload.url == undefined)
                return;
            const newVoiceMessage = new voiceMessageModel({
                voiceMessageSrc: cloudinaryUpload.url,
                postedByUser: senderId,
            });
            yield newVoiceMessage.save();
            if (newVoiceMessage == null)
                return;
            const receiver = yield getRedisSocketCached(receiverId);
            if (receiver != null) {
                socket.to(receiver.socketId).emit("message:receiveAudioMessage", {
                    chatRoomId,
                    message: { file: cloudinaryUpload.url },
                    receiverId,
                    senderId,
                });
            }
            yield ChatRoomModel.addChatConversation({
                chatRoomId,
                messageId: newVoiceMessage._id,
                messageType: "voiceMessage",
            });
            fs.unlinkSync(filepath);
        }
        catch (error) {
            console.log(error);
        }
    }));
    socket.on("message:newImageMessage", ({ chatRoomId, message, receiverId, senderId }) => __awaiter(void 0, void 0, void 0, function* () {
        console.log("new image");
        const newMessage = new ImageMessageModel({
            chatRoomId,
            postedByUser: senderId,
            imageMessageSrc: [message.imageMessageSrc],
            messageType: "imageMessage",
        });
        yield newMessage.save();
        if (newMessage == null)
            return;
        const receiver = yield getRedisSocketCached(receiverId);
        if (receiver != null) {
            socket.to(receiver.socketId).emit("message:recieveNewImageMessage", { chatRoomId, message, receiverId, senderId });
        }
        ChatRoomModel.addChatConversation({
            chatRoomId,
            messageId: newMessage._id,
            messageType: "imageMessage",
        });
    }));
    socket.on("message:newVideoMessage", ({ chatRoomId, message, receiverId, senderId }) => __awaiter(void 0, void 0, void 0, function* () {
        const newMessage = new VideoMessageModel({
            chatRoomId,
            postedByUser: senderId,
            videoMessageSrc: message.videoMessageSrc,
            messageType: "videoMessage",
        });
        yield newMessage.save();
        if (newMessage == null)
            return;
        const receiver = yield getRedisSocketCached(receiverId);
        if (receiver != null) {
            socket.to(receiver.socketId).emit("message:receiveVideoMessage", { chatRoomId, message, receiverId, senderId });
        }
        ChatRoomModel.addChatConversation({
            chatRoomId,
            messageId: newMessage._id,
            messageType: "videoMessage",
        });
    }));
    socket.on("message:deleteMessage", ({ chatRoomId, message, receiverId, senderId }) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const messageObjectId = new mongoose.Types.ObjectId(message._id);
            const chatRoomObjectId = new mongoose.Types.ObjectId(chatRoomId);
            if (message.messageType == "textMessage")
                yield textMessageModel.deleteOne({ _id: message._id, postedByUser: senderId });
            else if (message.messageType == "imageMessage")
                yield ImageMessageModel.deleteOne({ _id: messageObjectId, postedByUser: senderId });
            else if (message.messageType == "voiceMessage")
                yield voiceMessageModel.deleteOne({ _id: messageObjectId, postedByUser: senderId });
            else if (message.messageType == "pollMessage")
                yield PollMessageModel.deleteOne({ _id: messageObjectId, postedByUser: senderId });
            else if (message.messageType == "videoMessage")
                yield VideoMessageModel.deleteOne({ _id: messageObjectId, postedByUser: senderId });
            yield ChatRoomModel.findOneAndUpdate({ _id: chatRoomObjectId }, { $pull: { chatRoomConversations: { messageId: message._id, messageType: message.messageType } } });
            const receiver = yield getRedisSocketCached(receiverId);
            if (receiver != null) {
                socket.to(receiver.socketId).emit("message:deleteMessage", { chatRoomId, message, receiverId, senderId });
            }
        }
        catch (error) {
            console.log(error);
        }
    }));
    socket.on("message:reactMessage", ({ chatRoomId, message, receiverId, senderId }) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const messageObjectId = new mongoose.Types.ObjectId(message._id);
            const userObjectId = new mongoose.Types.ObjectId(senderId);
            const messageReactions = yield MessageReactionModel.findOrCreateMessageReactionModel(messageObjectId);
            const isAlreadyReactedForMessage = messageReactions.reactions.some((reaction) => reaction.usersId.indexOf({ userId: userObjectId }) !== -1);
            if (!isAlreadyReactedForMessage) {
                const updatedMessageReaction = yield MessageReactionModel.findOneAndUpdate({ messageId: messageObjectId }, { reactions: [{ emoji: message.emoji, emojiId: message.emojiId, usersId: [userObjectId] }] });
            }
        }
        catch (error) { }
    }));
};
export default userMessageSocketIo;
