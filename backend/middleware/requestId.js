// RMIT University Vietnam
// Course: COSC2769 - Full Stack Development
// Semester: 2025B
// Assessment: Assignment 02
// Author: <Your Name>
// ID: <Your ID>

const { randomUUID } = require('crypto');

module.exports = function requestId(req, _res, next) {
  // Preserve incoming id (from proxy) or create a new one
  req.id = req.headers['x-request-id'] || randomUUID();
  next();
};

