const mongoose = require('mongoose');
const { Schema } = mongoose;

const shipperSchema = new Schema({
  username: { type: String, required: true },
  distributionHub: { type: String, required: true, enum: ['hanoi', 'hochiminh', 'danang'] },
}, { toJSON: { virtuals: true }, toObject: { virtuals: true } });

shipperSchema.virtual('user', {
  ref: 'User',
  localField: 'username',
  foreignField: 'username',
  justOne: true,
});

module.exports = mongoose.model('ShipperProfile', shipperSchema);
