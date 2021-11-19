import express from "express";
import mognoose from "mongoose";
import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const router = express.Router();

router.post("/singin", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      res.status(404).json("No user found");
    } else {
      const hashedpass = bcrypt.compare(password, user.password);
      if (!hashedpass) {
        res.status(400).json("Invalid creadentials");
      } else {
        const token = jwt.sign(
          {
            email: user.email,
          },
          "blahblah",
          { expiresIn: "4h" }
        );
        res.json({
          result: user,
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
    if (user) {
      res.json("User already exists");
    } else {
      const hashpass = bcrypt.hash(password, 12);
      const result = User.create({
        email,
        password: hashpass,
        username,
      });
      const token = jwt.sign(
        {
          email: user.email,
        },
        "blahblah",
        { expiresIn: "4h" }
      );
      res.json({
        result: user,
        token,
      });
      res.json(result);
    }
  } catch (err) {
    console.log(err);
  }
});

export default router;
