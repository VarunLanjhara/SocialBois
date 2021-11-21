import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    followers: {
      type: Array,
      default: [],
    },
    following: {
      type: Array,
      default: [],
    },
    bio: {
      type: String,
      default: "I am dumb",
      required: true,
    },
    pfp: {
      type: String,
      default: "",
      required: true
    },
  },
  { timestamps: true }
);

const User = mongoose.model("users", userSchema);

export default User;
