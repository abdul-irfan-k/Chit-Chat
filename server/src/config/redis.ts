import { createClient } from "redis"

export const redisClient = createClient({
  password: "irfan7676",
})

export const connectRedis = async () => {
  try {
    await redisClient.connect()
    const developmentBuild = process.env.NODE_ENV == "DEVELOPMENT"
    if( developmentBuild) redisClient.flushAll()
    console.log("connected redis server")
  } catch (error) {
    console.log("redis error ", error)
  }
}
