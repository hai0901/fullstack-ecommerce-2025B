const mongoose = require('mongoose');
const { Schema } = mongoose;

const productSchema = new Schema({
  vendorId: { type: Schema.Types.ObjectId, ref: 'User' },
  genreId: { type: Schema.Types.ObjectId, ref: 'Genre' },
  name: { type: String },
  description: { type: String },
  price: { type: Number },
  image: { type: String },
  availableStock: { type: Number },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date },
  isDeleted: { type: Boolean, default: false },
});

module.exports = mongoose.model('Product', productSchema);
