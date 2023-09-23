import { createClient } from "redis"

export const redisClient = createClient({
  password: "irfan7676",
})



export const connectRedis = async() => {
  try {
    await redisClient.connect()
    console.log('connected redis server')
  } catch (error) {
    console.log('redis error ',error)
  }
}