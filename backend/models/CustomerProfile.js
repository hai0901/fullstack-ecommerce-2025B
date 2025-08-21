const mongoose = require('mongoose');
const { Schema } = mongoose;

const customerSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User' },
  name: { type: String, required: true },
  address: { type: String, required: true },
});

module.exports = mongoose.model('CustomerProfile', customerSchema);
