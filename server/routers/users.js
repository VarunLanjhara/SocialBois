import express from "express";
import mognoose from "mongoose";
import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const router = express.Router();

router.post("/signin", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      res.status(404).json("No user found");
    } else {
      const hashedpass = await bcrypt.compare(password, user.password);
      if (!hashedpass) {
        res.status(400).json("Invalid creadentials");
      } else {
        const token = jwt.sign(
          {
            email: user.email,
            id: user._id,
          },
          "blahblah",
          { expiresIn: "4h" }
        );
        res.json({
          token,
        });
      }
    }
  } catch (err) {
    console.log(err);
  }
});

router.post("/signup", async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    const userbyusername = await User.findOne({ username });
    if (user || userbyusername) {
      console.log("User already exists");
    } else {
      const hashpass = await bcrypt.hash(password, 12);
      const result = await User.create({
        email: email,
        password: hashpass,
        username: username,
      });
      const token = jwt.sign(
        {
          email: result.email,
          id: result._id,
        },
        "blahblah",
        { expiresIn: "4h" }
      );
      res.json({
        token,
      });
      res.json(result);
    }
  } catch (err) {
    console.log(err);
  }
});

//getting a user by its username :)

router.get("/:name", async (req, res) => {
  const user = await User.findOne({
    username: req.params.name,
  });
  if (user) {
    res.json(user);
  } else {
    res.json("No user found");
  }
});

//updating user :)

router.put("/:id", async (req, res) => {
  const user = await User.findByIdAndUpdate(req.params.id, {
    username: req.body.username,
    email: req.body.email,
    bio: req.body.bio,
    pfp: req.body.pfp,
  });
  res.json(user);
});

//follow following stuff :)

router.put("/:userId/follow", async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    const currentuser = await User.findById(req.body.userId);
    if (!user.followers.includes(req.body.userId)) {
      await user.updateOne({
        $push: { followers: req.body.userId },
      });
      await currentuser.updateOne({
        $push: { following: req.params.userId },
      });
      const userboi = await User.findById(req.params.userId);
      res.json(userboi);
    } else {
      await user.updateOne({
        $pull: { followers: req.body.userId },
      });
      await currentuser.updateOne({
        $pull: { following: req.params.userId },
      });
      const userboi2 = await User.findById(req.params.userId);
      res.json(userboi2);
    }
  } catch (err) {
    console.log(err);
  }
});

//getting user by id :)

router.get("/getuser/:userid", async (req, res) => {
  try {
    const user = await User.findById(req.params.userid);
    res.json(user);
  } catch (err) {
    console.log(err);
  }
});

export default router;
