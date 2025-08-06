const mongoose = require('mongoose');
const { Schema } = mongoose;

const orderSchema = new Schema({
  customerId: { type: Schema.Types.ObjectId, ref: 'User' },
  status: { type: String },
  totalPrice: { type: Number },
  products: [{
    productId: { type: Schema.Types.ObjectId, ref: 'Product' },
    quantity: { type: Number }
  }],
  trackingNumber: { type: String },
  shipmentStatus: { type: String },
  carrier: { type: String },
  createdAt: { type: Date, default: Date.now },
  isCanceled: { type: Boolean, default: false },
});

module.exports = mongoose.model('Order', orderSchema);
