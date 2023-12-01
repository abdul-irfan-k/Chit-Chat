var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import express from "express";
import http from "http";
import dotEnv from "dotenv";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";
import url from "url";
import * as socketIo from "socket.io";
dotEnv.config();
import userRouter from "./route/user-route.js";
import chatRouter from "./route/chat-route.js";
import meetingRouter from "./route/meeting-route.js";
import uploadRouter from "./route/upload-route.js";
import { connnectDB } from "./config/mongoose.js";
import { connectRedis } from "./config/redis.js";
import userMessageSocketIo from "./socket-io/message/user-message-socket-io.js";
import groupMessageSocketIo from "./socket-io/message/group-message-socket-io.js";
import { userSocketIntialization } from "./socket-io/user/user-initialise.js";
import { userStatusSocketIo } from "./socket-io/user/user-status-socket-io.js";
import videoCallIntialiseSocketIo from "./socket-io/meeting/video-call-socket-intialise.js";
import GroupCallSocketIo from "./socket-io/meeting/group-call-socket-io.js";
import callPeerHandlerSocketIo from "./socket-io/meeting/call-peer-handler-socket-io.js";
const app = express();
const server = http.createServer(app);
const port = process.env.PORT || 8000;
const frontendUrl = process.env.FRONTEND_URL || "http://localhost:3000";
const __filename = url.fileURLToPath(import.meta.url);
export const __dirname = path.dirname(__filename);
const corsOptions = {
    origin: frontendUrl,
    credentials: true,
    // optionSuccessStatus: 200,
};
app.use(cookieParser());
app.use(cors(corsOptions));
app.use(bodyParser());
app.use(express.static(path.join(__dirname, "..", "public")));
const io = new socketIo.Server(server, {
    cors: {
        origin: [frontendUrl],
    },
});
io.on("connection", (socket) => __awaiter(void 0, void 0, void 0, function* () {
    // creating socket model
    userSocketIntialization(socket);
    // video call
    callPeerHandlerSocketIo(io, socket);
    videoCallIntialiseSocketIo(io, socket);
    GroupCallSocketIo(io, socket);
    userStatusSocketIo(io, socket);
    //message
    userMessageSocketIo(io, socket);
    groupMessageSocketIo(socket);
}));
app.use("/user", userRouter);
app.use("/chat", chatRouter);
app.use("/meeting", meetingRouter);
app.use("/upload", uploadRouter);
connnectDB(() => {
    server.listen(port, () => {
        console.log(`server listing on http://localhost:${port}`);
    });
    connectRedis();
});
