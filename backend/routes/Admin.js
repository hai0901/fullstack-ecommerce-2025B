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

const { createAdmin } = require('../controllers/Admin/Create');
const { getAdmin, getAllAdmins } = require('../controllers/Admin/View');

router.post('/', createAdmin);
router.get('/', getAllAdmins);
router.get('/:id', getAdmin);

module.exports = router;
