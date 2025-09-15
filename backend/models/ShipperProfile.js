const mongoose = require('mongoose');
const { Schema } = mongoose;

const shipperSchema = new Schema({
  username: { type: String, required: true },
  distributionHubId: { type: Schema.Types.ObjectId, ref: 'DistributionHub', required: true },
}, { toJSON: { virtuals: true }, toObject: { virtuals: true } });

shipperSchema.virtual('user', {
  ref: 'User',
  localField: 'username',
  foreignField: 'username',
  justOne: true,
});

module.exports = mongoose.model('ShipperProfile', shipperSchema);
