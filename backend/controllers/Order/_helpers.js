// RMIT University Vietnam...
const ShipperProfile = require('../../models/ShipperProfile');

async function getShipperHubId(userId) {
  const shipper = await ShipperProfile.findOne({ userId }).select('distributionHubId');
  return shipper ? shipper.distributionHubId?.toString() : null;
}

module.exports = { getShipperHubId };
