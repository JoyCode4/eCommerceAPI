import express from "express";
import ProductController from "./product.controller.js";
import upload from "../../middlwares/fileupload.middleware.js";
const productController = new ProductController();

const router = express.Router();

router.get("/", productController.getAllProducts);
router.post("/", upload.single("imageUrl"), productController.addProduct);
router.get("/:id", productController.getOneProduct);
export default router;
