import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "username is required"],
      unique: [true, "username already taken"],
      maxlength: [100, "max length is 100 character"],
      trim: true,
    },

    email: {
      type: String,
      required: [true, "email is required"],
      unique: [true, "email already taken"],
      trim: true,
    },
    password: {
      type: String,
      required: [true, "password is required"],
    },
  },
  { timestamps: true },
);
const User = mongoose.model("User",userSchema)
export default User
