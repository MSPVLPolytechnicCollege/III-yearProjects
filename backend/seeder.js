import { connectDB } from "./db/config.js";
import Product from "./models/productModel.js";
import products from "./data/products.js";


export const importData = async () => {
    try{

        await connectDB();
        // await Product.deleteMany();
        await Product.insertMany(products); // it wait untils this line executes.

        console.log("Data Imported..");
        process.exit();

    } catch(err){
        console.log(err);
        process.exit(1);
    }
}

importData();