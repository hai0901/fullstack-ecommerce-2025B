// RMIT University Vietnam
// Course: COSC2769 - Full Stack Development
// Semester: 2025B
// Assessment: Assignment 02
// Author: Nguyen Pham Tien Hai, Nguyen Thach Khanh Dzi
// ID: s3979239, s3980883

const { body, param, query, validationResult } = require('express-validator');

// ===== Auth rules (email + password + role) =====
const passwordRule =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,20}$/;

const validateLogin = [
  body('email').isEmail().normalizeEmail(),
  body('password').isString().isLength({ min: 8, max: 64 }),
];

const validateRegister = [
  body('email').isEmail().normalizeEmail(),
  body('password').matches(passwordRule),
  body('role').isIn(['customer', 'vendor', 'shipper']),

  // customer-only
  body('name').if(body('role').equals('customer')).isString().isLength({ min: 5 }),
  body('address').if(body('role').equals('customer')).isString().isLength({ min: 5 }),

  // vendor-only
  body('businessName').if(body('role').equals('vendor')).isString().isLength({ min: 5 }),
  body('businessAddress').if(body('role').equals('vendor')).isString().isLength({ min: 5 }),

  // shipper-only
  body('distributionHubId').if(body('role').equals('shipper')).isString().notEmpty(),
];

// ===== Product rules (match your schema + spec) =====
const validateProductCreate = [
  body('name').isString().isLength({ min: 10, max: 20 }),
  body('price').isFloat({ gt: 0 }),
  body('description').optional().isString().isLength({ max: 500 }),
  body('image').optional().isString(),
  body('genreId').optional().isString(),
  body('availableStock').optional().isInt({ min: 0 }),
];

const validateProductUpdate = [
  param('id').isString().notEmpty(),
  body('name').optional().isString().isLength({ min: 10, max: 20 }),
  body('price').optional().isFloat({ gt: 0 }),
  body('description').optional().isString().isLength({ max: 500 }),
  body('image').optional().isString(),
  body('genreId').optional().isString(),
  body('availableStock').optional().isInt({ min: 0 }),
];

// ===== Generic =====
const validateIdParam = [param('id').isString().notEmpty()];
const validatePriceQuery = [
  query('min').optional().isFloat({ min: 0 }),
  query('max').optional().isFloat({ min: 0 }),
  query('q').optional().isString().isLength({ min: 1 }),
];

const sendIfInvalid = (req, res, next) => {
  const result = validationResult(req);
  if (result.isEmpty()) return next();
  return res.status(422).json({ errors: result.array() });
};

// in middleware/validators.js (add near the bottom)
const validateHubCreate = [
  body('name').isString().isLength({ min: 3 }),
  body('address').isString().isLength({ min: 3 }),
];

const validateHubUpdate = [
  param('id').isString().notEmpty(),
  body('name').optional().isString().isLength({ min: 3 }),
  body('address').optional().isString().isLength({ min: 3 }),
];


 



module.exports = {
  passwordRule,
  validateLogin,
  validateRegister,
  validateProductCreate,
  validateProductUpdate,
  validateIdParam,
  validatePriceQuery,
  sendIfInvalid,
  validateHubCreate,
  validateHubUpdate,
};
