const ChatLog = require('../../models/ChatLog');

exports.updateChatLog = async (req, res) => {
  try {
    const updated = await ChatLog.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};