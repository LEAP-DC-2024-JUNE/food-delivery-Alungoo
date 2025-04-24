import express from "express";
import {
  createFoodCategory,
  deleteFoodCategory,
  getFoodCategory,
  updateFoodCategory,
} from "../controllers/food-categoryController.js";
import { authentication } from "../middleware/authentication.js";
import { authorization } from "../middleware/authorization.js";

export const FoodCategoryRouter = express.Router();
FoodCategoryRouter.route("/").post(
  authentication,
  authorization("ADMIN"),
  createFoodCategory
);
FoodCategoryRouter.get("/", getFoodCategory);
FoodCategoryRouter.patch("/:id", updateFoodCategory);
FoodCategoryRouter.delete("/:id", deleteFoodCategory);
