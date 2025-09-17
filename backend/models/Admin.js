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

const AdminSchema = new Schema({
  username: {type: String},
  passwordHash: {type: String},
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Admin', AdminSchema);
