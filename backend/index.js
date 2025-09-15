// backend/index.js
const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const flash = require('connect-flash');
const passport = require('passport');
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
  .catch((err) => console.error(err));

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
// CORS for frontend on http://localhost:5173
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:5173');
  res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.header('Access-Control-Allow-Credentials', 'true');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

// One-time cleanup: drop obsolete unique index on users.email if it exists
const mongooseConnection = mongoose.connection;
mongooseConnection.once('open', async () => {
  try {
    const User = require('./models/User');
    const indexes = await User.collection.indexes();
    const emailIndex = indexes.find((i) => i.name === 'email_1');
    if (emailIndex) {
      await User.collection.dropIndex('email_1');
      console.log('Dropped obsolete index email_1 from users collection');
    }
  } catch (cleanupErr) {
    console.warn('Index cleanup skipped or failed:', cleanupErr?.message || cleanupErr);
  }
});

// Routes
app.use('/api', apiRoutes);
// app.use('/auth', require('./routes/authRoutes'));
// app.use('/products', require('./routes/productRoutes'));

app.get('/', (req, res) => {
  res.send('API is running');
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
