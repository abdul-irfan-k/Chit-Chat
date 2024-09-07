"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectionSeedData = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
exports.connectionSeedData = [
    {
        _id: "randomconn01",
        userId: new mongoose_1.default.Types.ObjectId("randomidas13"),
        friends: [
            {
                userId: new mongoose_1.default.Types.ObjectId("randomidas01"),
                chatRoomId: new mongoose_1.default.Types.ObjectId("randomchat01"),
            },
            {
                userId: new mongoose_1.default.Types.ObjectId("randomidas02"),
                chatRoomId: new mongoose_1.default.Types.ObjectId("randomchat02"),
            },
            {
                userId: new mongoose_1.default.Types.ObjectId("randomidas03"),
                chatRoomId: new mongoose_1.default.Types.ObjectId("randomchat03"),
            },
            {
                userId: new mongoose_1.default.Types.ObjectId("randomidas04"),
                chatRoomId: new mongoose_1.default.Types.ObjectId("randomchat04"),
            },
            {
                userId: new mongoose_1.default.Types.ObjectId("randomidas05"),
                chatRoomId: new mongoose_1.default.Types.ObjectId("randomchat05"),
            },
            {
                userId: new mongoose_1.default.Types.ObjectId("randomidas06"),
                chatRoomId: new mongoose_1.default.Types.ObjectId("randomchat06"),
            },
            {
                userId: new mongoose_1.default.Types.ObjectId("randomidas07"),
                chatRoomId: new mongoose_1.default.Types.ObjectId("randomchat07"),
            },
            {
                userId: new mongoose_1.default.Types.ObjectId("randomidas08"),
                chatRoomId: new mongoose_1.default.Types.ObjectId("randomchat08"),
            },
            {
                userId: new mongoose_1.default.Types.ObjectId("randomidas09"),
                chatRoomId: new mongoose_1.default.Types.ObjectId("randomchat09"),
            },
            {
                userId: new mongoose_1.default.Types.ObjectId("randomidas10"),
                chatRoomId: new mongoose_1.default.Types.ObjectId("randomchat10"),
            },
            {
                userId: new mongoose_1.default.Types.ObjectId("randomidas11"),
                chatRoomId: new mongoose_1.default.Types.ObjectId("randomchat11"),
            },
            {
                userId: new mongoose_1.default.Types.ObjectId("randomidas12"),
                chatRoomId: new mongoose_1.default.Types.ObjectId("randomchat12"),
            },
            {
                userId: new mongoose_1.default.Types.ObjectId("randomidas14"),
                chatRoomId: new mongoose_1.default.Types.ObjectId("randomchat13"),
            },
        ],
        groups: [],
        sendedFriendRequest: [],
        receivedFriendRequest: [],
    },
    {
        _id: "randomconn02",
        userId: new mongoose_1.default.Types.ObjectId("randomidas01"),
        friends: [
            {
                userId: new mongoose_1.default.Types.ObjectId("randomidas13"),
                chatRoomId: new mongoose_1.default.Types.ObjectId("randomchat01"),
            },
        ],
        groups: [],
        sendedFriendRequest: [],
        receivedFriendRequest: [],
    },
    {
        _id: "randomconn03",
        userId: new mongoose_1.default.Types.ObjectId("randomidas02"),
        friends: [
            {
                userId: new mongoose_1.default.Types.ObjectId("randomidas13"),
                chatRoomId: new mongoose_1.default.Types.ObjectId("randomchat02"),
            },
        ],
        groups: [],
        sendedFriendRequest: [],
        receivedFriendRequest: [],
    },
    {
        _id: "randomconn04",
        userId: new mongoose_1.default.Types.ObjectId("randomidas03"),
        friends: [
            {
                userId: new mongoose_1.default.Types.ObjectId("randomidas13"),
                chatRoomId: new mongoose_1.default.Types.ObjectId("randomchat03"),
            },
        ],
        groups: [],
        sendedFriendRequest: [],
        receivedFriendRequest: [],
    },
    {
        _id: "randomconn05",
        userId: new mongoose_1.default.Types.ObjectId("randomidas04"),
        friends: [
            {
                userId: new mongoose_1.default.Types.ObjectId("randomidas13"),
                chatRoomId: new mongoose_1.default.Types.ObjectId("randomchat04"),
            },
        ],
        groups: [],
        sendedFriendRequest: [],
        receivedFriendRequest: [],
    },
    {
        _id: "randomconn06",
        userId: new mongoose_1.default.Types.ObjectId("randomidas05"),
        friends: [
            {
                userId: new mongoose_1.default.Types.ObjectId("randomidas13"),
                chatRoomId: new mongoose_1.default.Types.ObjectId("randomchat05"),
            },
        ],
        groups: [],
        sendedFriendRequest: [],
        receivedFriendRequest: [],
    },
    {
        _id: "randomconn07",
        userId: new mongoose_1.default.Types.ObjectId("randomidas06"),
        friends: [
            {
                userId: new mongoose_1.default.Types.ObjectId("randomidas13"),
                chatRoomId: new mongoose_1.default.Types.ObjectId("randomchat06"),
            },
        ],
        groups: [],
        sendedFriendRequest: [],
        receivedFriendRequest: [],
    },
    {
        _id: "randomconn08",
        userId: new mongoose_1.default.Types.ObjectId("randomidas07"),
        friends: [
            {
                userId: new mongoose_1.default.Types.ObjectId("randomidas13"),
                chatRoomId: new mongoose_1.default.Types.ObjectId("randomchat07"),
            },
        ],
        groups: [],
        sendedFriendRequest: [],
        receivedFriendRequest: [],
    },
    {
        _id: "randomconn09",
        userId: new mongoose_1.default.Types.ObjectId("randomidas08"),
        friends: [
            {
                userId: new mongoose_1.default.Types.ObjectId("randomidas13"),
                chatRoomId: new mongoose_1.default.Types.ObjectId("randomchat08"),
            },
        ],
        groups: [],
        sendedFriendRequest: [],
        receivedFriendRequest: [],
    },
    {
        _id: "randomconn10",
        userId: new mongoose_1.default.Types.ObjectId("randomidas09"),
        friends: [
            {
                userId: new mongoose_1.default.Types.ObjectId("randomidas13"),
                chatRoomId: new mongoose_1.default.Types.ObjectId("randomchat09"),
            },
        ],
        groups: [],
        sendedFriendRequest: [],
        receivedFriendRequest: [],
    },
    {
        _id: "randomconn11",
        userId: new mongoose_1.default.Types.ObjectId("randomidas10"),
        friends: [
            {
                userId: new mongoose_1.default.Types.ObjectId("randomidas13"),
                chatRoomId: new mongoose_1.default.Types.ObjectId("randomchat10"),
            },
        ],
        groups: [],
        sendedFriendRequest: [],
        receivedFriendRequest: [],
    },
    {
        _id: "randomconn12",
        userId: new mongoose_1.default.Types.ObjectId("randomidas11"),
        friends: [
            {
                userId: new mongoose_1.default.Types.ObjectId("randomidas13"),
                chatRoomId: new mongoose_1.default.Types.ObjectId("randomchat11"),
            },
        ],
        groups: [],
        sendedFriendRequest: [],
        receivedFriendRequest: [],
    },
    {
        _id: "randomconn13",
        userId: new mongoose_1.default.Types.ObjectId("randomidas12"),
        friends: [
            {
                userId: new mongoose_1.default.Types.ObjectId("randomidas13"),
                chatRoomId: new mongoose_1.default.Types.ObjectId("randomchat12"),
            },
        ],
        groups: [],
        sendedFriendRequest: [],
        receivedFriendRequest: [],
    },
    {
        _id: "randomconn14",
        userId: new mongoose_1.default.Types.ObjectId("randomidas14"),
        friends: [
            {
                userId: new mongoose_1.default.Types.ObjectId("randomidas13"),
                chatRoomId: new mongoose_1.default.Types.ObjectId("randomchat13"),
            },
        ],
        groups: [],
        sendedFriendRequest: [],
        receivedFriendRequest: [],
    },
];
