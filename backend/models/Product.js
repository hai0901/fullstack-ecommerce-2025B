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
