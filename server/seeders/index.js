"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_model_1 = __importDefault(require("../src/model/mongoose/user-model"));
const mongoose_1 = __importDefault(require("mongoose"));
const connections_model_1 = __importDefault(require("../src/model/mongoose/connections-model"));
const chat_room_model_1 = __importDefault(require("../src/model/mongoose/chat-room-model/chat-room-model"));
const user_1 = require("./data/user");
const chatroom_1 = require("./data/chatroom");
const connection_1 = require("./data/connection");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const config = {
    database: process.env.DATABASE_URL || "",
    dropDatabase: true,
};
const connectDb = () => __awaiter(void 0, void 0, void 0, function* () {
    yield mongoose_1.default.connect(config.database);
    console.log("connected to db");
});
// const seederObj = new Seeder(config)
const seedDb = () => __awaiter(void 0, void 0, void 0, function* () {
    console.log("started mongoose seed");
    yield user_model_1.default.deleteMany({});
    yield chat_room_model_1.default.deleteMany({});
    yield connections_model_1.default.deleteMany({});
    user_1.userSeedData.forEach((data) => __awaiter(void 0, void 0, void 0, function* () {
        const user = new user_model_1.default(data);
        yield user.save();
    }));
    console.log("added user seed data");
    chatroom_1.chatRoomSeedData.forEach((data) => __awaiter(void 0, void 0, void 0, function* () {
        const chatroom = new chat_room_model_1.default(data);
        yield chatroom.save();
    }));
    console.log("added chatroom seed data");
    connection_1.connectionSeedData.forEach((data) => __awaiter(void 0, void 0, void 0, function* () {
        const connection = new connections_model_1.default(data);
        yield connection.save();
    }));
    console.log("added connection seed data");
    // await mongoose.disconnect()
});
(() => __awaiter(void 0, void 0, void 0, function* () {
    yield connectDb();
    yield seedDb();
}))();
// const data = [
//   {
//     gender: "male",
//     url: "https://images.unsplash.com/photo-1531750026848-8ada78f641c2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2NDQ4Mzd8MHwxfHJhbmRvbXx8fHx8fHx8fDE3MjM5ODk5NTB8&ixlib=rb-4.0.3&q=80&w=400",
//   },
//   {
//     gender: "female",
//     url: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2NDQ4Mzd8MHwxfHJhbmRvbXx8fHx8fHx8fDE3MjM5ODk5NTB8&ixlib=rb-4.0.3&q=80&w=400",
//   },
//   {
//     gender: "male",
//     url: "https://images.unsplash.com/photo-1540569014015-19a7be504e3a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2NDQ4Mzd8MHwxfHJhbmRvbXx8fHx8fHx8fDE3MjM5ODk5NTB8&ixlib=rb-4.0.3&q=80&w=400",
//   },
//   {
//     gender: "female",
//     url: "https://images.unsplash.com/photo-1621786032758-112a390cb7ca?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2NDQ4Mzd8MHwxfHJhbmRvbXx8fHx8fHx8fDE3MjM5OTAxOTB8&ixlib=rb-4.0.3&q=80&w=400",
//   },
//   {
//     gender: "female",
//     url: "https://images.unsplash.com/photo-1650091903034-5f3bb37c35d2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2NDQ4Mzd8MHwxfHJhbmRvbXx8fHx8fHx8fDE3MjM5OTAxOTB8&ixlib=rb-4.0.3&q=80&w=400",
//   },
//   {
//     gender: "male",
//     url: "https://images.unsplash.com/photo-1628619487925-e9b8fc4c6b08?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2NDQ4Mzd8MHwxfHJhbmRvbXx8fHx8fHx8fDE3MjM5OTAxOTB8&ixlib=rb-4.0.3&q=80&w=400",
//   },
//   {
//     gender: "male",
//     url: "https://images.unsplash.com/photo-1599839575729-0009ea68e319?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2NDQ4Mzd8MHwxfHJhbmRvbXx8fHx8fHx8fDE3MjM5OTAxOTB8&ixlib=rb-4.0.3&q=80&w=400",
//   },
//   {
//     gender: "female",
//     url: "https://images.unsplash.com/photo-1581403341630-a6e0b9d2d257?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2NDQ4Mzd8MHwxfHJhbmRvbXx8fHx8fHx8fDE3MjM5OTA1NTV8&ixlib=rb-4.0.3&q=80&w=400",
//   },
//   {
//     gender: "female",
//     url: "https://images.unsplash.com/photo-1475821660373-587d74229161?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2NDQ4Mzd8MHwxfHJhbmRvbXx8fHx8fHx8fDE3MjM5OTA1NTV8&ixlib=rb-4.0.3&q=80&w=400",
//   },
//   {
//     gender: "male",
//     url: "https://images.unsplash.com/photo-1517202383675-eb0a6e27775f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2NDQ4Mzd8MHwxfHJhbmRvbXx8fHx8fHx8fDE3MjM5OTA1NTV8&ixlib=rb-4.0.3&q=80&w=400",
//   },
//   {
//     gender: "male",
//     url: "https://images.unsplash.com/photo-1528892952291-009c663ce843?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2NDQ4Mzd8MHwxfHJhbmRvbXx8fHx8fHx8fDE3MjM5OTA1NTV8&ixlib=rb-4.0.3&q=80&w=400",
//   },
//   {
//     gender: "male",
//     url: "https://images.unsplash.com/photo-1506634572416-48cdfe530110?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2NDQ4Mzd8MHwxfHJhbmRvbXx8fHx8fHx8fDE3MjM5OTI3MTZ8&ixlib=rb-4.0.3&q=80&w=400",
//   },
// ]
