const User = require('../../models/User');
const CustomerProfile = require('../../models/CustomerProfile');
const VendorProfile = require('../../models/VendorProfile');
const ShipperProfile = require('../../models/ShipperProfile');
const bcrypt = require('bcryptjs');
const fs = require('fs');
const path = require('path');

// Update user profile information
exports.updateProfile = async (req, res) => {
  try {
    const { username, name, address, businessName, businessAddress, distributionHub } = req.body;
    const user = req.user; // From auth middleware

    console.log('Updating profile for user:', user.username, 'Role:', user.role);

    // Update based on user role
    if (user.role === 'customer') {
      const customerProfile = await CustomerProfile.findOne({ username: user.username });
      if (!customerProfile) {
        return res.status(404).json({ error: 'Customer profile not found' });
      }

      const updateData = {};
      if (name !== undefined) updateData.name = name;
      if (address !== undefined) updateData.address = address;

      await CustomerProfile.findOneAndUpdate(
        { username: user.username },
        updateData,
        { new: true }
      );

      console.log('Updated customer profile:', updateData);
    } else if (user.role === 'vendor') {
      const vendorProfile = await VendorProfile.findOne({ username: user.username });
      if (!vendorProfile) {
        return res.status(404).json({ error: 'Vendor profile not found' });
      }

      const updateData = {};
      if (businessName !== undefined) updateData.businessName = businessName;
      if (businessAddress !== undefined) updateData.businessAddress = businessAddress;

      await VendorProfile.findOneAndUpdate(
        { username: user.username },
        updateData,
        { new: true }
      );

      console.log('Updated vendor profile:', updateData);
    } else if (user.role === 'shipper') {
      const shipperProfile = await ShipperProfile.findOne({ username: user.username });
      if (!shipperProfile) {
        return res.status(404).json({ error: 'Shipper profile not found' });
      }

      const updateData = {};
      if (distributionHub !== undefined) updateData.distributionHub = distributionHub;

      await ShipperProfile.findOneAndUpdate(
        { username: user.username },
        updateData,
        { new: true }
      );

      console.log('Updated shipper profile:', updateData);
    }

    // Return updated user information
    const updatedUser = await User.findById(user._id).select('-passwordHash');
    res.json({ 
      message: 'Profile updated successfully',
      user: {
        username: updatedUser.username,
        name: user.role === 'customer' ? 
          (await CustomerProfile.findOne({ username: user.username }))?.name :
          user.role === 'vendor' ? 
          (await VendorProfile.findOne({ username: user.username }))?.businessName :
          null,
        address: user.role === 'customer' ? 
          (await CustomerProfile.findOne({ username: user.username }))?.address :
          user.role === 'vendor' ? 
          (await VendorProfile.findOne({ username: user.username }))?.businessAddress :
          null,
        distributionHub: user.role === 'shipper' ? 
          (await ShipperProfile.findOne({ username: user.username }))?.distributionHub :
          null,
        profilePicture: updatedUser.profilePicture,
        role: updatedUser.role
      }
    });
  } catch (err) {
    console.error('Error updating profile:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Update username
exports.updateUsername = async (req, res) => {
  try {
    const { newUsername } = req.body;
    const user = req.user;

    console.log('Updating username for user:', user.username, 'to:', newUsername);

    // Check if new username is already taken
    const existingUser = await User.findOne({ username: newUsername });
    if (existingUser && existingUser._id.toString() !== user._id.toString()) {
      return res.status(400).json({ error: 'Username already taken' });
    }

    // Update username in User model
    await User.findByIdAndUpdate(user._id, { username: newUsername });

    // Update username in role-specific profile
    if (user.role === 'customer') {
      await CustomerProfile.findOneAndUpdate(
        { username: user.username },
        { username: newUsername }
      );
    } else if (user.role === 'vendor') {
      await VendorProfile.findOneAndUpdate(
        { username: user.username },
        { username: newUsername }
      );
    } else if (user.role === 'shipper') {
      await ShipperProfile.findOneAndUpdate(
        { username: user.username },
        { username: newUsername }
      );
    }

    console.log('Username updated successfully');
    
    // Return updated user information
    const updatedUser = await User.findById(user._id).select('-passwordHash');
    res.json({ 
      message: 'Username updated successfully',
      user: {
        username: newUsername,
        name: user.role === 'customer' ? 
          (await CustomerProfile.findOne({ username: newUsername }))?.name :
          user.role === 'vendor' ? 
          (await VendorProfile.findOne({ username: newUsername }))?.businessName :
          null,
        address: user.role === 'customer' ? 
          (await CustomerProfile.findOne({ username: newUsername }))?.address :
          user.role === 'vendor' ? 
          (await VendorProfile.findOne({ username: newUsername }))?.businessAddress :
          null,
        distributionHub: user.role === 'shipper' ? 
          (await ShipperProfile.findOne({ username: newUsername }))?.distributionHub :
          null,
        profilePicture: updatedUser.profilePicture,
        role: updatedUser.role
      }
    });
  } catch (err) {
    console.error('Error updating username:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Update password
exports.updatePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const user = req.user;

    console.log('Updating password for user:', user.username);

    // Verify current password
    const isCurrentPasswordValid = await bcrypt.compare(currentPassword, user.passwordHash);
    if (!isCurrentPasswordValid) {
      return res.status(400).json({ error: 'Current password is incorrect' });
    }

    // Hash new password
    const saltRounds = 10;
    const newPasswordHash = await bcrypt.hash(newPassword, saltRounds);

    // Update password
    await User.findByIdAndUpdate(user._id, { passwordHash: newPasswordHash });

    console.log('Password updated successfully');
    res.json({ message: 'Password updated successfully' });
  } catch (err) {
    console.error('Error updating password:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Update profile picture
exports.updateProfilePicture = async (req, res) => {
  try {
    const { profilePicture } = req.body; // Base64 image data
    const user = req.user;

    console.log('Updating profile picture for user:', user.username);

    if (!profilePicture) {
      return res.status(400).json({ error: 'Profile picture is required' });
    }

    // Handle base64 image data
    if (profilePicture.startsWith('data:image/')) {
      const base64Data = profilePicture.replace(/^data:image\/\w+;base64,/, '');
      const buffer = Buffer.from(base64Data, 'base64');
      
      // Generate unique filename
      const filename = `${user._id}_${Date.now()}.jpg`;
      const filepath = path.join(__dirname, '../../uploads/avatars', filename);
      
      // Ensure uploads directory exists
      const uploadsDir = path.join(__dirname, '../../uploads/avatars');
      if (!fs.existsSync(uploadsDir)) {
        fs.mkdirSync(uploadsDir, { recursive: true });
      }
      
      // Save file
      fs.writeFileSync(filepath, buffer);
      
      // Update user profile picture path
      const relativePath = `/uploads/avatars/${filename}`;
      await User.findByIdAndUpdate(user._id, { profilePicture: relativePath });
      
      // Return absolute URL
      const absoluteUrl = `${req.protocol}://${req.get('host')}${relativePath}`;
      
      console.log('Profile picture updated successfully');
      
      // Return updated user information
      const updatedUser = await User.findById(user._id).select('-passwordHash');
      res.json({ 
        message: 'Profile picture updated successfully',
        profilePicture: absoluteUrl,
        user: {
          username: updatedUser.username,
          name: user.role === 'customer' ? 
            (await CustomerProfile.findOne({ username: user.username }))?.name :
            user.role === 'vendor' ? 
            (await VendorProfile.findOne({ username: user.username }))?.businessName :
            null,
          address: user.role === 'customer' ? 
            (await CustomerProfile.findOne({ username: user.username }))?.address :
            user.role === 'vendor' ? 
            (await VendorProfile.findOne({ username: user.username }))?.businessAddress :
            null,
          distributionHub: user.role === 'shipper' ? 
            (await ShipperProfile.findOne({ username: user.username }))?.distributionHub :
            null,
          profilePicture: absoluteUrl,
          role: updatedUser.role
        }
      });
    } else {
      return res.status(400).json({ error: 'Invalid image format' });
    }
  } catch (err) {
    console.error('Error updating profile picture:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};
