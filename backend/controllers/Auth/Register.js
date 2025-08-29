const User = require('../../models/User');
const CustomerProfile = require('../../models/CustomerProfile');
const VendorProfile = require('../../models/VendorProfile');
const ShipperProfile = require('../../models/ShipperProfile');
const bcrypt = require('bcryptjs');
const { signEmailToken } = require('../../utils/token');
const { sendVerificationEmail } = require('../../utils/email');

/**
 * POST /api/auth/register
 * Body: { email, password, role: 'customer'|'vendor'|'shipper', name, address, businessName, businessAddress, distributionHubId }
 */
exports.register = async (req, res) => {
  try {
    const { email, password, role, name, address, businessName, businessAddress, distributionHubId } = req.body || {};

    // basic validation
    if (!email || !password || !role) {
      return res.status(400).json({ error: 'email, password, and role are required' });
    }
    const normalizedEmail = String(email).trim().toLowerCase();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail)) {
      return res.status(400).json({ error: 'Invalid email format' });
    }
    if (password.length < 8) {
      return res.status(400).json({ error: 'Password must be at least 8 characters' });
    }
    if (!['customer','vendor','shipper'].includes(role)) {
      return res.status(400).json({ error: 'Invalid role' });
    }

    const existing = await User.findOne({ email: normalizedEmail, isDeleted: { $ne: true } });
    if (existing) {
      return res.status(409).json({ error: 'Email already registered' });
    }

    const passwordHash = await bcrypt.hash(password, 12);
    const user = await User.create({ email: normalizedEmail, passwordHash, role, isVerified: false });

    // Create role-specific profile
    let roleProfile = null;
    if (role === 'customer') {
      if (!name || !address) return res.status(400).json({ error: 'name and address are required for customer' });
      roleProfile = await CustomerProfile.create({ userId: user._id, name, address });
    } else if (role === 'vendor') {
      if (!businessName || !businessAddress) return res.status(400).json({ error: 'businessName and businessAddress are required for vendor' });
      roleProfile = await VendorProfile.create({ userId: user._id, businessName, businessAddress });
    } else if (role === 'shipper') {
      if (!distributionHubId) return res.status(400).json({ error: 'distributionHubId is required for shipper' });
      roleProfile = await ShipperProfile.create({ userId: user._id, distributionHubId });
    }
    user.roleProfileId = roleProfile?._id;
    await user.save();

    // Send verification email
    const token = signEmailToken({ uid: user._id.toString(), email: user.email });
    await sendVerificationEmail(user.email, token);

    return res.status(201).json({ message: 'Registered. Please verify your email.', userId: user._id });
  } catch (err) {
    console.error('Register error', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
};
