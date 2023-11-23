import mongoose, { Document, Model } from "mongoose"
import bcrypt from "bcrypt"

interface userSchema {
  name: string
  email: string
  userId: string
  password: string
  profileImageUrl?: string | undefined
  isBlocked: boolean
  accountVerification: {
    isVerified: boolean
    veriftionType: string | "phone" | "email"
  }
}

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    userId: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    profileImageUrl: { type: String },
    isBlocked: { type: Boolean, default: false },
    accountVerification: { isVerified: { type: Boolean }, veriftionType: { type: String } },
  },
  {
    timestamps: true,
  },
)

userSchema.pre("save", async function (next) {
  const hashedPassword = await bcrypt.hash(this.password, 12)
  this.password = hashedPassword
  next()
})

userSchema.methods.checkIsCorrectPassword = async function (plainPassword: string) {
  const isCorrectPassword = await bcrypt.compare(plainPassword, this.password)
  return isCorrectPassword
}

userSchema.methods.changePassword = async function (password: string) {
  const hashedPassword = await bcrypt.hash(password, 12)
  this.password = hashedPassword
  return { isValid: true, isChangedPassword: true }
}

userSchema.statics.getAllChatUser = async function (myUserId: string) {
  try {
    const id = new mongoose.Types.ObjectId(myUserId)
    const allChatUsers = await this.aggregate([
      { $match: { _id: { $ne: id } } },
      {
        $lookup: {
          from: "chatrooms",
          let: { receiverId: "$_id" },
          pipeline: [
            {
              $match: {
                $expr: { $and: [{ $in: ["$$receiverId", "$userIds"] }, { $in: [id, "$userIds"] }] },
              },
            },
            { $project: { chatRoomId: "$_id", _id: 0 } },
          ],
          as: "chatRoom",
        },
      },
      { $unwind: "$chatRoom" },
      { $project: { name: 1, email: 1, userId: 1, chatRoom: "$chatRoom" } },
    ])
    return allChatUsers
  } catch (error) {
    console.log(error)
  }
}
userSchema.statics.getUserDetail = async function (myUserId: string) {
  try {
    const id = new mongoose.Types.ObjectId(myUserId)
    const userDetail = await this.aggregate([{ $match: { _id: id } }, { $project: { password: 0 } }])
    return userDetail[0]
  } catch (error) {
    console.log(error)
  }
}

interface methodInterface {
  checkIsCorrectPassword(plainPassword: string): boolean
  changePassword(password: string): { isValid: boolean; isChangedPassword: boolean }
}

interface staticInterface extends Model<UserDoc> {
  getAllChatUser(myUserId: string): any
  getUserDetail(myUserId: string): any
}

export interface UserDoc extends userSchema, Document, methodInterface {}
const UserModel = mongoose.model<UserDoc, staticInterface>("User", userSchema)
export default UserModel
