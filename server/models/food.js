import mongoose from "mongoose";

const foodSchema = new mongoose.Schema(
  {
    foodName: { type: String, required: true, unique: true },
    price: { type: Number, required: true },
    image: { type: String },
    ingredients: { type: String, required: true },
    category: { type: mongoose.Schema.Types.ObjectId, ref: "food-category" },
  },
  { timestamps: true }
);
const FoodModel = mongoose.model("Food", foodSchema);
export default FoodModel;
