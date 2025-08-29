const User = require('../../models/User');
const { verifyEmailToken } = require('../../utils/token');

/**
 * GET /api/auth/verify?token=...
 * Marks user as verified
 */
exports.verifyEmail = async (req, res) => {
  try {
    const { token } = req.query;
    if (!token) return res.status(400).json({ error: 'Missing token' });
    const payload = verifyEmailToken(token);
    const user = await User.findById(payload.uid);
    if (!user) return res.status(404).json({ error: 'User not found' });
    if (user.isVerified) return res.json({ message: 'Already verified' });
    user.isVerified = true;
    await user.save();
    return res.json({ message: 'Email verified' });
  } catch (err) {
    return res.status(400).json({ error: 'Invalid or expired token' });
  }
};
