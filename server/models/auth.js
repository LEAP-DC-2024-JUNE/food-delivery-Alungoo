import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,

      required: [true, "Please provide your email"],
    },
    password: {
      type: String,
      required: [true, "Please provide your password"],
    },
    phoneNumber: {
      type: String,
    },
    address: {
      type: String,
    },
    role: {
      type: String,
      enum: ["ADMIN", "USER"],
    },
    orderedFoods: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "food-order",
    },
    isVerified: {
      type: Boolean,
    },
  },
  { timestamps: true }
);

const UserModel = mongoose.model("User", userSchema);
export default UserModel;
