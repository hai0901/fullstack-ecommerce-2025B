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
