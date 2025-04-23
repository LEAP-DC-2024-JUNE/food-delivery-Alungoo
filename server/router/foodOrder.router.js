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
  .get(authentication, authorization("ADMIN"), getFoodOrderByUserId);
foodOrderRouter
  .route("/")
  .get(authentication, authorization("ADMIN"), getAllFoodOrders);
foodOrderRouter
  .route("/")
  .post(authentication, authorization("ADMIN"), createFoodOrder);
foodOrderRouter
  .route("/:orderId/status")
  .patch(authentication, authorization("ADMIN"), updateFoodOrder);
