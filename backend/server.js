import express from "express";
import dotenv from "dotenv";
import  cookieParser from "cookie-parser";
import { connectDB } from "./db/config.js";
import productRoutes from "./routes/productRoutes.js"
import authRoutes from "./routes/authRoutes.js";
import { errorHandler, notFound } from "./middleware/errorHandler.js";
import cartRoutes from "./routes/cartRoutes.js";
import cors from "cors";
import { v2 as cloudinary } from 'cloudinary';
import shippingRoutes from "./routes/shippingRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import Razorpay from 'razorpay';


// express declaration
const app = express();


// env file configuration
dotenv.config();


// url data encoded
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
app.use(cors({
     origin: "https://ecom-gamma-peach.vercel.app/" || 'http://localhost:5173',
     credentials: true
}));


// Razor Pay
export const razorpay = new Razorpay({
     key_id: process.env.RAZOR_KEY_ID,  // Replace with your Razorpay Test Key ID
     key_secret: process.env.RAZOR_KEY_SECRET,  // Replace with your Razorpay Test Key Secret
   
});


// Configure Cloudinary
cloudinary.config({ 
     cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
     api_key: process.env.CLOUDINARY_API_KEY, 
     api_secret: process.env.CLOUDINARY_API_SECRET 
});

export default cloudinary;


// PORT
const PORT = process.env.PORT || 5000; // port to run a server.



app.get("/", (req, res) => {
     res.send("Hello World!");
});


app.use("/api/products", productRoutes); // route link - http://localhost:5000/api/products/
app.use("/api/users/", authRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/shipping", shippingRoutes);
app.use('/api/payment', paymentRoutes);
app.use("/api/orders", orderRoutes);



// Error Handler
app.use(notFound);
app.use(errorHandler);


app.listen(PORT, () => {
     console.log(`Server is running on port : ${PORT}`);
     connectDB();
});