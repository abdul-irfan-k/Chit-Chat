import mongoose, { Document } from "mongoose"
import bcrypt from "bcrypt"

const userSchema = new mongoose.Schema<userModel>({
  name: { type: String, required: true },
  email: { type: String, required: true },
  userId: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  profileImageUrl: { type: String },
  isBlocked: { type: Boolean, default: false },
  accountVerification: { isVerified: { type: Boolean }, veriftionType: { type: String } },
})

userSchema.pre("save", async function (next) {
  const hashedPassword = await bcrypt.hash(this.password, 12)
  this.password = hashedPassword
  next()
})

userSchema.methods.checkIsCorrectPassword = async function (plainPassword: string) {
  const isCorrectPassword = await bcrypt.compare(plainPassword, this.password)
  return isCorrectPassword
}

const User = mongoose.model<userDoc>("User", userSchema)
export default User

interface checkIsCorrectPassword {
  checkIsCorrectPassword(plainPassword: string): boolean
}

export interface userModel {
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

interface userDoc extends Document, checkIsCorrectPassword, userModel {}
