const User = require('../../models/User');
const CustomerProfile = require('../../models/CustomerProfile');
const VendorProfile = require('../../models/VendorProfile');
const ShipperProfile = require('../../models/ShipperProfile');
const bcrypt = require('bcryptjs');

const fs = require('fs');
const path = require('path');

exports.register = async (req, res) => {
  try {
    const { username, password, role, name, address, businessName, businessAddress, distributionHub, avatarDataUrl } = req.body;

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

    // Save avatar if provided
    if (avatarDataUrl && typeof avatarDataUrl === 'string' && avatarDataUrl.startsWith('data:image/')) {
      const matches = avatarDataUrl.match(/^data:image\/(png|jpeg|jpg);base64,(.+)$/);
      if (matches && matches.length === 3) {
        const ext = matches[1] === 'jpeg' ? 'jpg' : matches[1];
        const buffer = Buffer.from(matches[2], 'base64');
        const fileName = `${user._id}-${Date.now()}.${ext}`;
        const uploadDir = path.join(__dirname, '../../uploads/avatars');
        fs.mkdirSync(uploadDir, { recursive: true });
        const filePath = path.join(uploadDir, fileName);
        fs.writeFileSync(filePath, buffer);
        user.profilePicture = `/uploads/avatars/${fileName}`;
      }
    }

    user.roleProfileId = roleProfile._id;
    await user.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
