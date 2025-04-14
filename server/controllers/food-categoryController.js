import FoodCategoryModel from "../models/food-category.js";

export const createFoodCategory = async (req, res) => {
  try {
    const category = await FoodCategoryModel.create(req.body);
    res.status(201).json({
      message: "Food category created successfully",
      data: category,
    });
  } catch (err) {
    res.status(400).json({
      message: "Error creating food category",
      error: err.message,
    });
  }
};
export const getFoodCategory = async (req, res) => {
  try {
    const category = await FoodCategoryModel.find({});
    res.json(category);
  } catch (error) {
    console.log(error, "error garlaa shoo");
  }
};
export const updateFoodCategory = async (req, res) => {
  try {
    const updateCategory = await FoodCategoryModel.findByIdAndUpdate(
      req.params.id,
      req.body
    );
    if (!updateCategory) {
      return res.status(404).json({ message: "Food Category not found" });
    }
    res.json({
      message: "Food Category updated successfully",
      data: updateCategory,
    });
  } catch (err) {
    res.status(500).json({
      message: "Error updating food category",
      error: err.message,
    });
  }
};
export const deleteFoodCategory = async (req, res) => {
  try {
    const deleteCategory = await FoodCategoryModel.findByIdAndDelete(
      req.params.id
    );
    if (!deleteCategory) {
      return res.status(404).json({ message: "Food Category not found" });
    }
    res.json({
      message: "Food Category deleted successfully",
      data: deleteCategory,
    });
  } catch (err) {
    res.status(500).json({
      message: "Error deleting food category",
      error: err.message,
    });
  }
};
