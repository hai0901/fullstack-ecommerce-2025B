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