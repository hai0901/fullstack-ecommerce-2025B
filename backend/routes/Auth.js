const express = require('express');
const router = express.Router();

const { register } = require('../controllers/Auth/Register');
// const { login } = require('../controllers/Auth/Login');
// const { verifyEmail } = require('../controllers/Auth/VerifyEmail');

router.post('/register', register);
// router.post('/login', login);
// router.get('/verify', verifyEmail);

module.exports = router;
