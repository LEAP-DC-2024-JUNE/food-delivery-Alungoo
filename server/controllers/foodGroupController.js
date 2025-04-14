import FoodModel from "../models/food.js";
import FoodCategoryModel from "../models/food-category.js";

export const getFoodAggregation = async (req, res) => {
  try {
    const foodAggregation = await FoodModel.aggregate([
      {
        $group: { _id: "$category", foods: { $push: "$$ROOT" } },
      },
    ]);
    const result = await FoodCategoryModel.populate(foodAggregation, {
      path: "_id",
      select: "categoryName",
    });
    res.status(200).json(result);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error in food aggregation" });
  }
};
