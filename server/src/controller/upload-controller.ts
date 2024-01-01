import { Request, Response } from "express"
import { cloudinaryFileUploadHandler } from "../config/cloudinary.js"
import fs from "fs"
import { FILENOTINCLUEDED } from "../constants/constants.js"
interface MulterRequest extends Request {
  file?: Express.Multer.File | undefined
}

export const uploadSingleImageHandler = async (req: MulterRequest, res: Response) => {
  try {
    console.log("file created ", req)
    if (req.file == undefined) return
    const cloudinaryUpload = await cloudinaryFileUploadHandler(req.file.path, { resource_type: "image" })
    if (cloudinaryUpload.imageUrl)
      res.status(200).json({ isvalid: true, isUploaded: true, fileUrl: cloudinaryUpload.imageUrl })
    fs.unlinkSync(req.file.path)
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
    return res.status(200).json({ isValid: true, isUploaded: true, filesUrl: imageFilesPath })
  } catch (error) {
    return res.status(400).json({})
  }
}

export const uploadSingleDocumentHandler = async (req: MulterRequest, res: Response) => {
  try {
    const file = req.file
    if (file == undefined) return res.status(400).json({ errorType: FILENOTINCLUEDED })
    const cloudinaryUpload = await cloudinaryFileUploadHandler(file.path, { resource_type: "raw" })
    if (cloudinaryUpload.imageUrl)
      res.status(200).json({ isvalid: true, isUploaded: true, fileUrl: cloudinaryUpload.imageUrl })
    fs.unlinkSync(file.path)
  } catch (error) {
    return res.status(400).json({})
  }
}

export const uploadVideoHandler = async (req: MulterRequest, res: Response) => {
  try {
    const videoFile = req.file
    if (videoFile == undefined) return res.status(400).json({ errorType: FILENOTINCLUEDED })
    const cloudinaryUpload = await cloudinaryFileUploadHandler(videoFile.path, { resource_type: "video" })
    if (cloudinaryUpload.imageUrl)
      res.status(200).json({ isvalid: true, isUploaded: true, fileUrl: cloudinaryUpload.imageUrl })
    fs.unlinkSync(videoFile.path)
    
  } catch (error) {
    return res.status(400).json({})
  }
}
