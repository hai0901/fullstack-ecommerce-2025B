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
