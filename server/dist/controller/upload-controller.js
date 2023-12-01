var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import fs from "fs";
export const uploadSingleImageHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const fileResponse = req.file;
        console.log("file created ", req);
        debugger;
        if (req.file == undefined)
            return;
        // const cloudinaryUpload = await cloudinaryFileUploadHandler(req.file.path)
        // if (cloudinaryUpload.imageUrl)
        // res.status(200).json({ isvalid: true, isUploadedImage: true, fileUrl: cloudinaryUpload.imageUrl })
        fs.unlinkSync(req.file.path);
    }
    catch (error) {
        return res.status(400).json({});
    }
});
