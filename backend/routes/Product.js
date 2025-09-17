/*
 * RMIT University Vietnam
 * Course: COSC2769 - Full Stack Development
 * Semester: 2025B
 * Assessment: Assignment 02
 * Author: Nguyen Pham Tien Hai, Nguyen Thach Khanh Dzi
 * ID: s3979239, s3980883
 */

const express = require('express');
const router = express.Router();

const requireAuth = require('../middleware/auth');

const { validateProductCreate, validateProductUpdate, validateIdParam, validatePriceQuery, sendIfInvalid } = require('../middleware/validators');

const upload = require('../middleware/uploadImage');

const requireRole = require('../middleware/requireRole');

const { createProduct } = require('../controllers/Product/Create');
const { updateProduct } = require('../controllers/Product/Update');
const { deleteProduct } = require('../controllers/Product/Delete');
const { getProduct, getAllProducts } = require('../controllers/Product/View');
const { getVendorProducts } = require('../controllers/Product/GetVendorProducts');
const { getShopProducts } = require('../controllers/Product/GetShopProducts');

router.post('/', requireAuth, requireRole('vendor'), upload.single('image'), validateProductCreate, sendIfInvalid, createProduct);
router.get('/', validatePriceQuery, sendIfInvalid, getAllProducts);
router.get('/shop', getShopProducts);
router.get('/vendor/:username', getVendorProducts);
router.get('/:id', validateIdParam, sendIfInvalid, getProduct);
router.put('/:id', requireAuth, requireRole('vendor'), validateIdParam, upload.single('image'), validateProductUpdate, sendIfInvalid, updateProduct);
router.delete('/:id', requireAuth, requireRole('vendor'), validateIdParam, sendIfInvalid, deleteProduct);

module.exports = router;
