import express from "express";
import CartController from "./cart.controller.js";
const router = express.Router();
const cartController = new CartController();

router.delete("/:id", cartController.delete);
router.post("/", cartController.add);
router.get("/", cartController.get);

export default router;
