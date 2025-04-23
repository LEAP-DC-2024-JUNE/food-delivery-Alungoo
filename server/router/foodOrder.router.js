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

foodOrderRouter
  .route("/:userId")
  .get(authentication, authorization("USER"), getFoodOrderByUserId);
foodOrderRouter
  .route("/")
  .get(authentication, authorization("ADMIN"), getAllFoodOrders);
foodOrderRouter
  .route("/")
  .post(authentication, authorization("USER"), createFoodOrder);
foodOrderRouter
  .route("/:orderId/status")
  .patch(authentication, authorization("ADMIN"), updateFoodOrder);
