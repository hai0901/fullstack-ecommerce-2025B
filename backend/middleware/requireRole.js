// RMIT University Vietnam
// Course: COSC2769 - Full Stack Development
// Semester: 2025B
// Assessment: Assignment 02
// Author: <Your Name>
// ID: <Your ID>

/**
 * Works with:
 * - JWT cookie flow: req.auth = { uid, role } (set in requireAuth.js)
 * - Passport session flow: req.user?.role (Google OAuth or local passport)
 * Use AFTER requireAuth.
 */
module.exports = function requireRole(...allowed) {
  return (req, res, next) => {
    // Prefer JWT payload added by requireAuth
    const role = req?.auth?.role || req?.user?.role;
    if (!role) return res.status(401).json({ error: 'Unauthorized' });
    if (!allowed.includes(role)) return res.status(403).json({ error: 'Forbidden' });
    return next();
  };
};
