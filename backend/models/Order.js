import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: String,
      required: false,
      default: null,
    },

    customerName: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
    },

    phone: {
      type: String,
      required: true,
    },

    shippingAddress: {
      type: String,
      required: true,
    },

    paymentMethod: {
      type: String,
      required: true,
      enum: ["Cash on Delivery", "Card", "PayPal"],
    },

    stripeSessionId: {
      type: String,
      default: null,
      index: true,
    },

    // Invoice number
    invoiceNumber: {
      type: String,
      unique: true,
      index: true,
    },

    orderItems: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
        },

        name: {
          type: String,
          required: true,
        },

        price: {
          type: Number,
          required: true,
        },

        quantity: {
          type: Number,
          required: true,
          default: 1,
        },

        image: {
          type: String,
        },
      },
    ],

    totalAmount: {
      type: Number,
      required: true,
    },

    status: {
      type: String,
      required: true,
      enum: [
        "Pending",
        "Processing",
        "Shipped",
        "Delivered",
        "Cancelled",
      ],
      default: "Pending",
    },
  },
  { timestamps: true },
);

orderSchema.pre("save", async function () {
  if (!this.isNew || this.invoiceNumber) {
    return;
  }

  const count = await mongoose.model("Order").countDocuments();

  this.invoiceNumber = `INV-${String(count + 1).padStart(5, "0")}`;
});


const Order = mongoose.model("Order", orderSchema);

export default Order;

