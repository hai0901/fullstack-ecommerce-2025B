// backend/index.js
const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const flash = require('connect-flash');
const passport = require('passport');
const app = express();
const PORT = process.env.PORT || 5000;
const apiRoutes = require('./routes');
const path = require('path');
const cors = require('cors');

// Load env variables
require('dotenv').config();

// DB Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('MongoDB connected'))
  .catch((err) => console.error(err));

// Middleware
app.use(express.urlencoded({ extended: false, limit: '15mb' }));
app.use(express.json({ limit: '15mb' }));
// CORS for frontend on http://localhost:5173 using cors package
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
  methods: ['GET','POST','PUT','PATCH','DELETE','OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));
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
// Serve user-uploaded files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
// app.use('/auth', require('./routes/authRoutes'));
// app.use('/products', require('./routes/productRoutes'));

app.get('/', (req, res) => {
  res.send('API is running');
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
