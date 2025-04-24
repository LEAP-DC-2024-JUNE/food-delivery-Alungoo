import express from "express";
import {
  createFoodOrder,
  getAllFoodOrders,
  updateFoodOrder,
  getFoodOrderByUserId,
} from "../controllers/food-orderController.js";
import { authorization } from "../middleware/authorization.js";
import { authentication } from "../middleware/authentication.js";
export const foodOrderRouter = express.Router();

foodOrderRouter.get("/:userId", getFoodOrderByUserId);
foodOrderRouter
  .route("/")
  .get(authentication, authorization("ADMIN"), getAllFoodOrders);
foodOrderRouter.post("/", createFoodOrder);
foodOrderRouter
  .route("/:orderId/status")
  .patch(authentication, authorization("ADMIN"), updateFoodOrder);
