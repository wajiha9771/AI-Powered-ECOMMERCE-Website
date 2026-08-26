import Product from "../models/Product.js";

export const getProducts = async (req, res) => {
  try {
    const { search } = req.query;
    let query = {};
    if (search) {
      query = {
        nameSearchable: { $regex: search.toLowerCase(), $options: "i" },
      };
    }
    const products = await Product.find(query);
    res.status(200).json(products);
  } catch (error) {
    res
      .status(500)
      .json({
        message: "Server Error fetching products",
        error: error.message,
      });
  }
};
export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json(product);
  } catch (error) {
    res
      .status(500)
      .json({
        message: "Invalid product ID or Server Error",
        error: error.message,
      });
  }
};
