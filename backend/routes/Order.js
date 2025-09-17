const express = require('express');
const router = express.Router();

const { createOrder } = require('../controllers/Order/Create');
const { updateOrder } = require('../controllers/Order/Update');
const { cancelOrder } = require('../controllers/Order/Delete'); // Note: cancel logic
const { getOrder, getAllOrders, getOrdersByDistributionHub } = require('../controllers/Order/View');

router.post('/', createOrder);
router.get('/', getAllOrders);
router.get('/hub/:hub', getOrdersByDistributionHub);
router.get('/:id', getOrder);
router.put('/:id', updateOrder);
router.delete('/:id', cancelOrder); // Soft cancel

module.exports = router;
