const Product = require("../../models/product/index.js");

const getAllProducts = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const products = await Product.find().skip(skip).limit(limit);
    const totalProducts = await Product.countDocuments();

    if (products.length === 0) {
      return res.status(404).json({ message: "No products found" });
    }

    res.status(200).json({
      totalProducts,
      totalPages: Math.ceil(totalProducts / limit),
      currentPage: page,
      products,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getProductById = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const createNewProduct = async (req, res) => {
  const { name, category, price, quantity } = req.body;
  try {
    if (!name || !price || !quantity) {
      return res
        .status(400)
        .json({ message: "Name, price, and quantity are required" });
    }

    const existingProduct = await Product.findOne({ name, category });
    if (existingProduct) {
      return res.status(400).json({ message: "The product already exists" });
    }

    const newProduct = await Product.create({
      name,
      category,
      price,
      quantity,
    });
    res.status(201).json({
      message: "The product was created successfully",
      product: newProduct,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name, category, price, quantity } = req.body;

  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      { name, category, price, quantity },
      { new: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: "The product does not exist" });
    }

    res.status(200).json({
      message: "Product updated successfully",
      product: updatedProduct,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const deleteProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedProduct = await Product.findByIdAndDelete(id);

    if (!deletedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res
      .status(200)
      .json({ message: "Product deleted successfully", deletedProduct });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  getAllProducts,
  getProductById,
  createNewProduct,
  updateProduct,
  deleteProduct,
};
