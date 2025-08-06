const mongoose = require('mongoose');
const { Schema } = mongoose;

const chatLogSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User' },
  prompt: { type: String },
  response: { type: String },
  intent: { type: String },
  timestamp: { type: Date, default: Date.now },
});

module.exports = mongoose.model('ChatLog', chatLogSchema);
