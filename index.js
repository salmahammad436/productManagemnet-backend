const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const connectDB = require("./config/db.js");

const authRouter = require("./routes/auth/index.js");
const productRoute = require("./routes/products/index.js");
const categoryRoute=require("./routes/category/index.js");
const { authenticate } = require("./middelware/Authentication/index.js");
const { authorize } = require("./middelware/Authorization/index.js");
const { validateProduct } = require("./middelware/validation/product/createProduct.js");
const { validateUser } = require("./middelware/validation/user/index");

// Middleware
app.use(express.json());

// Database Connection and Server Start
const startServer = async () => {
  try {
    await connectDB();
    app.listen(process.env.PORT, () => {
      console.log("====================================");
      console.log(`Server is running on port ${process.env.PORT}`);
    });
  } catch (error) {
    console.error("Failed to connect to the database", error);
  }
};

// Routes
app.use("/auth", authRouter);

// Protected product routes (requires login and admin authorization)
app.use("/products", authenticate, productRoute);
app.use("/category", authenticate, categoryRoute);

// Global Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something went wrong!" });
});

startServer();
