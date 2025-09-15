const User = require('../../models/User');
const bcrypt = require('bcryptjs');
const { signAccessToken } = require('../../utils/token');

/**
 * POST /api/auth/login
 * Body: { email, password }
 * Sets httpOnly cookie: accessToken
 */
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body || {};
    if (!email || !password) return res.status(400).json({ error: 'email and password are required' });
    const normalizedEmail = String(email).trim().toLowerCase();
    const user = await User.findOne({ email: normalizedEmail, isDeleted: { $ne: true } });
    if (!user || !user.passwordHash) return res.status(401).json({ error: 'Invalid credentials' });

    const ok = await bcrypt.compare(password, user.passwordHash);
    if (!ok) return res.status(401).json({ error: 'Invalid credentials' });
    if (!user.isVerified) return res.status(403).json({ error: 'Email not verified' });

    const token = signAccessToken({ uid: user._id.toString(), role: user.role });
    const cookieOptions = {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 1000 * 60 * 60 * 2, // 2 hours
      path: '/',
    };
    res.cookie('accessToken', token, cookieOptions);
    return res.json({ message: 'Logged in', user: { id: user._id, email: user.email, role: user.role } });
  } catch (err) {
    console.error('Login error', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
};
