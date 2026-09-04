import express from "express";
import stripe from "../config/stripe.js";
import Order from "../models/Order.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// CREATE STRIPE CHECKOUT SESSION

router.post("/create-checkout-session", async (req, res) => {
  try {
    const { amount, orderData } = req.body;

    if (!amount || Number(amount) <= 0) {
      return res.status(400).json({
        message: "A valid payment amount is required.",
      });
    }

    if (!orderData) {
      return res.status(400).json({
        message: "Order information is required.",
      });
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",

      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: "Nex-Style Order",
            },
            unit_amount: Math.round(Number(amount) * 100),
          },
          quantity: 1,
        },
      ],

      metadata: {
        orderData: JSON.stringify(orderData),
      },

      success_url:
        "http://localhost:5173/checkout-success?session_id={CHECKOUT_SESSION_ID}",

      cancel_url: "http://localhost:5173/checkout",
    });

    res.status(200).json({
      sessionId: session.id,
      url: session.url,
    });
  } catch (error) {
    console.error("STRIPE CHECKOUT ERROR:", error);

    res.status(500).json({
      message: "Unable to create Stripe checkout session.",
      error: error.message,
    });
  }
});

// VERIFY STRIPE PAYMENT + CREATE ORDER
router.post("/verify-payment", protect, async (req, res) => {
  try {
    const { sessionId } = req.body;

    if (!sessionId) {
      return res.status(400).json({
        message: "Stripe session ID is required.",
      });
    }

    // Retrieve Stripe Checkout Session
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    // Make sure payment was actually completed
    if (session.payment_status !== "paid") {
      return res.status(400).json({
        message: "Stripe payment has not been completed.",
      });
    }

    // Get order data stored inside Stripe metadata
    if (!session.metadata?.orderData) {
      return res.status(400).json({
        message: "Order information was not found in Stripe session.",
      });
    }

    const orderData = JSON.parse(session.metadata.orderData);

    // Prevent duplicate orders
    const existingOrder = await Order.findOne({
      stripeSessionId: session.id,
    });

    if (existingOrder) {
      return res.status(200).json({
        message: "Order already exists for this Stripe payment.",
        order: existingOrder,
      });
    }

    // Use Stripe's actual paid amount
    const paidAmount = session.amount_total / 100;

    const newOrder = new Order({
      user: req.user?.id || req.user?._id || orderData.userId,

      customerName: orderData.customerName,
      email: orderData.email,
      phone: orderData.phone,
      shippingAddress: orderData.shippingAddress,

      paymentMethod: "Card",

      orderItems: orderData.orderItems,

      totalAmount: paidAmount,

      status: "Pending",

      stripeSessionId: session.id,
    });

    const savedOrder = await newOrder.save();

    res.status(201).json({
      message: "Stripe payment verified and order created successfully.",
      order: savedOrder,
    });
  } catch (error) {
    console.error("STRIPE PAYMENT VERIFICATION ERROR:", error);

    res.status(500).json({
      message: "Unable to verify Stripe payment and create order.",
      error: error.message,
    });
  }
});

export default router;
