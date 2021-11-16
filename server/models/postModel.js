import mongoose from "mongoose";

const postSchmea = mongoose.Schema({
    title:String,
    body:String,
    likes:{
        type:Number
    },
    author:String,
    tags:[String],
    file:String
}, { timestamps: true });

const Post = mongoose.model("post",postSchmea)
export default Post