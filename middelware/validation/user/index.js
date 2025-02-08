const { check, validationResult } = require("express-validator");

exports.validateUser = [
  check("name").notEmpty().withMessage("Name is required"),
  check("email").isEmail().withMessage("Email must be valid"),
  check("password")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];
