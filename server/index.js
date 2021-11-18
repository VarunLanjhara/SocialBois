import mongoose from "mongoose";
import express from "express"
import cors from "cors"
import postRouter from "./routers/router.js";
import dotenv from "dotenv"

const app = express()

dotenv.config({
    path:"./config.env"
})

app.use(cors())
app.use(express.json())

app.use("/posts",postRouter)

const PORT = 8000 | process.env.PORT

const MONGO_URL = process.env.MONGO_URL

app.listen(PORT,() => {
    mongoose.connect(MONGO_URL,() => {
        console.log("Connected")
    })
})