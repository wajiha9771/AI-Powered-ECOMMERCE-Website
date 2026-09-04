import stripe from "../config/stripe.js";
import Order from "../models/Order.js";

export const stripeWebhookHandler = async (req, res) => {
  const signature = req.headers["stripe-signature"];

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET,
    );
  } catch (error) {
    console.error("STRIPE WEBHOOK SIGNATURE ERROR:", error.message);

    return res.status(400).send(`Webhook Error: ${error.message}`);
  }

  try {
    if (event.type === "checkout.session.completed") {
      const session = event.data.object;

      if (session.payment_status !== "paid") {
        return res.status(200).json({ received: true });
      }

      if (!session.metadata?.orderData) {
        console.error("STRIPE WEBHOOK: Order data not found.");
        return res.status(400).json({
          message: "Order data not found in Stripe session metadata.",
        });
      }

      const existingOrder = await Order.findOne({
        stripeSessionId: session.id,
      });

      if (existingOrder) {
        console.log("STRIPE WEBHOOK: Order already exists:", existingOrder._id);

        return res.status(200).json({ received: true });
      }

      const orderData = JSON.parse(session.metadata.orderData);

      const newOrder = new Order({
        user: orderData.userId || null,

        customerName: orderData.customerName,
        email: orderData.email,
        phone: orderData.phone,
        shippingAddress: orderData.shippingAddress,

        paymentMethod: "Card",

        orderItems: orderData.orderItems,

        totalAmount: session.amount_total / 100,

        status: "Pending",

        stripeSessionId: session.id,
      });

      const savedOrder = await newOrder.save();

      console.log(
        "STRIPE WEBHOOK: Order created successfully:",
        savedOrder._id,
      );
    }

    return res.status(200).json({ received: true });
  } catch (error) {
    console.error("STRIPE WEBHOOK PROCESSING ERROR:", error);

    return res.status(500).json({
      message: "Webhook processing failed.",
    });
  }
};
