import { v2 as cloudinary } from "cloudinary"

interface cloudinaryFileUploadHandlerReturn {
  isSuccess: Boolean
  imageUrl?: string
  errorType?: string
}
export const cloudinaryFileUploadHandler = (file: string): Promise<cloudinaryFileUploadHandlerReturn> => {
  return new Promise<cloudinaryFileUploadHandlerReturn>(async (resolve, reject) => {
    try {
      cloudinary.config({
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET,
      })

      console.log(process.env.CLOUDINARY_API_KEY)
      const cloudinaryFileUploadResponseData = await cloudinary.uploader.upload(file, { resource_type: "raw" })
      const { url } = cloudinaryFileUploadResponseData

      if (!url) return reject({ isSuccess: false })
      return resolve({ isSuccess: true, imageUrl: url })
    } catch (error) {
      console.log(error)
      reject({ isSuccess: false })
    }
  })
}
