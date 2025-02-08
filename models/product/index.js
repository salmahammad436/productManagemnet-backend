const mongoose = require("mongoose");
const expressValidator = require("express-validator");
const Category = require("../category/index.js");

const productSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  category: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
  price: Number,
  quantity: Number,
}, { timestamps: true });


module.exports = mongoose.model("Product", productSchema);
