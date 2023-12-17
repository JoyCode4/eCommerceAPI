import express from "express";
import LikeController from "./like.controller.js";
const router = express.Router();

const likeController = new LikeController();
router.post("/", likeController.likeItems);
router.get("/", likeController.getLikes);

export default router;
