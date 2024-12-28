import express from "express";
import Product from "../models/productModel.js";


export const getProducts  = async() => {

    try{
        const data = await Product.find({});
        res.status(200);
    } catch(err){
        console.log(err);
    }
}