//controllers/Review/Delete.js
const Review = require('../../models/Review');

exports.deleteReview = async (req, res) => {
  try {
    await Review.findByIdAndUpdate(req.params.id, { isDeleted: true });
    res.json({ message: 'Review soft-deleted' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};