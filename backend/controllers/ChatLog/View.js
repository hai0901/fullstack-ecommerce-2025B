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