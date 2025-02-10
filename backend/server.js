import express from "express";
import dotenv from "dotenv";
import  cookieParser from "cookie-parser";
import { connectDB } from "./db/config.js";
import productRoutes from "./routes/productRoutes.js"
import authRoutes from "./routes/authRoutes.js";
import { errorHandler, notFound } from "./middleware/errorHandler.js";
import cartRoutes from "./routes/cartRoutes.js";
import cors from "cors";


// express declaration
const app = express();


// env file configuration
dotenv.config();


// url data encoded
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
app.use(cors({
     origin: "http://localhost:5173",
     credentials: true
}));

// PORT
const PORT = 5000; // port to run a server.

app.get("/", (req, res) => {
     res.send("Hello World!");
});


app.use("/api/products", productRoutes); // route link - http://localhost:5000/api/products/
app.use("/api/users/", authRoutes);
app.use("/api/cart/", cartRoutes)


// Error Handler
app.use(notFound);
app.use(errorHandler);


app.listen(PORT, () => {
     console.log(`Server is running on port : ${PORT}`);
     connectDB();
});