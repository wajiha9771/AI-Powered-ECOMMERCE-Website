import mongoose from "mongoose";

const sliderSchema = new mongoose.Schema({
  imageUrl: { type: String, required: true },
  title: { type: String, required: true },
  subtitle: { type: String },
  buttonText: { type: String, default: "Shop Now" },
  linkTo: { type: String, default: "/women" },
});

const storeConfigSchema = new mongoose.Schema(
  {
    websiteName: { type: String, default: "Nex-Style" },

    socialLinks: {
      facebook: { type: String, default: "https://facebook.com" },
      twitter: { type: String, default: "https://twitter.com" },
      instagram: { type: String, default: "https://instagram.com" },
      linkedin: { type: String, default: "https://linkedin.com" },
    },

    paymentLinks: {
      visa: { type: String, default: "https://www.visa.com" },
      mastercard: { type: String, default: "https://www.mastercard.com" },
      stripe: { type: String, default: "https://stripe.com" },
      paypal: { type: String, default: "https://www.paypal.com" },
    },

    heroSliders: [sliderSchema],
  },
  { timestamps: true },
);

const StoreConfig = mongoose.model("StoreConfig", storeConfigSchema);

export default StoreConfig;
