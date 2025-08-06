const mongoose = require('mongoose');
const { Schema } = mongoose;

const reviewSchema = new Schema({
  productId: { type: Schema.Types.ObjectId, ref: 'Product' },
  customerId: { type: Schema.Types.ObjectId, ref: 'User' },
  rating: { type: Number },
  comment: { type: String },
  createdAt: { type: Date, default: Date.now },
  isDeleted: { type: Boolean, default: false },
});

module.exports = mongoose.model('Review', reviewSchema);
