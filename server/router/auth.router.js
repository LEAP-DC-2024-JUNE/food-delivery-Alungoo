import express from "express";
import {
  createUser,
  loginUser,
  updateUser,
} from "../controllers/authController.js";

export const authRouter = express.Router();
authRouter.post("/sign-in", loginUser);
authRouter.post("/sign-up", createUser);
authRouter.patch("/update/:id", updateUser);
