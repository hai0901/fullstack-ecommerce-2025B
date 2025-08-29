const { verifyAccessToken } = require('../utils/token');

/**
 * Checks either:
 * - passport session (req.isAuthenticated())
 * - or JWT in cookie 'accessToken'
 */
module.exports = function requireAuth(req, res, next) {
  // Passport session
  if (req.isAuthenticated && req.isAuthenticated()) return next();

  // JWT cookie
  try {
    const token = req.cookies && req.cookies.accessToken;
    if (!token) return res.status(401).json({ error: 'Unauthorized' });
    const payload = verifyAccessToken(token);
    req.auth = payload; // { uid, role }
    return next();
  } catch (err) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
};
