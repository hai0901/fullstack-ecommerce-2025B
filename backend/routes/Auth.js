const express = require('express');
const passport = require('passport');
const router = express.Router();

const { register } = require('../controllers/Auth/Register');
const { login } = require('../controllers/Auth/Login');
const { verifyEmail } = require('../controllers/Auth/Verify');

router.post('/register', register);
router.post('/login', login);
router.get('/verify', verifyEmail);

// Google OAuth
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
router.get('/google/callback',
  passport.authenticate('google', { failureRedirect: process.env.WEB_LOGIN_FAIL || '/login?error=oauth' }),
  (req, res) => {
    // After OAuth login, set an access token cookie for API calls (optional)
    const { signAccessToken } = require('../utils/token');
    const token = signAccessToken({ uid: req.user._id.toString(), role: req.user.role });
    res.cookie('accessToken', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 1000 * 60 * 60 * 2,
      path: '/',
    });
    res.redirect(process.env.WEB_LOGIN_SUCCESS || '/');
  }
);

module.exports = router;
