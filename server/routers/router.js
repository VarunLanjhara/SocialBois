import express from "express";
import Post from "../models/postModel.js";
import mognoose from "mongoose";

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

router.put("/:id", async (req, res) => {
  const id = req.params.id;
  const post = req.body;

  if (!mognoose.Types.ObjectId.isValid(id)) {
    return res.status(403).json("Post id doesnt exists");
  } else {
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
    await Post.findByIdAndDelete(id, () => {
      res.json("Post deleted sucessfuly");
    });
  }
});

//like post

router.put("/:id/like", async (req, res) => {
  const id = req.params.id;
  const post = await Post.findById(id);
  if (!req.body.userId) {
    return res.json("Unautharised");
  } else {
    if (post.likes.includes(req.body.userId)) {
      await post.updateOne({
        $pull: { likes: req.body.userId },
      });
      res.json("Like removed succesfully");
    } else {
      await post.updateOne({
        $push: { likes: req.body.userId },
      });
      res.json("Like added succesfully");
    }
  }
});

//trending posts

router.get("/trending", async (req, res) => {
  try {
    const postsStuff = await Post.find()
      .sort({
        likes: -1,
      })
      .limit(5);
    res.json(postsStuff);
  } catch (err) {
    console.log(err);
  }
});

//get single post

router.get("/:postid", async (req, res) => {
  try {
    const postsStuff = await Post.findById(req.params.postid);
    if (!postsStuff) {
      res.json("No post found");
    } else {
      res.json(postsStuff);
    }
  } catch (err) {
    console.log(err);
  }
});

//getting current user posts

router.get("/currentboiposts/:userId", async (req, res) => {
  try {
    const userposts = await Post.find({
      authorId: req.params.userId,
    });
    if (userposts) {
      res.send(userposts);
    } else {
      res.json("No Posts Found Shit");
    }
  } catch (err) {
    console.log(err);
  }
});

export default router;
