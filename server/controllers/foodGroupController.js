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

export const getFoodCategoryAggregation = async (req, res) => {
  try {
    const foodCategoryGroup = await FoodCategoryModel.aggregate([
      {
        $lookup: {
          from: "foods",
          localField: "_id",
          foreignField: "category",
          as: "foods",
        },
      },
      {
        $project: {
          _id: 1,
          categoryName: 1,
          foods: 1,
        },
      },
    ]);

    res.status(200).json(foodCategoryGroup);
  } catch (err) {
    res.status(500).json({ message: " Error in food category aggregation" });
  }
};
