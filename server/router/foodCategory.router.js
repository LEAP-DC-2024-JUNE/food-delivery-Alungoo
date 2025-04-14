import express from "express";
import {
  createFoodCategory,
  deleteFoodCategory,
  getFoodCategory,
  updateFoodCategory,
} from "../controllers/food-categoryController.js";

export const FoodCategoryRouter = express.Router();
FoodCategoryRouter.post("/", createFoodCategory);
FoodCategoryRouter.get("/", getFoodCategory);
FoodCategoryRouter.patch("/:id", updateFoodCategory);
FoodCategoryRouter.delete("/:id", deleteFoodCategory);
