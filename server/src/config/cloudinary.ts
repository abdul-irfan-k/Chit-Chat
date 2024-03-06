import { UploadApiOptions, v2 as cloudinary } from "cloudinary"

interface cloudinaryFileUploadHandlerReturn {
  isSuccess: Boolean
  url?: string
  errorType?: string
}
export const cloudinaryFileUploadHandler = (file: string,options?: UploadApiOptions): Promise<cloudinaryFileUploadHandlerReturn> => {
  return new Promise<cloudinaryFileUploadHandlerReturn>(async (resolve, reject) => {
    try {
      cloudinary.config({
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET,
      })

      console.log(process.env.CLOUDINARY_API_KEY)
      const cloudinaryFileUploadResponseData = await cloudinary.uploader.upload(file, options)
      const { url } = cloudinaryFileUploadResponseData

      if (!url) return reject({ isSuccess: false })
      return resolve({ isSuccess: true, url: url })
    } catch (error) {
      console.log(error)
      reject({ isSuccess: false })
    }
  })
}
