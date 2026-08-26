import "dotenv/config";
import mongoose from "mongoose";
import Product from "./models/Product.js";
import connectDB from "./config/db.js";

connectDB();
const products = [
  {
    name: "Classic Blue Denim Jacket",
    nameSearchable: "classic blue denim jacket",
    price: 59.99,
    category: "men",
    image: "https://unsplash.com",
    description: "Premium quality denim jacket with standard fit for men.",
    stock: 15,
    tags: ["jacket", "denim", "blue", "men", "winter"],
  },
  {
    name: "Summer Floral Dress",
    nameSearchable: "summer floral dress",
    price: 45.0,
    category: "women",
    image: "https://unsplash.com",
    description:
      "Lightweight and breathable floral dress perfect for summer days.",
    stock: 20,
    tags: ["dress", "floral", "women", "summer", "clothing"],
  },
  {
    name: "Kids Cotton Hoodie",
    nameSearchable: "kids cotton hoodie",
    price: 29.99,
    category: "kids",
    image: "https://unsplash.com",
    description: "Soft cotton hoodie to keep your kids warm and comfortable.",
    stock: 12,
    tags: ["hoodie", "kids", "cotton", "warm", "sweatshirt"],
  },
  {
    name: "Minimalist Leather Watch",
    nameSearchable: "minimalist leather watch",
    price: 120.0,
    category: "accessories",
    image: "https://unsplash.com",
    description: "Elegant minimalist watch with a genuine leather strap.",
    stock: 8,
    tags: ["watch", "leather", "accessories", "black", "minimalist"],
  },
];

const importData = async () => {
  try {
    await Product.deleteMany();
    console.log("Old Data Destroyed...");
    await Product.insertMany(products);
    console.log("Mock Products Imported Successfully!");

    process.exit();
  } catch (error) {
    console.error(`Error with data import: ${error.message}`);
    process.exit(1);
  }
};

importData();
