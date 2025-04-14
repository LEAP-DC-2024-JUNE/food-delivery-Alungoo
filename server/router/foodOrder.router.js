import express from "express";
import {
  createFoodOrder,
  getAllFoodOrders,
  updateFoodOrder,
  getFoodOrderByUserId,
} from "../controllers/food-orderController.js";
export const foodOrderRouter = express.Router();
foodOrderRouter.get("/", getAllFoodOrders);
foodOrderRouter.post("/", createFoodOrder);
foodOrderRouter.patch("/:orderId/status", updateFoodOrder);
foodOrderRouter.get("/:userId", getFoodOrderByUserId);
