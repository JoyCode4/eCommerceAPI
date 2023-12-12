import express from "express";
import ProductController from "./product.controller.js";
import upload from "../../middlwares/fileupload.middleware.js";
const productController = new ProductController();

const router = express.Router();

router.get("/", productController.getAllProducts);
router.get("/filter", productController.filterProducts);
router.post("/", upload.single("imageUrl"), productController.addProduct);
router.post("/rate", productController.rateProduct);
router.get("/avgprice", productController.getAveragePrice);
router.get("/avgrating", productController.getAverageRating);
router.get("/countofrating", productController.getCountOfRatings);
router.get("/:id", productController.getOneProduct);

export default router;
