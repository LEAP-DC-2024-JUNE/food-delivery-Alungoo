import express from "express";
import { connectDB } from "./connectDB.js";
import cors from "cors";
import { FoodCategoryRouter } from "./router/foodCategory.router.js";
import { FoodRouter } from "./router/food.router.js";
import { allFoodByCategoryRouter } from "./router/foodGroup.router.js";
import { foodOrderRouter } from "./router/foodOrder.router.js";
import { authRouter } from "./router/auth.router.js";

const server = express();
const PORT = process.env.PORT || 4000;
console.log(PORT);

connectDB();
server.use(express.json());
server.use(cors());
server.use("/food-category", FoodCategoryRouter);
server.use("/foods", FoodRouter);
server.use("/food-group", allFoodByCategoryRouter);
server.use("/food-order", foodOrderRouter);
server.use("/auth", authRouter);

server.listen(PORT, () => {
  console.log(`Server started at PORT: ${PORT}`);
});
