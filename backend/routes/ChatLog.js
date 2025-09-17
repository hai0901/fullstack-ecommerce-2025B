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

const { createChatLog } = require('../controllers/ChatLog/Create');
const { updateChatLog } = require('../controllers/ChatLog/Update');
const { deleteChatLog } = require('../controllers/ChatLog/Delete');
const { getChatLog, getAllChatLogs } = require('../controllers/ChatLog/View');

router.post('/', createChatLog);
router.get('/', getAllChatLogs);
router.get('/:id', getChatLog);
router.put('/:id', updateChatLog);
router.delete('/:id', deleteChatLog);

module.exports = router;
