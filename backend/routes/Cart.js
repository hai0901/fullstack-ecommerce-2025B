// RMIT University Vietnam
// Course: COSC2769 - Full Stack Development
// Semester: 2025B
// Assessment: Assignment 02
// Author: <Your Name>
// ID: <Your ID>

const express = require('express');
const router = express.Router();

const { createCart } = require('../controllers/Cart/Create');
const { updateCart } = require('../controllers/Cart/Update');
const { deleteCart } = require('../controllers/Cart/Delete');
const { getCart, getAllCarts } = require('../controllers/Cart/View');

const requireAuth = require('../middleware/requireAuth');
const requireRole = require('../middleware/requireRole');

// customer-only
router.use(requireAuth, requireRole('customer'));

// RESTful cart
router.post('/', createCart);
router.get('/', getAllCarts);
router.get('/:id', getCart);
router.put('/:id', updateCart);
router.delete('/:id', deleteCart);

module.exports = router;
