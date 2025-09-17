/*
 * RMIT University Vietnam
 * Course: COSC2769 - Full Stack Development
 * Semester: 2025B
 * Assessment: Assignment 02
 * Author: Nguyen Pham Tien Hai, Nguyen Thach Khanh Dzi
 * ID: s3979239, s3980883
 */

const User = require('../../models/User');
const CustomerProfile = require('../../models/CustomerProfile');
const VendorProfile = require('../../models/VendorProfile');
const ShipperProfile = require('../../models/ShipperProfile');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ error: 'username and password are required' });
    }

    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    const isValid = await bcrypt.compare(password, user.passwordHash);
    if (!isValid) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    // Load role-specific profile details
    let profileData = {};
    if (user.role === 'customer') {
      const profile = await CustomerProfile.findOne({ username: user.username });
      if (profile) {
        profileData = { name: profile.name, address: profile.address };
      }
    } else if (user.role === 'vendor') {
      const profile = await VendorProfile.findOne({ username: user.username });
      if (profile) {
        profileData = { 
          name: profile.businessName, 
          address: profile.businessAddress 
        };
      }
    } else if (user.role === 'shipper') {
      const profile = await ShipperProfile.findOne({ username: user.username });
      if (profile) {
        profileData = { 
          name: user.username, // Shippers don't have a separate name field
          address: null, // Shippers don't have address, only distributionHub
          distributionHub: profile.distributionHub 
        };
      }
    }

    const tokenPayload = { sub: user._id.toString(), username: user.username, role: user.role };
    const token = jwt.sign(tokenPayload, process.env.JWT_SECRET, { expiresIn: '3h' });

    const rawProfilePicture = user.profilePicture || null;
    const isRelative = rawProfilePicture && rawProfilePicture.startsWith('/');
    const baseUrl = `${req.protocol}://${req.get('host')}`;

    res.json({
      token,
      user: {
        username: user.username,
        role: user.role,
        profilePicture: isRelative ? `${baseUrl}${rawProfilePicture}` : rawProfilePicture,
        ...profileData,
      },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


