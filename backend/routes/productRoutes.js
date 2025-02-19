import express from "express";
import { getProducts, getProductById, createProduct, updateProduct } from "../controllers/productController.js";
import { protect } from "../middleware/authHandler.js"

const router = express.Router();

router.get("/", getProducts);
router.get("/:id", getProductById);
router.post("/", protect, createProduct);
router.put("/:id", protect, updateProduct)

export default router;