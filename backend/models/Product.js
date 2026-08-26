import mongoose from "mongoose";
const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    nameSearchable: {
      type: String,
      lowercase: true,
      index: true,
    },
    price: {
      type: Number,
      required: true,
    },
    oldPrice: {
      type: Number,
    },
    category: {
      type: String,
      required: true,
      lowercase: true,
    },
    badge: {
      type: String,
    },
    images: [
      {
        type: String,
        required: true,
      },
    ],
    description: {
      type: String,
    },
    stock: {
      type: Number,
      required: true,
      default: 10,
    },
    tags: [
      {
        type: String,
        lowercase: true,
        index: true,
      },
    ],
    isFeatured: {
      type: Boolean,
      default: false,
    },
    isTrending: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

productSchema.pre("save", function () {
  if (this.name) {
    this.nameSearchable = this.name.toLowerCase();
  }
});

const Product = mongoose.model("Product", productSchema);
export default Product;
