const ChatLog = require('../../models/ChatLog');

exports.deleteChatLog = async (req, res) => {
  try {
    await ChatLog.findByIdAndDelete(req.params.id);
    res.json({ message: 'ChatLog deleted' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};s