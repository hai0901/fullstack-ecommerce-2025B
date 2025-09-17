/*
 * RMIT University Vietnam
 * Course: COSC2769 - Full Stack Development
 * Semester: 2025B
 * Assessment: Assignment 02
 * Author: Nguyen Pham Tien Hai, Nguyen Thach Khanh Dzi
 * ID: s3979239, s3980883
 */

//controllers/Review/View.js
const Review = require('../../models/Review');

exports.getReview = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);
    res.json(review);
  } catch (err) {
    res.status(404).json({ error: 'Review not found' });
  }
};

exports.getAllReviews = async (req, res) => {
  try {
    const reviews = await Review.find({ isDeleted: false });
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};