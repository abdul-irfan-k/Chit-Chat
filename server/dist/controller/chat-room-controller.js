var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import textMessageModel from "../model/mongoose/message-model/text-message-model.js";
import ChatRoomModel from "../model/mongoose/chat-room-model/chat-room-model.js";
import GroupModel from "../model/mongoose/group-model.js";
import mongoose from "mongoose";
import ConnectionModel from "../model/mongoose/connections-model.js";
import UserModel from "../model/mongoose/user-model.js";
import GroupChatRoomModel from "../model/mongoose/chat-room-model/group-chat-room-model.js";
export const sendMessageToUserHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { _id } = req.user;
        const { chatRoomId, message } = req.body;
        yield textMessageModel.createNewMessageInChatRoom({ chatRoomId, message, postedByUser: _id });
        return res.status(200).json({ isValid: true, isSaved: true });
    }
    catch (error) {
        console.log(error);
    }
});
export const getAllChatUsersHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { _id } = req.user;
        const allChatUser = yield UserModel.getAllChatUser(_id);
        return res.status(200).json(allChatUser);
    }
    catch (error) {
        console.log(error);
    }
});
export const getAllChatGroupsHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { _id } = req.user;
        const userObjectId = new mongoose.Types.ObjectId(_id);
        // const allNewChatGroup = await GroupModel.find({member:{$elemMatch: {userId:userObjectId }}})
        const allNewChatGroup = yield GroupModel.aggregate([
            { $match: { member: { $elemMatch: { userId: userObjectId } } } },
            {
                $addFields: {
                    isAdmin: { $in: [userObjectId, "$adminsDetail.userId"] },
                },
            },
        ]);
        return res.status(200).json(allNewChatGroup);
    }
    catch (error) {
        console.log(error);
        return res.status(400).json({});
    }
});
export const getChatRoomMessageHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { chatRoomId } = req.body;
        console.log("chatRoomId", chatRoomId);
        const chatRoomObjectId = new mongoose.Types.ObjectId(chatRoomId);
        const chatRoomMessages = yield ChatRoomModel.aggregate([
            { $match: { _id: chatRoomObjectId } },
            { $unwind: "$chatRoomConversations" },
            {
                $group: {
                    _id: null,
                    messages: { $push: { type: "$chatRoomConversations.messageType", id: "$chatRoomConversations.messageId" } },
                },
            },
            {
                $project: {
                    allMessages: {
                        $map: {
                            input: "$messages",
                            as: "message",
                            in: {
                                textMessageIds: {
                                    $cond: { if: { $eq: ["$$message.type", "textMessage"] }, then: "$$message.id", else: "$$REMOVE" },
                                },
                                voiceMessageIds: {
                                    $cond: { if: { $eq: ["$$message.type", "voiceMessage"] }, then: "$$message.id", else: "$$REMOVE" },
                                },
                                imageMessageIds: {
                                    $cond: { if: { $eq: ["$$message.type", "imageMessage"] }, then: "$$message.id", else: "$$REMOVE" },
                                },
                            },
                        },
                    },
                },
            },
            {
                $lookup: {
                    from: "textmessages",
                    let: { messageIds: "$allMessages.textMessageIds" },
                    pipeline: [{ $match: { $expr: { $in: ["$_id", "$$messageIds"] } } }],
                    as: "textMessage",
                },
            },
            {
                $lookup: {
                    from: "voicemessages",
                    let: { voiceMessageIds: "$allMessages.voiceMessageIds" },
                    pipeline: [{ $match: { $expr: { $in: ["$_id", "$$voiceMessageIds"] } } }],
                    as: "voiceMessage",
                },
            },
            {
                $lookup: {
                    from: "imagemessages",
                    let: { imageMessageIds: "$allMessages.imageMessageIds" },
                    pipeline: [{ $match: { $expr: { $in: ["$_id", "$$imageMessageIds"] } } }],
                    as: "imageMessage",
                },
            },
            {
                $addFields: {
                    messages: { $concatArrays: ["$textMessage", "$voiceMessage", "$imageMessage"] },
                },
            },
            {
                $project: {
                    messages: {
                        $sortArray: {
                            input: "$messages",
                            sortBy: { createdAt: 1 },
                        },
                    },
                },
            },
        ]);
        return res.status(200).json(chatRoomMessages);
    }
    catch (error) {
        console.log(error);
        return res.status(400).json({ isValid: false });
        // console.log(error)
    }
});
// creating the group
export const createGroupHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { _id } = req.user;
        const { groupName, groupMembers } = req.body;
        groupMembers.push({ userId: _id });
        const newChatRoom = new GroupChatRoomModel({});
        yield newChatRoom.save();
        const newGroup = new GroupModel({
            name: groupName,
            adminsDetail: [{ userId: _id }],
            member: groupMembers,
            chatRoomId: newChatRoom._id,
        });
        yield newGroup.save();
        GroupChatRoomModel.findOneAndUpdate({ _id: newChatRoom._id }, { groupId: newGroup._id });
        return res.status(200).json({ isValid: true, chatRoomId: newChatRoom._id });
    }
    catch (error) {
        return res.status(400).json({});
    }
});
export const acceptGroupHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { _id } = req.user;
        const { groupId, groupChatRoomId } = req.body;
        const userObjectId = new mongoose.Types.ObjectId(_id);
        const groupObjectId = new mongoose.Types.ObjectId(groupId);
        const groupChatRomObjectId = new mongoose.Types.ObjectId(groupChatRoomId);
        yield ConnectionModel.findOneAndUpdate({ userId: userObjectId, groups: { $not: { $elemMatch: { groupId: groupObjectId } } } }, { $push: { groups: { groupId: groupObjectId, chatRoomId: groupChatRomObjectId } } });
    }
    catch (error) {
        return res.status(400).json({});
    }
});
// get group chat room messages
export const getGroupChatRoomMessageHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { chatRoomId } = req.body;
        console.log("chatRoomId", chatRoomId);
        const chatRoomObjectId = new mongoose.Types.ObjectId(chatRoomId);
        const chatRoomMessages = yield GroupChatRoomModel.aggregate([
            { $match: { _id: chatRoomObjectId } },
            { $unwind: "$chatRoomConversations" },
            {
                $group: {
                    _id: null,
                    messages: { $push: { type: "$chatRoomConversations.messageType", id: "$chatRoomConversations.messageId" } },
                },
            },
            {
                $project: {
                    allMessages: {
                        $map: {
                            input: "$messages",
                            as: "message",
                            in: {
                                textMessageIds: {
                                    $cond: { if: { $eq: ["$$message.type", "textMessage"] }, then: "$$message.id", else: "$$REMOVE" },
                                },
                                voiceMessageIds: {
                                    $cond: { if: { $eq: ["$$message.type", "voiceMessage"] }, then: "$$message.id", else: "$$REMOVE" },
                                },
                                imageMessageIds: {
                                    $cond: { if: { $eq: ["$$message.type", "imageMessage"] }, then: "$$message.id", else: "$$REMOVE" },
                                },
                                pollMessageIds: {
                                    $cond: { if: { $eq: ["$$message.type", "pollMessage"] }, then: "$$message.id", else: "$$REMOVE" },
                                },
                            },
                        },
                    },
                },
            },
            {
                $lookup: {
                    from: "textmessages",
                    let: { messageIds: "$allMessages.textMessageIds" },
                    pipeline: [{ $match: { $expr: { $in: ["$_id", "$$messageIds"] } } }],
                    as: "textMessage",
                },
            },
            {
                $lookup: {
                    from: "voicemessages",
                    let: { voiceMessageIds: "$allMessages.voiceMessageIds" },
                    pipeline: [{ $match: { $expr: { $in: ["$_id", "$$voiceMessageIds"] } } }],
                    as: "voiceMessage",
                },
            },
            {
                $lookup: {
                    from: "imagemessages",
                    let: { imageMessageIds: "$allMessages.imageMessageIds" },
                    pipeline: [{ $match: { $expr: { $in: ["$_id", "$$imageMessageIds"] } } }],
                    as: "imageMessage",
                },
            },
            {
                $lookup: {
                    from: "pollmessages",
                    let: { pollMessageIds: "$allMessages.pollMessageIds" },
                    pipeline: [{ $match: { $expr: { $in: ["$_id", "$$pollMessageIds"] } } }],
                    as: "pollMessage",
                },
            },
            {
                $addFields: {
                    messages: { $concatArrays: ["$textMessage", "$voiceMessage", "$imageMessage", "$pollMessage"] },
                },
            },
            {
                $project: {
                    messages: {
                        $sortArray: {
                            input: "$messages",
                            sortBy: { createdAt: 1 },
                        },
                    },
                },
            },
        ]);
        return res.status(200).json(chatRoomMessages);
    }
    catch (error) {
        console.log(error);
        return res.status(400).json({ isValid: false });
        // console.log(error)
    }
});
