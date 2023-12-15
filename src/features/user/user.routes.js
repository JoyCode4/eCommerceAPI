import express from "express";
import UserController from "./user.controller.js";
import jwtAuth from "../../middlwares/jwt.middleware.js";
const router = express.Router();
const userController = new UserController();

router.post("/signup", userController.signUp);
router.post("/signin", userController.signIn);
router.put("/resetpassword", jwtAuth, userController.resetPassword);

export default router;
