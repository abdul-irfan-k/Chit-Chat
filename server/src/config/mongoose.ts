import mongoose from "mongoose"

type callbackType = () => void
export const connnectDB = async (callback: callbackType) => {
  try {
    const databaseUrl = process.env.DATABASE_URL || "mongodb://127.0.0.1:27017/video-conference-web-application"
    await mongoose.connect(databaseUrl)
    callback()
  } catch (error) {
    console.log(error)
  }
}
