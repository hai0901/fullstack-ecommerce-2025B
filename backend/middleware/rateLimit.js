// RMIT University Vietnam
// Course: COSC2769 - Full Stack Development
// Semester: 2025B
// Assessment: Assignment 02
// Author: <Your Name>
// ID: <Your ID>

const rateLimit = require('express-rate-limit');

// Generic API limiter (optional)
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 1000,              // pretty generous
  standardHeaders: true,
  legacyHeaders: false,
});

// Auth-specific limiter: tighter to protect /login and /register
const authLimiter = rateLimit({
  windowMs: 10 * 60 * 1000,  // 10 minutes
  limit: 20,                 // max 20 attempts per 10 min per IP
  message: { code: 429, error: 'Too many requests, please try again later.' },
  standardHeaders: true,
  legacyHeaders: false,
});

module.exports = { apiLimiter, authLimiter };
