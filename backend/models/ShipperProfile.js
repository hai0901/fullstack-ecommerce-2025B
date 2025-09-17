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

const shipperSchema = new Schema({
  username: { type: String, required: true },
  distributionHub: { type: String, required: true, enum: ['hanoi', 'hochiminh', 'danang'] },
}, { toJSON: { virtuals: true }, toObject: { virtuals: true } });

shipperSchema.virtual('user', {
  ref: 'User',
  localField: 'username',
  foreignField: 'username',
  justOne: true,
});

module.exports = mongoose.model('ShipperProfile', shipperSchema);
