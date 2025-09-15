const express = require('express');
const router = express.Router();

const upload = require('../middleware/uploadImage');
const { register } = require('../controllers/Auth/Register');
const { login } = require('../controllers/Auth/Login');
const { verifyEmail } = require('../controllers/Auth/Verify');
const { getMyAccount } = require('../controllers/Auth/MyAccount');
const { devVerify } = require('../controllers/Auth/DevVerify');

const { validateRegister, validateLogin, sendIfInvalid } = require('../middleware/validators');
const requireAuth = require('../middleware/requireAuth');
const { authLimiter } = require('../middleware/rateLimit');
router.get('/dev-verify', devVerify);

// Register (limited)
router.post(
  '/register',
  authLimiter,
  upload.single('profileImage'),
  validateRegister,
  sendIfInvalid,
  register
);

// Login (limited)
router.post(
  '/login',
  authLimiter,
  validateLogin,
  sendIfInvalid,
  login
);

// Email verify (no body spam, but still behind rate-limit if you want)
router.get('/verify', verifyEmail);

// My account (full profile)
router.get('/me', requireAuth, getMyAccount);

module.exports = router;
