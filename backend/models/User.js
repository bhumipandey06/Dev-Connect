const mongoose = require ("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    isVerified: {
      type: Boolean,
      default: false, // becomes true only after OTP verification
    },
    otp: {
      type: String, // stores the OTP sent via email
    },
    otpExpiry: {
      type: Date, // expiry time for OTP (e.g., 5-10 min after generation)
    },
    createdProfiles: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Profile", // references the Profile model
      },
    ],
  },
  { timestamps: true }
);

const User= mongoose.model("User", userSchema);

module.exports=User
