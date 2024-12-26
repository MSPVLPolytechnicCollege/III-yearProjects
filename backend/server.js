import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import  cookieParser from "cookie-parser";
import { connectDB } from "./db/config.js";


// express declaration
const app = express();

// env file configuration
dotenv.config();


// url data encoded
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());


// PORT
const PORT = process.env.PORT || 5000;


app.get("/", (req, res) => {
     res.send("Hello World!");
});

app.listen(PORT, () => {
     console.log(`Server is running on port : ${PORT}`);
     connectDB();
});