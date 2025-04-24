import express from "express";
import {
  getFoodAggregation,
  getFoodCategoryAggregation,
} from "../controllers/foodGroupController.js";
import { authorization } from "../middleware/authorization.js";
import { authentication } from "../middleware/authentication.js";

export const allFoodByCategoryRouter = express.Router();
allFoodByCategoryRouter.get("/", getFoodAggregation);
allFoodByCategoryRouter
  .route("/admin")
  .get(authentication, authorization("ADMIN"), getFoodCategoryAggregation);
