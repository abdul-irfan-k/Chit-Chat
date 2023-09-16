import mongoose from "mongoose"
import bcrypt from "bcrypt"


interface otpInterface {
    otp: string
    email?: string | undefined
    phone?: string | undefined
    verificationType?: "passwordReset"|"userAuthenticate"|string | undefined
    createdAt?: Date | undefined
}
const otpSchema = new mongoose.Schema({
  email: { type: String },
  phone: { type: String },
  otp: { type: String, required: true },
  verificationType: {
    type: String,
  },
  createdAt: { type: Date, index: { expires: 300 } },
})

otpSchema.pre("save", async function (next) {
  const hashedOtp = await bcrypt.hash(this.otp, 12)
  this.otp = hashedOtp
  next()
})

otpSchema.methods.verifyOtp = function (plainOtp: string) {
  bcrypt.compare(plainOtp, this.otp)
}


const Otp =  mongoose.model<otpInterface>("Otp",otpSchema)
export default Otp