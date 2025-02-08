const Category = require("../../models/category");



const getCategoryById = async (req, res) => {
  const { id } = req.params;
  try {
    const category = await Category.findById(id);
    if (!category) {
      return res.status(404).json({ message: "category not found" });
    }
    res.status(200).json(category);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const createNewCategory = async (req, res) => {
  const { name, products } = req.body;
  try {
    if (!name ) {
      return res
        .status(400)
        .json({ message: "Name  are required" });
    }

    const existingCategory = await Category.findOne({ name });
    if (existingCategory) {
      return res.status(400).json({ message: "The category already exists" });
    }

    const newCategory = await Category.create({
      name,
     
    });
    res.status(201).json({
      message: "The category was created successfully",
      category: newCategory,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};



module.exports = { createNewCategory ,getCategoryById};