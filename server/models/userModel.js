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
    },
    pfp: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

const User = mongoose.model("users", userSchema);

export default User;
