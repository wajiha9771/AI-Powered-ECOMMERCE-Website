import express from "express";
import Order from "../models/Order.js";

const router = express.Router();
router.get("/", async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.status(200).json(orders);
  } catch (error) {
    res
      .status(500)
      .json({
        message: "Failed to fetch orders list from the database.",
        error: error.message,
      });
  }
});
router.get("/user/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const userOrders = await Order.find({ user: userId }).sort({
      createdAt: -1,
    });
    res.status(200).json(userOrders);
  } catch (error) {
    console.error("FETCH USER ORDERS ERROR:", error);
    res
      .status(500)
      .json({
        message: "Failed to fetch your order history.",
        error: error.message,
      });
  }
});
router.post("/", async (req, res) => {
  try {
    const {
      userId,
      customerName,
      email,
      phone,
      shippingAddress,
      orderItems,
      totalAmount,
    } = req.body;
    const newOrder = new Order({
      user: userId,
      customerName,
      email,
      phone,
      shippingAddress,
      orderItems,
      totalAmount,
      status: "Pending",
    });

    const savedOrder = await newOrder.save();
    res.status(201).json(savedOrder);
  } catch (error) {
    console.error(" CHECKOUT ERROR:", error);
    res
      .status(400)
      .json({
        message: "Failed to create the new order.",
        error: error.message,
      });
  }
});
router.put("/:id/status", async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const updatedOrder = await Order.findByIdAndUpdate(
      id,
      { $set: { status } },
      { new: true, runValidators: true },
    );
    if (!updatedOrder) {
      return res
        .status(404)
        .json({ message: "Order not found in the system!" });
    }
    res.status(200).json(updatedOrder);
  } catch (error) {
    res
      .status(400)
      .json({
        message: "Failed to update order status.",
        error: error.message,
      });
  }
});

export default router;
