import mongoose, { Document } from "mongoose"
import bcrypt from "bcrypt"

interface checkIsCorrectPassword {
  checkIsCorrectPassword(plainPassword: string): boolean
}
interface UserInterface extends Document, checkIsCorrectPassword {
  name: string
  email: string
  userId: string
  password: string
  profileImageUrl?: string | undefined
}
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  profileImageUrl: {
    type: String,
  },
})

userSchema.pre("save", async function (next) {
  const hashedPassword = await bcrypt.hash(this.password, 12)
  this.password = hashedPassword
  next()
})

userSchema.methods.checkIsCorrectPassword = async function (
  plainPassword: string,
) {
  const isCorrectPassword =   bcrypt.compare(plainPassword, this.password)
  return isCorrectPassword
}

const User = mongoose.model<UserInterface>("User", userSchema)
export default User
