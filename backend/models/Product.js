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

const productSchema = new Schema({
  vendorId: { type: Schema.Types.ObjectId, ref: 'User' },
  categoryId: { type: Schema.Types.ObjectId, ref: 'Category' },
  name: { type: String },
  description: { type: String },
  price: { type: Number },
  image: { type: String },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date },
  isDeleted: { type: Boolean, default: false },
});

module.exports = mongoose.model('Product', productSchema);
