import { connectDB } from "./db/config.js";
import Product from "./models/productModel.js";
import products from "./data/products.js";



connectDB();


export const importData = async () => {
    try{

        await Product.deleteMany();
        await Product.importMany(products);

        console.log("Data Imported..");
        process.exit();

    } catch(err){
        console.log(err);
        process.exit(1);
    }
}