const mongoose = require('mongoose');
const { Schema } = mongoose;

const vendorSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User' },
  businessName: { type: String, required: true },
  businessAddress: { type: String, required: true },
  taxId: { type: String }, // Optional future field
});

module.exports = mongoose.model('VendorProfile', vendorSchema);
