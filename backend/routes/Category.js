const express = require('express');
const router = express.Router();

const { createCategory } = require('../controllers/Category/Create');
const { updateCategory } = require('../controllers/Category/Update');
const { deleteCategory } = require('../controllers/Category/Delete');
const { getCategory, getAllCategories } = require('../controllers/Category/View');
const { seedCategories } = require('../controllers/Category/Seed');

router.post('/', createCategory);
router.post('/seed', seedCategories);
router.get('/', getAllCategories);
router.get('/:id', getCategory);
router.put('/:id', updateCategory);
router.delete('/:id', deleteCategory);

module.exports = router;
