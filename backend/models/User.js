const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  email: { type: String, required: true, unique: true },
  passwordHash: { type: String },
  role: { type: String, enum: ['customer', 'vendor', 'shipper'], required: true },
  roleProfileId: { type: Schema.Types.ObjectId }, 
  googleId: { type: String },
  isGoogleAccount: { type: Boolean, default: false },
  profilePicture: { type: String },
  isVerified: { type: Boolean, default: false },
  isDeleted: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('User', userSchema);
