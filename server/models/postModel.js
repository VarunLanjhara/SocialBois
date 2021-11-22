import mongoose from "mongoose";

const postSchmea = mongoose.Schema(
  {
    body: String,
    author: String,
    authorId: String,
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
