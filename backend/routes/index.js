/*
 * RMIT University Vietnam
 * Course: COSC2769 - Full Stack Development
 * Semester: 2025B
 * Assessment: Assignment 02
 * Author: Nguyen Pham Tien Hai, Nguyen Thach Khanh Dzi
 * ID: s3979239, s3980883
 */

// routes/index.js
const express = require('express');
const router = express.Router();

router.use('/auth', require('./Auth'));
router.use('/categories', require('./Category'));
router.use('/products', require('./Product'));
router.use('/reviews', require('./Review'));
router.use('/orders', require('./Order'));
router.use('/carts', require('./Cart'));
router.use('/chatlogs', require('./ChatLog'));
router.use('/distributionhubs', require('./DistributionHub'));
router.use('/admins', require('./Admin'));
router.use('/chat-ai', require('./ChatAI'));

module.exports = router;
