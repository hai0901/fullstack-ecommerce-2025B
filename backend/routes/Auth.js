const express = require('express');
const router = express.Router();

const { register } = require('../controllers/Auth/Register');
const { login } = require('../controllers/Auth/Login');
const { logout } = require('../controllers/Auth/Logout');
// const { verifyEmail } = require('../controllers/Auth/VerifyEmail');

router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);
// router.get('/verify', verifyEmail);

module.exports = router;
