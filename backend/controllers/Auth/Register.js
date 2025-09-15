const User = require('../../models/User');
const CustomerProfile = require('../../models/CustomerProfile');
const VendorProfile = require('../../models/VendorProfile');
const ShipperProfile = require('../../models/ShipperProfile');
const bcrypt = require('bcryptjs');

exports.register = async (req, res) => {
  try {
    const { username, password, role, name, address, businessName, businessAddress, distributionHub } = req.body;

    if (!username || !password || !role) {
      return res.status(400).json({ error: 'username, password and role are required' });
    }

    const existing = await User.findOne({ username });
    if (existing) {
      return res.status(409).json({ error: 'Username already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, passwordHash: hashedPassword, role });

    let roleProfile;
    if (role === 'customer') {
      if (!name || !address) {
        return res.status(400).json({ error: 'name and address are required for customer' });
      }
      roleProfile = await CustomerProfile.create({ username, name, address });
    } else if (role === 'vendor') {
      if (!businessName || !businessAddress) {
        return res.status(400).json({ error: 'businessName and businessAddress are required for vendor' });
      }
      roleProfile = await VendorProfile.create({ username, businessName, businessAddress });
    } else if (role === 'shipper') {
      if (!distributionHub) {
        return res.status(400).json({ error: 'distributionHub is required for shipper' });
      }
      roleProfile = await ShipperProfile.create({ username, distributionHub });
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
