import mongoose from "mongoose";

const foodOrderItemSchema = new mongoose.Schema({
  food: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Foods",
  },
  quantity: {
    type: Number,
  },
});

const foodOrderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    totalPrice: { type: Number },
    foodOrderItems: [foodOrderItemSchema],
    status: {
      type: String,
      enum: ["PENDING", "CANCELLED", "DELIVERED"],
    },
  },
  { timestamps: true }
);

const FoodOrderModel = mongoose.model("FoodOrder", foodOrderSchema);
export default FoodOrderModel;
