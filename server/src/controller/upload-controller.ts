import { Request, Response } from "express"
import { cloudinaryFileUploadHandler } from "../config/cloudinary"
import fs from "fs"
import { FILENOTINCLUEDED } from "../constants/constants"
interface MulterRequest extends Request {
  file?: Express.Multer.File | undefined
}

export const uploadSingleImageHandler = async (req: MulterRequest, res: Response) => {
  try {
    if (req.file == undefined) return
    const cloudinaryUpload = await cloudinaryFileUploadHandler(req.file.path, { resource_type: "image" })
    if (cloudinaryUpload.url) res.status(200).json({ isvalid: true, isUploaded: true, fileUrl: cloudinaryUpload.url })
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

    //@ts-ignore
    imageFiles.forEach(async (imageFile) => {
      const cloudinarUploadResponse = await cloudinaryFileUploadHandler(imageFile.path)
      if (cloudinarUploadResponse.url) imageFilesPath.push(cloudinarUploadResponse.url)
    })
    res.status(200).json({ isValid: true, isUploaded: true, filesUrl: imageFilesPath })

    //@ts-ignore
    imageFiles.forEach((file) => {
      fs.unlinkSync(file.path)
    })
  } catch (error) {
    return res.status(400).json({})
  }
}

export const uploadSingleDocumentHandler = async (req: MulterRequest, res: Response) => {
  try {
    const file = req.file
    if (file == undefined) return res.status(400).json({ errorType: FILENOTINCLUEDED })
    const cloudinaryUpload = await cloudinaryFileUploadHandler(file.path, { resource_type: "raw" })
    if (cloudinaryUpload.url) res.status(200).json({ isvalid: true, isUploaded: true, fileUrl: cloudinaryUpload.url })
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
    if (cloudinaryUpload.url) res.status(200).json({ isvalid: true, isUploaded: true, fileUrl: cloudinaryUpload.url })
    fs.unlinkSync(videoFile.path)
  } catch (error) {
    return res.status(400).json({})
  }
}

export const uploadAudioHandler = async (req: Request, res: Response) => {
  try {
    const audioFile = req.file
    if (audioFile == undefined) return res.status(400).json({ errorType: FILENOTINCLUEDED })
    const cloudinaryUpload = await cloudinaryFileUploadHandler(audioFile.path, { resource_type: "auto" })
    if (cloudinaryUpload.url) res.status(200).json({ isvalid: true, isUploaded: true, fileUrl: cloudinaryUpload.url })
    fs.unlinkSync(audioFile.path)
  } catch (error) {
    return res.status(400).json({})
  }
}
