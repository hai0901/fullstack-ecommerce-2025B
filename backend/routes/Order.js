// RMIT University Vietnam
// Course: COSC2769 - Full Stack Development
// Semester: 2025B
// Assessment: Assignment 02
// Author: Nguyen Pham Tien Hai
// ID: s3979239
// RMIT University Vietnam...
const express = require('express');
const router = express.Router();

const { createOrder } = require('../controllers/Order/Create');
const { updateOrder } = require('../controllers/Order/Update');
const { cancelOrder } = require('../controllers/Order/Delete'); 
const { getOrder, getAllOrders } = require('../controllers/Order/View');

const requireAuth = require('../middleware/requireAuth');
const requireRole = require('../middleware/requireRole');

// Place order — customer only
router.post('/', requireAuth, requireRole('customer'), createOrder);

// View orders — customer sees own orders; shipper sees ACTIVE orders for their hub
router.get('/', requireAuth, requireRole('customer', 'shipper'), getAllOrders);

// View one order — controller will gate access (customer owner OR shipper @ same hub)
router.get('/:id', requireAuth, getOrder);

// Update order status — shipper only (to "delivered" or "canceled")
router.put('/:id', requireAuth, requireRole('shipper'), updateOrder);

// Cancel order — customer can cancel own ACTIVE; shipper can cancel ACTIVE at their hub
router.delete('/:id', requireAuth, requireRole('customer', 'shipper'), cancelOrder);

module.exports = router;
