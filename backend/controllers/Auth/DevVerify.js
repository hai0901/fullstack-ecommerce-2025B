const User = require('../../models/User');

exports.devVerify = async (req, res) => {
  try {
    if (process.env.NODE_ENV === 'production') {
      return res.status(403).json({ error: 'Forbidden in production' });
    }
    const { email } = req.query;
    if (!email) return res.status(400).json({ error: 'email is required' });

    const user = await User.findOne({ email: String(email).toLowerCase().trim() });
    if (!user) return res.status(404).json({ error: 'User not found' });

    user.isVerified = true;
    await user.save();
    res.json({ ok: true, userId: user._id });
  } catch (e) {
    console.error('devVerify error', e);
    res.status(500).json({ error: 'Internal server error' });
  }
};
