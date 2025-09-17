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

const { createProduct } = require('../controllers/Product/Create');
const { updateProduct } = require('../controllers/Product/Update');
const { deleteProduct } = require('../controllers/Product/Delete');
const { getProduct, getAllProducts } = require('../controllers/Product/View');
const { getVendorProducts } = require('../controllers/Product/GetVendorProducts');
const { getShopProducts } = require('../controllers/Product/GetShopProducts');

router.post('/', createProduct);
router.get('/', getAllProducts);
router.get('/shop', getShopProducts);
router.get('/vendor/:username', getVendorProducts);
router.get('/:id', getProduct);
router.put('/:id', updateProduct);
router.delete('/:id', deleteProduct);

module.exports = router;
