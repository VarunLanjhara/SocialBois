import express from "express";
import Post from "../models/postModel.js";
import mognoose from "mongoose";
import auth from "../middlewares/auth.js";

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

  auth();

  try {
    await newPost.save();
    res.json(newPost);
  } catch (err) {
    console.log(err);
  }
});

//update post

router.put("/:id", async (req, res) => {
  const id = req.params.id;
  const post = req.body;

  if (!mognoose.Types.ObjectId.isValid(id)) {
    return res.status(403).json("Post id doesnt exists");
  } else {
    auth();
    const updatedpost = await Post.findByIdAndUpdate(id, post, { new: true });
    res.json(updatedpost);
  }
});

//delete post

router.delete("/:id", async (req, res) => {
  const id = req.params.id;

  if (!mognoose.Types.ObjectId.isValid(id)) {
    return res.status(403).json("Post id doesnt exists");
  } else {
    auth();
    await Post.findByIdAndDelete(id, () => {
      res.json("Post deleted sucessfuly");
    });
  }
});

//like post

router.put("/:id/like", async (req, res) => {
  auth();
  const id = req.params.id;
  const post = await Post.findById(id);
  if (!req.userId) {
    return res.json("Unautharised");
  }
  await post.updateOne({
    $push: { likes: req.userId },
  });
  res.json("Like added succesfully idiot");
});

export default router;
