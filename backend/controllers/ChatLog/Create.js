const ChatLog = require('../../models/ChatLog');

exports.createChatLog = async (req, res) => {
  try {
    const log = new ChatLog(req.body);
    await log.save();
    res.status(201).json(log);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};