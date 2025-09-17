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

const { validateIdParam, sendIfInvalid } = require('../middleware/validators');

const requireRole = require('../middleware/requireRole');

const { createOrder } = require('../controllers/Order/Create');
const { updateOrder } = require('../controllers/Order/Update');
const { cancelOrder } = require('../controllers/Order/Delete'); // Note: cancel logic
const { getOrder, getAllOrders, getOrdersByDistributionHub } = require('../controllers/Order/View');

router.post('/', requireAuth, requireRole('customer'), sendIfInvalid, createOrder);
router.get('/', requireAuth, requireRole('customer', 'shipper'), getAllOrders);
router.get('/hub/:hub', getOrdersByDistributionHub);
router.get('/:id', requireAuth, validateIdParam, sendIfInvalid, getOrder);
router.put('/:id', requireAuth, requireRole('shipper'), validateIdParam, sendIfInvalid, updateOrder);
router.delete('/:id', requireAuth, requireRole('customer', 'shipper'), validateIdParam, sendIfInvalid, cancelOrder); // Soft cancel

module.exports = router;
