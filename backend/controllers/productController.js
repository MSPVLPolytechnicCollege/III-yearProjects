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