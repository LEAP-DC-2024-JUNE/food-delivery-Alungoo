import express from "express";
import {
  createUser,
  forgotPassword,
  loginUser,
  resetPassword,
  updateUser,
} from "../controllers/authController.js";

export const authRouter = express.Router();
authRouter.post("/sign-in", loginUser);
authRouter.post("/sign-up", createUser);
authRouter.patch("/update/:id", updateUser);
authRouter.post("/forget-password", forgotPassword);
authRouter.post("/reset-password/:token", resetPassword);
