import mongoose from "mongoose";

const otpSchema =  new mongoose.Schema(
  {
    email: String,
    code: String,
    expireIn: Number,
  },
  {
    timestamps: true,
  }
);


const otp = new mongoose.model("otp", otpSchema);
export default otp;
