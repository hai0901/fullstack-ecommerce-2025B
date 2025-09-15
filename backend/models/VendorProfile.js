const mongoose = require('mongoose');
const { Schema } = mongoose;

const vendorSchema = new Schema({
  username: { type: String, required: true },
  businessName: { type: String, required: true },
  businessAddress: { type: String, required: true, unique: true },
}, { toJSON: { virtuals: true }, toObject: { virtuals: true } });

// Virtual populate: link by username -> User.username
vendorSchema.virtual('user', {
  ref: 'User',
  localField: 'username',
  foreignField: 'username',
  justOne: true,
});

module.exports = mongoose.model('VendorProfile', vendorSchema);
