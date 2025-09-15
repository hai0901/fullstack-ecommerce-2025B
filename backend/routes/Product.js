const express = require('express');
const router = express.Router();

const { createProduct } = require('../controllers/Product/Create');
const { updateProduct } = require('../controllers/Product/Update');
const { deleteProduct } = require('../controllers/Product/Delete');
const { getProduct, getAllProducts } = require('../controllers/Product/View');
const { getVendorProducts } = require('../controllers/Product/GetVendorProducts');

router.post('/', createProduct);
router.get('/', getAllProducts);
router.get('/vendor/:username', getVendorProducts);
router.get('/:id', getProduct);
router.put('/:id', updateProduct);
router.delete('/:id', deleteProduct);

module.exports = router;
