import mongoose from "mongoose";


export const connectDB = async () => {
     try {
          const conn = await mongoose.connect("mongodb+srv://ce23503846:12252021@e-com.xqwno.mongodb.net/?retryWrites=true&w=majority&appName=e-com");
          console.log(`DataBase Connected Successfully: ${conn.connection.host}`);
     }
     catch (err) {
          console.error(`Error: ${err}`);
          process.exit(1);
     }
}