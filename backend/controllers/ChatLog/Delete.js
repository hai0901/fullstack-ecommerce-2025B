/*
 * RMIT University Vietnam
 * Course: COSC2769 - Full Stack Development
 * Semester: 2025B
 * Assessment: Assignment 02
 * Author: Nguyen Pham Tien Hai, Nguyen Thach Khanh Dzi
 * ID: s3979239, s3980883
 */

const ChatLog = require('../../models/ChatLog');

exports.deleteChatLog = async (req, res) => {
  try {
    await ChatLog.findByIdAndDelete(req.params.id);
    res.json({ message: 'ChatLog deleted' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};