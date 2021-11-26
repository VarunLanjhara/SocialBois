import mongoose from "mongoose";
import express from "express";
import cors from "cors";
import postRouter from "./routers/router.js";
import dotenv from "dotenv";
import userRouter from "./routers/users.js";

const app = express();

dotenv.config({
  path: "./config.env",
});

app.use(cors());
app.use(express.json());
app.use("/posts", postRouter);
app.use("/users", userRouter);

const PORT = process.env.PORT || 8000;

const MONGO_URL = process.env.MONGO_URL;

app.listen(PORT, () => {
  mongoose.connect(MONGO_URL, () => {
    console.log("Connected");
  });
});
