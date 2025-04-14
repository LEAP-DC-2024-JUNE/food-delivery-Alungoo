import express from "express";
import { createUser, loginUser } from "../controllers/authController.js";

export const authRouter = express.Router();
authRouter.post("/sign-in", loginUser);
authRouter.post("/sign-up", createUser);
