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
import SocketModel from "../model/mongoose/socket-model.js";
export const connnectDB = (callback) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const databaseUrl = process.env.DATABASE_URL || "mongodb://127.0.0.1:27017/video-conference-web-application";
        yield mongoose.connect(databaseUrl);
        const developmentBuild = process.env.NODE_ENV == "DEVELOPMENT";
        if (developmentBuild)
            yield SocketModel.deleteMany({});
        callback();
    }
    catch (error) {
        console.log(error);
    }
});
