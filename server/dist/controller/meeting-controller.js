var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import GroupCallRoomModel from "../model/mongoose/meeting-model/group-meetingn-model.js";
import { generateRandomUUID } from "../util/random-text-generator.js";
import { v4 as uuidv4 } from "uuid";
import CallRoomModel from "../model/mongoose/meeting-model/meeting-model.js";
import mongoose from "mongoose";
export const createGroupVideoCallHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { _id: userId } = req.user;
        const referenceId = generateRandomUUID(9);
        const peerId = uuidv4();
        const callRoomId = uuidv4();
        yield GroupCallRoomModel.createVideoCallRoom({ callRoomId, peerId, referenceId, userId });
        return res.status(200).json({
            isCreated: true,
            callRoomId,
            peerId,
            referenceId,
            adminDetail: { userId: userId },
            callInitiator: { userId: userId },
        });
    }
    catch (error) {
        return res.status(400).json({ isValid: false });
    }
});
export const findMeetingByCodeHandler = (req, res) => {
    try {
        const {} = req.body;
    }
    catch (error) { }
};
export const getAllCallLogsHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // const { _id } = req.user as userInterface
        const { skip, step, limit, sort, _id } = req.body;
        const userObjectId = new mongoose.Types.ObjectId(_id);
        const callLogs = yield CallRoomModel.aggregate([
            {
                $match: {
                    $expr: { $in: [_id, "$participants"] },
                },
            },
        ]);
        return res.json(callLogs);
    }
    catch (error) {
        console.log(error);
        return res.status(400).json({});
    }
});
