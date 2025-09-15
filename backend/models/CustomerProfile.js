const mongoose = require('mongoose');
const { Schema } = mongoose;

const customerSchema = new Schema({
  username: { type: String, required: true },
  name: { type: String, required: true },
  address: { type: String, required: true },
}, { toJSON: { virtuals: true }, toObject: { virtuals: true } });

customerSchema.virtual('user', {
  ref: 'User',
  localField: 'username',
  foreignField: 'username',
  justOne: true,
});

module.exports = mongoose.model('CustomerProfile', customerSchema);
