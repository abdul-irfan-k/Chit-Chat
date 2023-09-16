import { createClient } from "redis"

export const redisClient = createClient({
  password: "irfan7676",
})

redisClient.on("error", (error) => {
  console.log("error", error)
})
