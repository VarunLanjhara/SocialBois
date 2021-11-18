import mongoose from "mongoose";

const postSchmea = mongoose.Schema({
    body:String,
    likes:{
        type:Number
    },
    author:String,
    file:String
}, { timestamps: true });

const Post = mongoose.model("post",postSchmea)
export default Post