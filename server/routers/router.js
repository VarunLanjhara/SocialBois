import express from "express";
import Post from "../models/postModel.js";

const router = express.Router()

router.get("/",async(req,res) => {
    try{
        const postsStuff = await Post.find()
        res.json(postsStuff)
    }
    catch(err){
        console.log(err)
    }
})

router.post("/",async (req,res) => {

    const post = req.body

    const newPost = new Post(post)

    try{
        await newPost.save()
        res.json(newPost)
    }
    catch(err){
        console.log(err)
    }
})

export default router