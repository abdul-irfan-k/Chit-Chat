var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { cloudinaryFileUploadHandler } from "../config/cloudinary.js";
import fs from "fs";
import { FILENOTINCLUEDED } from "../constants/constants.js";
export const uploadSingleImageHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("file created ", req);
        if (req.file == undefined)
            return;
        const cloudinaryUpload = yield cloudinaryFileUploadHandler(req.file.path, { resource_type: "image" });
        if (cloudinaryUpload.imageUrl)
            res.status(200).json({ isvalid: true, isUploaded: true, fileUrl: cloudinaryUpload.imageUrl });
        fs.unlinkSync(req.file.path);
    }
    catch (error) {
        return res.status(400).json({});
    }
});
export const uploadMultipleImageHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const imageFiles = req.files;
        if (imageFiles == undefined)
            return res.status(400).json({});
        const imageFilesPath = [];
        // imageFiles.forEach(async (imageFile) => {
        //   const cloudinarUploadResponse = await cloudinaryFileUploadHandler(imageFile.path)
        //   if (cloudinarUploadResponse.imageUrl) imageFilesPath.push(cloudinarUploadResponse.imageUrl)
        // })
        return res.status(200).json({ isValid: true, isUploaded: true, filesUrl: imageFilesPath });
    }
    catch (error) {
        return res.status(400).json({});
    }
});
export const uploadSingleDocumentHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const file = req.file;
        if (file == undefined)
            return res.status(400).json({ errorType: FILENOTINCLUEDED });
        const cloudinaryUpload = yield cloudinaryFileUploadHandler(file.path, { resource_type: "raw" });
        if (cloudinaryUpload.imageUrl)
            res.status(200).json({ isvalid: true, isUploaded: true, fileUrl: cloudinaryUpload.imageUrl });
        fs.unlinkSync(file.path);
    }
    catch (error) {
        return res.status(400).json({});
    }
});
export const uploadVideoHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const videoFile = req.file;
        if (videoFile == undefined)
            return res.status(400).json({ errorType: FILENOTINCLUEDED });
        const cloudinaryUpload = yield cloudinaryFileUploadHandler(videoFile.path, { resource_type: "video" });
        if (cloudinaryUpload.imageUrl)
            res.status(200).json({ isvalid: true, isUploaded: true, fileUrl: cloudinaryUpload.imageUrl });
        fs.unlinkSync(videoFile.path);
    }
    catch (error) {
        return res.status(400).json({});
    }
});
