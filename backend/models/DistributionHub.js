const mongoose = require('mongoose');
const { Schema } = mongoose;

const distributionHubSchema = new Schema({
  name: { type: String },
  address: { type: String },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('DistributionHub', distributionHubSchema);
