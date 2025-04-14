import FoodModel from "../models/food.js";

export const createFood = async (req, res) => {
  console.log(req.body);
  try {
    const result = await FoodModel.create(req.body);
    res.json({
      success: "Successfully added new food",
      result,
    });
  } catch (error) {
    console.error("Error creating food:", error);
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};
export const getFood = async (req, res) => {
  try {
    const result = await FoodModel.find({});
    res.json(result);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      err: err.message,
    });
  }
};
export const updateFoodById = async (req, res) => {
  try {
    const updateFood = await FoodModel.findByIdAndUpdate(
      req.params.id,
      req.body
    );
    if (!updateFood) {
      return res.status(404).json({ message: "Food not found" });
    }
    res.json({
      message: "Food successfully updated",
      result: updateFood,
    });
  } catch (error) {
    res.status(400).json({ message: "Error occurred", error: error.message });
  }
};
export const deleteFoodById = async (req, res) => {
  try {
    const deleteFood = await FoodModel.findByIdAndDelete(req.params.id);
    if (!deleteFood) {
      return res.status(404).json({ message: "Food not found" });
    }
    res.json({ message: "Food deleted successfully" });
  } catch (err) {
    res.status(500).json({
      message: "Error occurred while deleting food",
      error: err.message,
    });
  }
};
