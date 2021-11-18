import express from "express";
import Post from "../models/postModel.js";
import mognoose from "mongoose"

const router = express.Router();

//get posts

router.get("/", async (req, res) => {
  try {
    const postsStuff = await Post.find().sort({
      createdAt: -1,
    });
    res.json(postsStuff);
  } catch (err) {
    console.log(err);
  }
});

//create post

router.post("/", async (req, res) => {
  const post = req.body;

  const newPost = new Post(post);

  try {
    await newPost.save();
    res.json(newPost);
  } catch (err) {
    console.log(err);
  }
});

//update post

router.put("/:id",async (req,res) => {
    const id = req.params.id
    const post = req.body

    if (!mognoose.Types.ObjectId.isValid(id)){
        return res.status(403).json("Post id doesnt exists")
    }
    else{
        const updatedpost = await Post.findByIdAndUpdate(id,post,{new:true})
        res.json(updatedpost)
    }
})

export default router;
