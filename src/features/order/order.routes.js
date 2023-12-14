import express from "express";
import OrderController from "./order.controller.js";

const router = express.Router();
const orderController = new OrderController();

router.post("/", orderController.placeOrder);

export default router;
