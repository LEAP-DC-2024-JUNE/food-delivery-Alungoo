import mongoose from "mongoose";
import FoodOrderModel from "../models/food-order.js";

export const createFoodOrder = async (req, res) => {
  try {
    const { user, totalPrice, foodOrderItems, status } = req.body;

    const newOrder = await FoodOrderModel.create({
      user,
      totalPrice,
      foodOrderItems,
      status,
    });

    res.status(201).json({
      message: "Food order created successfully",
      order: newOrder,
    });
    console.log("Server Response:", newOrder);
  } catch (error) {
    console.error("Error creating food order:", error);
    res.status(500).json({ message: "Something went wrong", error });
  }
};
export const getAllFoodOrders = async (req, res) => {
  try {
    const orders = await FoodOrderModel.find()
      .populate("user", "email")
      .populate({
        path: "foodOrderItems.food",
        model: "Food",
      });

    res.status(200).json(orders);
  } catch (error) {
    console.error("Error fetching orders:", error.message);
    res.status(500).json({ error: "Something went wrong!" });
  }
};
export const getFoodOrderByUserId = async (req, res) => {
  const { userId } = req.params;
  console.log(userId);

  try {
    const orders = await FoodOrderModel.find({
      user: userId,
    }).populate({
      path: "foodOrderItems.food",
      model: "Food",
    });

    res.status(200).json(orders);
  } catch (error) {
    console.error("Error fetching orders:", error.message);
    res.status(500).json({ error: "Something went wrong!" });
  }
};

export const updateFoodOrder = async (req, res) => {
  const { orderId } = req.params;
  const { status } = req.body;

  const validStatuses = ["PENDING", "CANCELLED", "DELIVERED"];
  if (!validStatuses.includes(status)) {
    return res.status(400).json({ error: "Invalid status value" });
  }

  try {
    const updatedOrder = await FoodOrderModel.findByIdAndUpdate(
      orderId,
      { status },
      { new: true }
    )
      .populate("user", "email")
      .populate({
        path: "foodOrderItems.food",
        model: "Food",
      });

    if (!updatedOrder) {
      return res.status(404).json({ error: "Order not found" });
    }

    res.status(200).json(updatedOrder);
  } catch (error) {
    console.error("Error updating order status:", error.message);
    res.status(500).json({ error: "Something went wrong!" });
  }
};
