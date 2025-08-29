const jwt = require('jsonwebtoken');

const ACCESS_TOKEN_TTL = process.env.ACCESS_TOKEN_TTL || '2h';
const EMAIL_TOKEN_TTL = process.env.EMAIL_TOKEN_TTL || '24h';

function signAccessToken(payload) {
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: ACCESS_TOKEN_TTL });
}
function verifyAccessToken(token) {
  return jwt.verify(token, process.env.JWT_SECRET);
}
function signEmailToken(payload) {
  return jwt.sign(payload, process.env.EMAIL_JWT_SECRET || process.env.JWT_SECRET, { expiresIn: EMAIL_TOKEN_TTL });
}
function verifyEmailToken(token) {
  return jwt.verify(token, process.env.EMAIL_JWT_SECRET || process.env.JWT_SECRET);
}

module.exports = { signAccessToken, verifyAccessToken, signEmailToken, verifyEmailToken };
