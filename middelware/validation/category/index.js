const { check, validationResult } = require('express-validator');

exports.validateCategory = [
  check('name').notEmpty().withMessage('Category name is required'),
  check('products')
    .optional()
    .isArray()
    .withMessage('Products must be an array of ObjectIds'),
  check('products.*')
    .optional()
    .isMongoId()
    .withMessage('Each product must be a valid MongoDB ObjectId'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];
