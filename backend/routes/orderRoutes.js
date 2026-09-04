import express from "express";
import Order from "../models/Order.js";
import Product from "../models/Product.js";
import { protect } from "../middleware/authMiddleware.js";
import { sendToUser } from "../config/websocket.js";
const router = express.Router();

// GET ALL ORDERS
router.get("/", async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });

    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch orders list from the database.",
      error: error.message,
    });
  }
});

// GET USER ORDERS
router.get("/user/:userId", async (req, res) => {
  try {
    const { userId } = req.params;

    const userOrders = await Order.find({ user: userId }).sort({
      createdAt: -1,
    });

    res.status(200).json(userOrders);
  } catch (error) {
    console.error("FETCH USER ORDERS ERROR:", error);

    res.status(500).json({
      message: "Failed to fetch your order history.",
      error: error.message,
    });
  }
});
// GET SINGLE ORDER
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const order = await Order.findById(id);

    if (!order) {
      return res.status(404).json({
        message: "Order not found.",
      });
    }

    res.status(200).json(order);
  } catch (error) {
    console.error("FETCH SINGLE ORDER ERROR:", error);

    res.status(400).json({
      message: "Failed to fetch order.",
      error: error.message,
    });
  }
});

// CREATE ORDER
router.post("/", protect, async (req, res) => {
  try {
    const {
      userId,
      customerName,
      email,
      phone,
      shippingAddress,
      orderItems,
      totalAmount,
      paymentMethod,
    } = req.body;

    // INVENTORY VALIDATION
    if (!orderItems || !Array.isArray(orderItems) || orderItems.length === 0) {
      return res.status(400).json({
        message: "Your order does not contain any products.",
      });
    }

    const updatedProducts = [];

    try {
      for (const item of orderItems) {
        const productId = item.productId;
        const quantity = Number(item.quantity);

        if (!productId || !quantity || quantity <= 0) {
          throw new Error("Invalid product or quantity in your order.");
        }

        const updatedProduct = await Product.findOneAndUpdate(
          {
            _id: productId,
            stock: { $gte: quantity },
          },
          {
            $inc: { stock: -quantity },
          },
          {
            new: true,
          },
        );

        if (!updatedProduct) {
          throw new Error(
            `Insufficient stock for "${item.name || "this product"}".`,
          );
        }

        updatedProducts.push({
          productId,
          quantity,
        });
      }
    } catch (inventoryError) {
      // ROLLBACK STOCK IF ANY ITEM FAILS
      for (const item of updatedProducts) {
        await Product.findByIdAndUpdate(item.productId, {
          $inc: { stock: item.quantity },
        });
      }

      return res.status(400).json({
        message: inventoryError.message,
      });
    }
    // CREATE ORDER
    const newOrder = new Order({
      user: userId,
      customerName,
      email,
      phone,
      shippingAddress,
      orderItems,
      totalAmount,
      paymentMethod,
      status: "Pending",
    });

    try {
      const savedOrder = await newOrder.save();

      res.status(201).json(savedOrder);
    } catch (orderError) {
      // ROLLBACK STOCK IF ORDER CREATION FAILS
      for (const item of updatedProducts) {
        await Product.findByIdAndUpdate(item.productId, {
          $inc: { stock: item.quantity },
        });
      }

      throw orderError;
    }
  } catch (error) {
    console.error("CHECKOUT ERROR:", error);

    res.status(400).json({
      message: "Failed to create the new order.",
      error: error.message,
    });
  }
});

// Update Order Status

router.put("/:id/status", async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const updatedOrder = await Order.findByIdAndUpdate(
      id,
      { $set: { status } },
      {
        new: true,
        runValidators: true,
      },
    );

    if (!updatedOrder) {
      return res.status(404).json({
        message: "Order not found in the system!",
      });
    }

    // REAL-TIME WEBSOCKET EVENT

    sendToUser(updatedOrder.user, {
      type: "ORDER_STATUS_UPDATED",
      orderId: updatedOrder._id.toString(),
      userId: updatedOrder.user,
      status: updatedOrder.status,
      message: `Your order status has been updated to ${updatedOrder.status}.`,
    });

    res.status(200).json(updatedOrder);
  } catch (error) {
    res.status(400).json({
      message: "Failed to update order status.",
      error: error.message,
    });
  }
});

router.put("/:id/cancel", protect, async (req, res) => {
  try {
    const { id } = req.params;

    const order = await Order.findById(id);

    if (!order) {
      return res.status(404).json({
        message: "Order not found.",
      });
    }
    // USER AUTHORIZATION

    if (order.user !== req.user._id.toString()) {
      return res.status(403).json({
        message: "You are not authorized to cancel this order.",
      });
    }

    // ORDER STATUS VALIDATION

    if (["Shipped", "Delivered", "Cancelled"].includes(order.status)) {
      return res.status(400).json({
        message: `Order cannot be cancelled because its status is ${order.status}.`,
      });
    }
    // RESTORE INVENTORY
    try {
      for (const item of order.orderItems) {
        if (!item.productId || !item.quantity) {
          continue;
        }

        await Product.findByIdAndUpdate(
          item.productId,
          {
            $inc: {
              stock: Number(item.quantity),
            },
          },
          {
            new: true,
          },
        );
      }
    } catch (inventoryError) {
      console.error("RESTORE INVENTORY ERROR:", inventoryError);

      return res.status(500).json({
        message:
          "Order could not be cancelled because inventory restoration failed.",
        error: inventoryError.message,
      });
    }

    // MARK ORDER AS CANCELLED
    order.status = "Cancelled";

    const updatedOrder = await order.save();

    res.status(200).json(updatedOrder);
  } catch (error) {
    console.error("CANCEL ORDER ERROR:", error);

    res.status(400).json({
      message: "Failed to cancel order.",
      error: error.message,
    });
  }
});
// DELETE ORDER
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const deletedOrder = await Order.findByIdAndDelete(id);

    if (!deletedOrder) {
      return res.status(404).json({
        message: "Order not found in the system!",
      });
    }

    res.status(200).json({
      message: "Order deleted successfully.",
      order: deletedOrder,
    });
  } catch (error) {
    res.status(400).json({
      message: "Failed to delete order.",
      error: error.message,
    });
  }
});

export default router;
