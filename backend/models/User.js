const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  username: { type: String, unique: true, index: true },
  email: { type: String, required: true, unique: true, index: true },
  googleId: { type: String },
  isGoogleAccount: { type: Boolean, default: false },
  passwordHash: { type: String },
  role: { type: String, enum: ['customer', 'vendor', 'shipper'] },
  profilePicture: { type: String },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date },
  isDeleted: { type: Boolean, default: false },
  name: { type: String },
  address: { type: String },
  businessName: { type: String, unique: true, sparse: true },
  businessAddress: { type: String },
  distributionHubId: { type: Schema.Types.ObjectId, ref: 'DistributionHub' },
});

module.exports = mongoose.model('User', userSchema);
