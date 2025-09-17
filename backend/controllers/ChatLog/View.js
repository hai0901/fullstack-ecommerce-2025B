/*
 * RMIT University Vietnam
 * Course: COSC2769 - Full Stack Development
 * Semester: 2025B
 * Assessment: Assignment 02
 * Author: Nguyen Pham Tien Hai, Nguyen Thach Khanh Dzi
 * ID: s3979239, s3980883
 */

const ChatLog = require('../../models/ChatLog');

exports.getChatLog = async (req, res) => {
  try {
    const log = await ChatLog.findById(req.params.id);
    res.json(log);
  } catch (err) {
    res.status(404).json({ error: 'ChatLog not found' });
  }
};

exports.getAllChatLogs = async (req, res) => {
  try {
    const logs = await ChatLog.find();
    res.json(logs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};