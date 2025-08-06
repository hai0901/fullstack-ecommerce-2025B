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
