import express from "express";
import { getFoodAggregation } from "../controllers/foodGroupController.js";

export const allFoodByCategoryRouter = express.Router();
allFoodByCategoryRouter.get("/", getFoodAggregation);
