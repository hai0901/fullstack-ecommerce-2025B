const User = require('../../models/User');
const CustomerProfile = require('../../models/CustomerProfile');
const VendorProfile = require('../../models/VendorProfile');
const ShipperProfile = require('../../models/ShipperProfile');
const bcrypt = require('bcryptjs');

exports.register = async (req, res) => {
  try {
    const { email, password, role, name, address, businessName, businessAddress, distributionHubId } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ email, passwordHash: hashedPassword, role });

    // Create role profile
    let roleProfile;

    if (role === 'customer') {
      roleProfile = await CustomerProfile.create({ userId: user._id, name, address });
    } else if (role === 'vendor') {
      roleProfile = await VendorProfile.create({ userId: user._id, businessName, businessAddress });
    } else if (role === 'shipper') {
      roleProfile = await ShipperProfile.create({ userId: user._id, distributionHubId });
    } else {
      return res.status(400).json({ error: 'Invalid role' });
    }

    user.roleProfileId = roleProfile._id;
    await user.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
