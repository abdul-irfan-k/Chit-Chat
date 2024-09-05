import UserModel from "../src/model/mongoose/user-model"
import mongoose from "mongoose"
import ConnectionModel from "../src/model/mongoose/connections-model"
import ChatRoomModel from "../src/model/mongoose/chat-room-model/chat-room-model"
import { userSeedData } from "./data/user"
import { chatRoomSeedData } from "./data/chatroom"
import { connectionSeedData } from "./data/connection"
import dotEnv from "dotenv"
dotEnv.config()

const config = {
  database: process.env.DATABASE_URL || "",
  dropDatabase: true,
}

const connectDb = async () => {
  await mongoose.connect(config.database)
  console.log("connected to db")
}

// const seederObj = new Seeder(config)
const seedDb = async () => {
  console.log("started mongoose seed")
  await UserModel.deleteMany({})
  await ChatRoomModel.deleteMany({})
  await ConnectionModel.deleteMany({})

  userSeedData.forEach(async (data: any) => {
    const user = new UserModel(data)
    await user.save()
  })
  console.log("added user seed data")

  chatRoomSeedData.forEach(async (data: any) => {
    const chatroom = new ChatRoomModel(data)
    await chatroom.save()
  })
  console.log("added chatroom seed data")

  connectionSeedData.forEach(async (data: any) => {
    const connection = new ConnectionModel(data)
    await connection.save()
  })
  console.log("added connection seed data")
  // await mongoose.disconnect()
}

;(async () => {
  await connectDb()
  await seedDb()
})()
// const data = [
//   {
//     gender: "male",
//     url: "https://images.unsplash.com/photo-1531750026848-8ada78f641c2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2NDQ4Mzd8MHwxfHJhbmRvbXx8fHx8fHx8fDE3MjM5ODk5NTB8&ixlib=rb-4.0.3&q=80&w=400",
//   },
//   {
//     gender: "female",
//     url: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2NDQ4Mzd8MHwxfHJhbmRvbXx8fHx8fHx8fDE3MjM5ODk5NTB8&ixlib=rb-4.0.3&q=80&w=400",
//   },
//   {
//     gender: "male",
//     url: "https://images.unsplash.com/photo-1540569014015-19a7be504e3a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2NDQ4Mzd8MHwxfHJhbmRvbXx8fHx8fHx8fDE3MjM5ODk5NTB8&ixlib=rb-4.0.3&q=80&w=400",
//   },
//   {
//     gender: "female",
//     url: "https://images.unsplash.com/photo-1621786032758-112a390cb7ca?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2NDQ4Mzd8MHwxfHJhbmRvbXx8fHx8fHx8fDE3MjM5OTAxOTB8&ixlib=rb-4.0.3&q=80&w=400",
//   },
//   {
//     gender: "female",
//     url: "https://images.unsplash.com/photo-1650091903034-5f3bb37c35d2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2NDQ4Mzd8MHwxfHJhbmRvbXx8fHx8fHx8fDE3MjM5OTAxOTB8&ixlib=rb-4.0.3&q=80&w=400",
//   },
//   {
//     gender: "male",
//     url: "https://images.unsplash.com/photo-1628619487925-e9b8fc4c6b08?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2NDQ4Mzd8MHwxfHJhbmRvbXx8fHx8fHx8fDE3MjM5OTAxOTB8&ixlib=rb-4.0.3&q=80&w=400",
//   },
//   {
//     gender: "male",
//     url: "https://images.unsplash.com/photo-1599839575729-0009ea68e319?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2NDQ4Mzd8MHwxfHJhbmRvbXx8fHx8fHx8fDE3MjM5OTAxOTB8&ixlib=rb-4.0.3&q=80&w=400",
//   },
//   {
//     gender: "female",
//     url: "https://images.unsplash.com/photo-1581403341630-a6e0b9d2d257?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2NDQ4Mzd8MHwxfHJhbmRvbXx8fHx8fHx8fDE3MjM5OTA1NTV8&ixlib=rb-4.0.3&q=80&w=400",
//   },
//   {
//     gender: "female",
//     url: "https://images.unsplash.com/photo-1475821660373-587d74229161?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2NDQ4Mzd8MHwxfHJhbmRvbXx8fHx8fHx8fDE3MjM5OTA1NTV8&ixlib=rb-4.0.3&q=80&w=400",
//   },
//   {
//     gender: "male",
//     url: "https://images.unsplash.com/photo-1517202383675-eb0a6e27775f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2NDQ4Mzd8MHwxfHJhbmRvbXx8fHx8fHx8fDE3MjM5OTA1NTV8&ixlib=rb-4.0.3&q=80&w=400",
//   },
//   {
//     gender: "male",
//     url: "https://images.unsplash.com/photo-1528892952291-009c663ce843?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2NDQ4Mzd8MHwxfHJhbmRvbXx8fHx8fHx8fDE3MjM5OTA1NTV8&ixlib=rb-4.0.3&q=80&w=400",
//   },
//   {
//     gender: "male",
//     url: "https://images.unsplash.com/photo-1506634572416-48cdfe530110?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2NDQ4Mzd8MHwxfHJhbmRvbXx8fHx8fHx8fDE3MjM5OTI3MTZ8&ixlib=rb-4.0.3&q=80&w=400",
//   },
// ]
