import mongoose from "mongoose"
import SocketModel from "../model/mongoose/socket-model.js"

type callbackType = () => void
export const connnectDB = async (callback: callbackType) => {
  try {
    const databaseUrl = process.env.DATABASE_URL || "mongodb://127.0.0.1:27017/video-conference-web-application"
    await mongoose.connect(databaseUrl)

    const developmentBuild = process.env.NODE_ENV == "DEVELOPMENT"
    if (developmentBuild) await SocketModel.deleteMany({})
    callback()
  } catch (error) {
    console.log(error)
  }
}
