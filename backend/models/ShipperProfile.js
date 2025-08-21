const mongoose = require('mongoose');
const { Schema } = mongoose;

const shipperSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User' },
  distributionHubId: { type: Schema.Types.ObjectId, ref: 'DistributionHub', required: true },
  vehicleInfo: { type: String }, // Optional future-ready field
});

module.exports = mongoose.model('ShipperProfile', shipperSchema);
