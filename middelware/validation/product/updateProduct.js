const { check, validationResult } = require("express-validator");

exports.validateProductUpdate = [
  check("name").optional().notEmpty().withMessage("Name cannot be empty"),

  check("category")
    .optional()
    .isMongoId()
    .withMessage("Category must be a valid ObjectId"),

  check("price")
    .optional()
    .isFloat({ gt: 0 })
    .withMessage("Price must be a positive number"),

  check("quantity")
    .optional()
    .isInt({ min: 0 })
    .withMessage("Quantity must be a non-negative integer"),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];
