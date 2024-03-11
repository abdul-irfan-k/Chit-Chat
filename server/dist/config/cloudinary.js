var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { v2 as cloudinary } from "cloudinary";
export const cloudinaryFileUploadHandler = (file, options) => {
    return new Promise((resolve, reject) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            cloudinary.config({
                cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
                api_key: process.env.CLOUDINARY_API_KEY,
                api_secret: process.env.CLOUDINARY_API_SECRET,
            });
            console.log(process.env.CLOUDINARY_API_KEY);
            const cloudinaryFileUploadResponseData = yield cloudinary.uploader.upload(file, options);
            const { url } = cloudinaryFileUploadResponseData;
            if (!url)
                return reject({ isSuccess: false });
            return resolve({ isSuccess: true, url: url });
        }
        catch (error) {
            console.log(error);
            reject({ isSuccess: false });
        }
    }));
};
