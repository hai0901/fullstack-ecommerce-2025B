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

const { createReview } = require('../controllers/Review/Create');
const { updateReview } = require('../controllers/Review/Update');
const { deleteReview } = require('../controllers/Review/Delete');
const { getReview, getAllReviews } = require('../controllers/Review/View');

router.post('/', createReview);
router.get('/', getAllReviews);
router.get('/:id', getReview);
router.put('/:id', updateReview);
router.delete('/:id', deleteReview);

module.exports = router;
