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
