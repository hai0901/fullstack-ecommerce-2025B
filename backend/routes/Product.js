const express = require('express');
const router = express.Router();

const { createProduct } = require('../controllers/Product/Create');
const { updateProduct } = require('../controllers/Product/Update');
const { deleteProduct } = require('../controllers/Product/Delete');
const { getProduct, getAllProducts } = require('../controllers/Product/View');

const requireAuth = require('../middleware/requireAuth');
const requireRole = require('../middleware/requireRole');
const upload = require('../middleware/uploadImage');
const {
  validateProductCreate,
  validateProductUpdate,
  validateIdParam,
  validatePriceQuery, 
  sendIfInvalid,
} = require('../middleware/validators');

router.get(
  '/',
  validatePriceQuery,
  sendIfInvalid,
  getAllProducts
);


// 🔒 Only vendor can create product
router.post(
  '/',
  requireAuth,
  requireRole('vendor'),
  upload.single('image'),
  validateProductCreate,
  sendIfInvalid,
  createProduct
);

// 🔓 Public view
router.get('/', getAllProducts);
router.get('/:id', validateIdParam, sendIfInvalid, getProduct);

// 🔒 Vendor update/delete own product only
router.put(
  '/:id',
  requireAuth,
  requireRole('vendor'),
  upload.single('image'),
  validateProductUpdate,
  sendIfInvalid,
  updateProduct
);

router.delete(
  '/:id',
  requireAuth,
  requireRole('vendor'),
  validateIdParam,
  sendIfInvalid,
  deleteProduct
);

module.exports = router;
