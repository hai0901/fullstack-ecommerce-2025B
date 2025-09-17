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

const { createCart } = require('../controllers/Cart/Create');
const { updateCart } = require('../controllers/Cart/Update');
const { deleteCart } = require('../controllers/Cart/Delete');
const { getCart, getAllCarts } = require('../controllers/Cart/View');

router.post('/', createCart);
router.get('/', getAllCarts);
router.get('/:id', getCart);
router.put('/:id', updateCart);
router.delete('/:id', deleteCart);

module.exports = router;
