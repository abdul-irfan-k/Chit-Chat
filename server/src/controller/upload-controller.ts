import { Request, Response } from "express"
import { cloudinaryFileUploadHandler } from "../config/cloudinary.js"
import fs from "fs"
interface MulterRequest extends Request {
  file?: Express.Multer.File | undefined
}

export const uploadSingleImageHandler = async (req: MulterRequest, res: Response) => {
  try {
    if (req.file == undefined) return
    const cloudinaryUpload = await cloudinaryFileUploadHandler(req.file.path)
    if (cloudinaryUpload.imageUrl)
      res.status(200).json({ isvalid: true, isUploadedImage: true, fileUrl: cloudinaryUpload.imageUrl })
    fs.unlinkSync(req.file.path)
  } catch (error) {
    return res.status(400).json({})
  }
}
