import express from "express";
import Product from "../models/productModel.js";


export const getProducts  = async(req, res) => {

    try{
        const data = await Product.find({});
        res.status(200).json(data);
    } catch(err){
        console.log(err);
    }
}

export const getProductById  = async(req, res) => {

    try{
        const data = await Product.findById(req.params.id);
        res.status(200).json(data);
    } catch(err){
        console.log(err);
        res.status(500).send("Server Error");
    }
}

export const createProduct = async (req, res) => {
    try {
        const { name, description, brand, category, price, countInStock, numReviews, isSeller, userId } = req.body;
        console.log(req.body);
        
        // Check if user is a seller
        if (!isSeller) {
            return res.status(403).json({ message: "Only sellers can create products." });
        }

        // Create new product
        const product = new Product({
            name,
            description,
            image:"https://upload.wikimedia.org/wikipedia/commons/a/ac/No_image_available.svg",
            brand,
            category,
            price,
            countInStock,
            rating:0,
            numReviews,
            user: userId, // Assuming products belong to a seller
        });

        const createdProduct = await product.save();
        res.status(201).json(createdProduct);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};


export const updateProduct = async (req, res) => {
    const { name, description, brand, price, countInStock } = req.body;
  
    try {
      const product = await Product.findById(req.params.id);
  
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }
  
      product.name = name || product.name;
      product.description = description || product.description;
      product.brand = brand || product.brand;
      product.price = price || product.price;
      product.countInStock = countInStock || product.countInStock;
  
      const updatedProduct = await product.save();
      res.json(updatedProduct);
    } catch (error) {
      res.status(500).json({ message: "Error updating product", error: error.message });
    }
};