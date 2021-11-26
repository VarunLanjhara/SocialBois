import mongoose from "mongoose";

const postSchmea = mongoose.Schema(
  {
    body: String,
    username: String,
    userId: String,
    userPfp: String,
    file: String,
    likes: {
      type: Array,
      default: [],
    },
    comments: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
);

const Post = mongoose.model("post", postSchmea);
export default Post;
