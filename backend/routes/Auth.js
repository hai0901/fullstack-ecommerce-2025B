const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

const { register } = require('../controllers/Auth/Register');
const { login } = require('../controllers/Auth/Login');
const { logout } = require('../controllers/Auth/Logout');
const { updateProfile, updateUsername, updatePassword, updateProfilePicture, updateName } = require('../controllers/Auth/UpdateProfile');
// const { verifyEmail } = require('../controllers/Auth/VerifyEmail');

router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);

// Protected routes for updating profile
router.put('/profile', auth, updateProfile);
router.put('/name', auth, updateName);
router.put('/username', auth, updateUsername);
router.put('/password', auth, updatePassword);
router.put('/profile-picture', auth, updateProfilePicture);
// router.get('/verify', verifyEmail);

module.exports = router;
