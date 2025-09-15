// backend/index.js
// RMIT University Vietnam
// Course: COSC2769 - Full Stack Development
// Semester: 2025B
// Assessment: Assignment 02
// Author: Nguyen Pham Tien Hai
// ID: 

const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const flash = require('connect-flash');
const passport = require('passport');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');

const requestId = require('./middleware/requestId');
const { notFound, errorHandler } = require('./middleware/error');
const { apiLimiter } = require('./middleware/rateLimit');

const app = express();
const PORT = process.env.PORT || 5000;
const apiRoutes = require('./routes');

// Load env variables
require('dotenv').config();

// DB Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB error', err));

// ------------------------
// Core Middleware
// ------------------------
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());

// Security headers
app.use(helmet({
  crossOriginResourcePolicy: { policy: 'cross-origin' }, // allow images from /uploads
}));

// CORS — allow frontend (tune with CORS_ORIGIN env, comma-separated)
app.use(cors({
  origin: process.env.CORS_ORIGIN?.split(',') || true,
  credentials: true,
}));

// Request IDs + logging
app.use(requestId);
morgan.token('id', (req) => req.id);
app.use(morgan(':id :method :url :status :res[content-length] - :response-time ms'));

// Sessions & passport
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

// Static uploads
app.use('/uploads', express.static(path.join(__dirname, '../public/uploads')));

// ------------------------
// Routes
// ------------------------
app.use('/api', apiRoutes); // includes /auth, /products, /orders, etc.

// Root
app.get('/', (req, res) => {
  res.send('API is running');
});

// ------------------------
// Error Handling
// ------------------------
app.use(notFound);
app.use(errorHandler);

// ------------------------
// Start server
// ------------------------
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
