// RMIT University Vietnam
// Course: COSC2769 - Full Stack Development
// Semester: 2025B
// Assessment: Assignment 02
// Author: <Your Name>
// ID: <Your ID>

const mongoose = require('mongoose');
const multer = require('multer');

function buildPayload(err, req) {
  const code = err.status || err.statusCode || 500;

  // Normalize message
  let message = err.message || 'Internal server error';

  // Mongoose common cases
  if (err instanceof mongoose.Error.ValidationError) {
    message = 'Validation failed';
    return { code: 422, error: message, details: formatMongooseValidation(err), requestId: req.id };
  }
  if (err instanceof mongoose.Error.CastError) {
    return { code: 400, error: 'Invalid ID format', details: { path: err.path, value: err.value }, requestId: req.id };
  }

  // Multer (file upload)
  if (err instanceof multer.MulterError) {
    return { code: 400, error: 'Upload error', details: { field: err.field, code: err.code }, requestId: req.id };
  }

  // express-validator is already handled by your sendIfInvalid (422).
  // Anything else:
  return { code, error: message, requestId: req.id };
}

function formatMongooseValidation(err) {
  // Convert mongoose ValidationError into array of { field, message }
  return Object.keys(err.errors || {}).map((k) => ({
    field: k,
    message: err.errors[k]?.message || 'Invalid',
  }));
}

function notFound(_req, res) {
  res.status(404).json({ code: 404, error: 'Not Found' });
}

function errorHandler(err, req, res, _next) {
  // Don’t double-send
  if (res.headersSent) return;

  const payload = buildPayload(err, req);
  res.status(payload.code).json(payload);
}

module.exports = { notFound, errorHandler };
