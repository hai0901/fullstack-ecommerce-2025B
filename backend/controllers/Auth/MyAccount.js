const User = require('../../models/User');
const CustomerProfile = require('../../models/CustomerProfile');
const VendorProfile = require('../../models/VendorProfile');
const ShipperProfile = require('../../models/ShipperProfile');

exports.getMyAccount = async (req, res) => {
  const { uid, role } = req.auth;

  try {
    const base = await User.findById(uid).select('-passwordHash'); // <— FIX HERE
    if (!base) return res.status(404).json({ error: 'User not found' });

    let profile = {};
    if (role === 'customer') {
      profile = await CustomerProfile.findOne({ userId: uid });
    } else if (role === 'vendor') {
      profile = await VendorProfile.findOne({ userId: uid });
    } else if (role === 'shipper') {
      profile = await ShipperProfile.findOne({ userId: uid }).populate('distributionHubId');
    }

    return res.json({ ...base.toObject(), profile });
  } catch (err) {
    console.error('getMyAccount error:', err.message);
    return res.status(500).json({ error: 'Server error' });
  }
};
