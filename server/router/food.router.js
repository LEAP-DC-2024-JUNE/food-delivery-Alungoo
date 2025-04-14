import express from "express";
import {
  createFood,
  deleteFoodById,
  getFood,
  updateFoodById,
} from "../controllers/food-contoller.js";

export const FoodRouter = express.Router();
FoodRouter.post("/", createFood);
FoodRouter.get("/", getFood);
FoodRouter.patch("/:id", updateFoodById);
FoodRouter.delete("/:id", deleteFoodById);
