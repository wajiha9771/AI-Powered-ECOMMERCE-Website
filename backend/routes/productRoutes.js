import express from "express";
import Product from "../models/Product.js";
import multer from "multer";
import path from "path";
import fs from "fs";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadDir = "uploads/";
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, "product-" + uniqueSuffix + ext);
  },
});
const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) cb(null, true);
    else cb(new Error("Only images are allowed!"), false);
  },
});
const router = express.Router();
router.get("/", async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.status(200).json(products);
  } catch (error) {
    res
      .status(500)
      .json({
        message: "An error occurred while fetching products",
        error: error.message,
      });
  }
});
router.post("/", upload.array("productImages", 10), async (req, res) => {
  try {
    const name = req.body.name;
    const price = req.body.price;
    const oldPrice = req.body.oldPrice;
    const category = req.body.category;
    const badge = req.body.badge;
    const description = req.body.description;
    const stock = req.body.stock;
    const tags = req.body.tags;
    const isFeatured = req.body.isFeatured;
    const isTrending = req.body.isTrending;
    const images = req.body.images;

    if (!name || !price || !category) {
      return res.status(400).json({
        message: "An error occurred while updating products",
        error: `Validation Failed: Name (${name}), Price (${price}), or Category (${category}) missing in req.body`,
      });
    }

    let finalImagesArray = [];
    if (images) {
      if (Array.isArray(images)) {
        finalImagesArray = [...images];
      } else {
        try {
          finalImagesArray = JSON.parse(images);
        } catch {
          finalImagesArray = [images];
        }
      }
    }
    if (req.files && req.files.length > 0) {
      req.files.forEach((file) => {
        const fileUrl = `${req.protocol}://${req.get("host")}/uploads/${file.filename}`;
        finalImagesArray.push(fileUrl);
      });
    }
    const newProduct = new Product({
      name: name.trim(),
      price: Number(price),
      oldPrice: oldPrice ? Number(oldPrice) : undefined,
      category: category.toLowerCase(),
      badge: badge ? badge.trim() : undefined,
      images: finalImagesArray,
      description: description ? description.trim() : "",
      stock: stock ? Number(stock) : 10,
      tags: tags ? (Array.isArray(tags) ? tags : JSON.parse(tags)) : [],
      isFeatured: isFeatured === "true" || isFeatured === true,
      isTrending: isTrending === "true" || isTrending === true,
    });

    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    res
      .status(400)
      .json({
        message: "An error occurred while fetching products",
        error: error.message,
      });
  }
});
router.put("/:id", upload.array("productImages", 10), async (req, res) => {
  try {
    const { id } = req.params;

    const {
      name,
      price,
      oldPrice,
      category,
      badge,
      description,
      stock,
      tags,
      isFeatured,
      isTrending,
      images,
    } = req.body;

    let finalImagesArray = [];

    if (images) {
      if (Array.isArray(images)) {
        finalImagesArray = [...images];
      } else {
        try {
          finalImagesArray = JSON.parse(images);
        } catch {
          finalImagesArray = [images];
        }
      }
    }

    if (req.files && req.files.length > 0) {
      req.files.forEach((file) => {
        const fileUrl = `${req.protocol}://${req.get("host")}/uploads/${file.filename}`;
        finalImagesArray.push(fileUrl);
      });
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      {
        $set: {
          name: name?.trim(),
          price: Number(price),
          oldPrice: oldPrice ? Number(oldPrice) : undefined,
          category: category?.toLowerCase(),
          badge: badge?.trim() || undefined,
          images: finalImagesArray,
          description: description?.trim() || "",
          stock: stock ? Number(stock) : 10,
          tags: tags ? (Array.isArray(tags) ? tags : JSON.parse(tags)) : [],
          isFeatured: isFeatured === "true" || isFeatured === true,
          isTrending: isTrending === "true" || isTrending === true,
        },
      },
      {
        returnDocument: "after",
        runValidators: true,
      },
    );

    if (!updatedProduct) {
      return res.status(404).json({
        message: "Product not found!",
      });
    }
    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(400).json({
      message: "An error occurred while updating products",
      error: error.message,
    });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedProduct = await Product.findByIdAndDelete(id);

    if (!deletedProduct) {
      return res.status(404).json({ message: "Product not found!" });
    }

    res.status(200).json({ message: "Product delete successfully  🗑️" });
  } catch (error) {
    res
      .status(500)
      .json({
        message: "Error occurred in delete product",
        error: error.message,
      });
  }
});
export default router;
