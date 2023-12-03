import { Request, Response } from "express"
import { cloudinaryFileUploadHandler } from "../config/cloudinary.js"
import fs from "fs"
interface MulterRequest extends Request {
  file?: Express.Multer.File | undefined
}

export const uploadSingleImageHandler = async (req: MulterRequest, res: Response) => {
  try {
    console.log("file created ", req)
    if (req.file == undefined) return
    const cloudinaryUpload = await cloudinaryFileUploadHandler(req.file.path)
    if (cloudinaryUpload.imageUrl)
      res.status(200).json({ isvalid: true, isUploadedImage: true, fileUrl: cloudinaryUpload.imageUrl })
    // res.status(200).json({ isvalid: true, isUploadedImage: true, fileUrl: "asdf" })
    // fs.unlinkSync(req.file.path)
  } catch (error) {
    return res.status(400).json({})
  }
}

interface MultipleUploadMulterReqquest extends MulterRequest {
  files?:
    | {
        [fieldname: string]: Express.Multer.File[]
      }
    | Express.Multer.File[]
    | undefined
}

export const uploadMultipleImageHandler = async (req: MultipleUploadMulterReqquest, res: Response) => {
  try {
    const imageFiles = req.files
    if (imageFiles == undefined) return res.status(400).json({})
    const imageFilesPath: Array<string> = []
    // imageFiles.forEach(async (imageFile) => {
    //   const cloudinarUploadResponse = await cloudinaryFileUploadHandler(imageFile.path)
    //   if (cloudinarUploadResponse.imageUrl) imageFilesPath.push(cloudinarUploadResponse.imageUrl)
    // })
    return res.status(200).json({ isValid: true, isUploadedImage: true, filesUrl: imageFilesPath })
  } catch (error) {}
}
