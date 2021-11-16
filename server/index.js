import mongoose from "mongoose";
import express from "express"
import cors from "cors"
import postRouter from "./routers/router.js";

const app = express()

app.use(cors())
app.use(express.json())

app.use("/posts",postRouter)

const PORT = 8000 | process.env.PORT

const MONGO_URL = "mongodb+srv://varun:vk1923v19kum@cluster0.lkvee.mongodb.net/stuff?retryWrites=true&w=majority"

app.listen(PORT,() => {
    mongoose.connect(MONGO_URL,() => {
        console.log("Connected")
    })
})