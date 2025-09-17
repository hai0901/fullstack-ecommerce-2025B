const mongoose = require('mongoose');
const { Schema } = mongoose;

const orderSchema = new Schema({
  customerId: { type: Schema.Types.ObjectId, ref: 'User' },
  customerAddress: { type: String }, // Store customer's address at time of order
  status: { type: String, default: 'active' },
  totalPrice: { type: Number },
  products: [{
    productId: { type: Schema.Types.ObjectId, ref: 'Product' },
    quantity: { type: Number },
    price: { type: Number } // Store price at time of order
  }],
  distributionHub: { type: String, enum: ['danang', 'hochiminh', 'hanoi'] },
  trackingNumber: { type: String },
  shipmentStatus: { type: String },
  carrier: { type: String },
  createdAt: { type: Date, default: Date.now },
  isCanceled: { type: Boolean, default: false },
});

module.exports = mongoose.model('Order', orderSchema);
