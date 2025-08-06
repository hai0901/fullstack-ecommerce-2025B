const mongoose = require('mongoose');
const { Schema } = mongoose;

const AdminSchema = new Schema({
  username: {type: String},
  passwordHash: {type: String},
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Admin', AdminSchema);
