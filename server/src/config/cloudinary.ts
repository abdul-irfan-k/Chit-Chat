import { v2 as cloudinary } from "cloudinary"
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

interface cloudinaryFileUploadHandlerReturn {
  isSuccess: Boolean
  imageUrl?: string
  errorType?: string
}
export const cloudinaryFileUploadHandler = (file: string): Promise<cloudinaryFileUploadHandlerReturn> => {
  return new Promise<cloudinaryFileUploadHandlerReturn>(async (resolve, reject) => {
    try {
      const cloudinaryFileUploadResponseData = await cloudinary.uploader.upload(file)
      const { url } = cloudinaryFileUploadResponseData

      if (!url) return reject({ isSuccess: false })
      return resolve({ isSuccess: true, imageUrl: url })
    } catch (error) {
      reject({ isSuccess: false })
    }
  })
}
