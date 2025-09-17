/*
 * RMIT University Vietnam
 * Course: COSC2769 - Full Stack Development
 * Semester: 2025B
 * Assessment: Assignment 02
 * Author: Nguyen Pham Tien Hai, Nguyen Thach Khanh Dzi
 * ID: s3979239, s3980883
 */

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
